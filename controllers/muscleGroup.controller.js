const {MuscleGroup} = require('../models/models');

class MuscleGroupController {
    async create(req, res) {
        const { name } = req.body;

        try {
            const muscleGroup = await MuscleGroup.create({ name });
            return res.status(201).json(muscleGroup);
        } catch (error) {

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'This muscle group already exists.' });
            }

            console.error('Unexpected error when creating muscle group:', error);

            return res.status(500).json({ message: 'Server error while creating muscle group' });
        }
    }


    async getAll(req, res) {
        const muscleGroups = await MuscleGroup.findAll();
        return res.json(muscleGroups);
    }
}

module.exports = new MuscleGroupController();