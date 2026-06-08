"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const models_1 = require("../models");
const users = [
    { username: 'mona', displayName: 'Mona Octocat', email: 'mona@octofit.example', team: 'Team OctoFit' },
    { username: 'hubber', displayName: 'Harper Hubber', email: 'harper@octofit.example', team: 'Code Sprinters' },
    { username: 'runner42', displayName: 'Riley Runner', email: 'riley@octofit.example', team: 'Team OctoFit' },
];
const teams = [
    { name: 'Team OctoFit', mascot: 'Octopus', members: 12, weeklyGoalMinutes: 2400 },
    { name: 'Code Sprinters', mascot: 'Lightning Bolt', members: 8, weeklyGoalMinutes: 1600 },
];
const activities = [
    { username: 'mona', activityType: 'Running', durationMinutes: 34, caloriesBurned: 320, date: new Date('2026-06-01') },
    { username: 'hubber', activityType: 'Cycling', durationMinutes: 48, caloriesBurned: 430, date: new Date('2026-06-02') },
    { username: 'runner42', activityType: 'Strength Training', durationMinutes: 40, caloriesBurned: 280, date: new Date('2026-06-03') },
];
const leaderboard = [
    { rank: 1, username: 'mona', points: 1280, streakDays: 14 },
    { rank: 2, username: 'hubber', points: 1125, streakDays: 9 },
    { rank: 3, username: 'runner42', points: 980, streakDays: 7 },
];
const workouts = [
    { name: 'Octo Strength Circuit', level: 'Intermediate', durationMinutes: 35, focusArea: 'Full body strength' },
    { name: 'Tracker Tempo Run', level: 'Beginner', durationMinutes: 25, focusArea: 'Cardio endurance' },
    { name: 'Leaderboard HIIT', level: 'Advanced', durationMinutes: 30, focusArea: 'High intensity intervals' },
];
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.UserModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
    ]);
    await Promise.all([
        models_1.UserModel.insertMany(users),
        models_1.TeamModel.insertMany(teams),
        models_1.ActivityModel.insertMany(activities),
        models_1.LeaderboardModel.insertMany(leaderboard),
        models_1.WorkoutModel.insertMany(workouts),
    ]);
    console.log('Seed complete: users, teams, activities, leaderboard, and workouts collections populated');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.connection.close();
});
