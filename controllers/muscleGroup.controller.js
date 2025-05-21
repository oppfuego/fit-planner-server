const {MuscleGroup} = require('../models/models');

class MuscleGroupController {
    async create(req, res) {
        const {name} = req.body;
        const muscleGroup = await MuscleGroup.create({name});
        return res.json(muscleGroup);
    }

    async getAll(req, res) {
        const muscleGroups = await MuscleGroup.findAll();
        return res.json(muscleGroups);
    }
}

module.exports = new MuscleGroupController();