const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class AuthController {
    async registration(req, res) {
        const { email, password, role, firstName, secondName } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Incorrect email or password'});
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return res.status(400).json({message: 'User with this email already exists'});
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role, firstName, secondName});
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    }

    async login(req, res) {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            console.log('User not found');
            return res.status(400).json({message: `User with email ${email} not found`});
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            console.log('Incorrect password');
            return res.status(400).json({message: 'Incorrect password'});
        }

        const token = generateJwt(user.id, user.email, user.role);

        return res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }).json({message: 'Login successful'});
    }

    async logout(req, res) {
        return res.clearCookie('token').json({message: 'Успішний вихід'});
    }
}

module.exports = new AuthController();