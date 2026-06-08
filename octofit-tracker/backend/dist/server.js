"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/users/', async (_request, response) => {
    const users = await models_1.UserModel.find().sort({ username: 1 }).lean();
    response.json(users);
});
app.get('/api/teams/', async (_request, response) => {
    const teams = await models_1.TeamModel.find().sort({ name: 1 }).lean();
    response.json(teams);
});
app.get('/api/activities/', async (_request, response) => {
    const activities = await models_1.ActivityModel.find().sort({ date: -1 }).lean();
    response.json(activities);
});
app.get('/api/leaderboard/', async (_request, response) => {
    const leaderboard = await models_1.LeaderboardModel.find().sort({ rank: 1 }).lean();
    response.json(leaderboard);
});
app.get('/api/workouts/', async (_request, response) => {
    const workouts = await models_1.WorkoutModel.find().sort({ name: 1 }).lean();
    response.json(workouts);
});
(0, database_1.connectDatabase)()
    .then(() => {
    console.log(`MongoDB connected: ${database_1.MONGO_URI}`);
    app.listen(PORT, () => {
        console.log(`Server running at ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
