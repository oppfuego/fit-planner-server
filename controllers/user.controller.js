const {User} = require('../models/models');
const fs = require('fs');
const path = require('path');

class UserController {

    async getAll(req, res) {
        console.log('getAll request received', req.body);
        try {
            const users = await User.findAll({
                attributes: {exclude: ['password']}
            });

            if (!users) {
                console.log('No users found');
                return res.status(404).json({error: 'No users found'});
            }

            console.log('Users found:', users);
            res.json({users});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server error');
        }
    }

    async getUser(req, res) {
        console.log('getUser request received', req.body);
        try {
            console.log('Request user email:', req.user.email);

            const user = await User.findOne({
                where: {email: req.user.email},
                attributes: {exclude: ['password']}
            });

            if (!user) {
                console.log('User not found');
                return res.status(404).json({error: 'User not found'});
            }

            console.log('User found:', user);
            res.json({user});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server error');
        }
    }

    async updateAvatar(req, res) {
        try {
            const {email} = req.body;
            const user = await User.findOne({where: {email}});

            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const oldAvatarPath = user.avatarUrl ? path.join(__dirname, '..', 'uploads', path.basename(user.avatarUrl)) : null;

            const fileName = req.file.filename;
            user.avatarUrl = `/uploads/${fileName}`;
            await user.save();

            if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
                fs.unlink(oldAvatarPath, (err) => {
                    if (err) {
                        console.error('Failed to delete old avatar:', err);
                    } else {
                        console.log('Old avatar deleted successfully');
                    }
                });
            }

            res.status(200).json({avatarUrl: user.avatarUrl});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server error');
        }
    }

    async delete(req, res) {
        const {id} = req.query;
        const user = await User.findByPk(id);
        await   user.destroy();
        return res.json({message: 'User deleted'});
    }
}

module.exports = new UserController();