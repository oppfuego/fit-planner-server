require('dotenv').config();
const express = require('express');
const { sequelize, syncDB } = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const exercisesRoutes = require('./routes/exercises.route');
const muscleGroupRoutes = require('./routes/muscleGroup.route');
const trainingRoutes = require('./routes/training.route');
const exerciseExecutionRoutes = require('./routes/exerciseExecution.route');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/exercise', exercisesRoutes);
app.use('/muscle', muscleGroupRoutes);
app.use('/training', trainingRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/exercise-execution', exerciseExecutionRoutes);

const start = async () => {
    try {
        await syncDB();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error('Server start error:', error);
    }
};

start();
