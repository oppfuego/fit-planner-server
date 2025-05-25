const {sequelize} = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING, allowNull: false},
    telegram: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    dateOfBirth: {type: DataTypes.DATEONLY},
    gender: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    avatarUrl: {type: DataTypes.STRING},
});

const MuscleGroup = sequelize.define('muscle_group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Exercise = sequelize.define('exercise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT},
    equipmentType: {type: DataTypes.STRING, allowNull: true},
    muscleGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MuscleGroup,
            key: 'id',
        },
    },
});

const Training = sequelize.define('training', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    duration: {type: DataTypes.INTEGER},
    date: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
});

const TrainingExercises = sequelize.define('training_exercises', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    trainingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Training,
            key: 'id',
        },
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercise,
            key: 'id',
        },
    },
});

const ExerciseExecution = sequelize.define('exercise_execution', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    weight: {type: DataTypes.INTEGER, allowNull: false},
    reps: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercise,
            key: 'id',
        },
    },
});


MuscleGroup.hasMany(Exercise, {foreignKey: 'muscleGroupId', onDelete: 'CASCADE'});
Exercise.belongsTo(MuscleGroup, {foreignKey: 'muscleGroupId'});

User.hasMany(Training, {foreignKey: 'userId', onDelete: 'CASCADE'});
Training.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});

Training.belongsToMany(Exercise, {through: TrainingExercises, foreignKey: 'trainingId'});
Exercise.belongsToMany(Training, {through: TrainingExercises, foreignKey: 'exerciseId'});

ExerciseExecution.belongsTo(Exercise, {foreignKey: 'exerciseId', onDelete: 'CASCADE'});
ExerciseExecution.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});
User.hasMany(ExerciseExecution, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = {
    MuscleGroup,
    Exercise,
    User,
    Training,
    TrainingExercises,
    ExerciseExecution
};
