"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboardEntry_1 = __importDefault(require("../models/leaderboardEntry"));
const workout_1 = __importDefault(require("../models/workout"));
/**
 * Seed the octofit_db database with test data.
 */
const seed = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to MongoDB for seeding.');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboardEntry_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const teams = await team_1.default.create([
            { name: 'OctoFit Rockets', description: 'A high-energy team focused on fast-paced cardio.', members: 8 },
            { name: 'Pulse Pioneers', description: 'Team prioritizing endurance and recovery routines.', members: 5 },
        ]);
        await user_1.default.create([
            { name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Runner', team: teams[0].name, joinedAt: new Date('2025-05-14') },
            { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'Cyclist', team: teams[1].name, joinedAt: new Date('2025-07-01') },
            { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'Swimmer', team: teams[0].name, joinedAt: new Date('2025-08-08') },
        ]);
        await activity_1.default.create([
            { user: 'Alex Rivera', type: 'Run', distanceKm: 5.2, durationMin: 28, calories: 340, date: new Date('2026-06-18') },
            { user: 'Mia Chen', type: 'Ride', distanceKm: 12.4, durationMin: 45, calories: 520, date: new Date('2026-06-19') },
            { user: 'Noah Patel', type: 'Swim', distanceKm: 1.0, durationMin: 30, calories: 280, date: new Date('2026-06-20') },
            { user: 'Alex Rivera', type: 'Interval', distanceKm: 3.0, durationMin: 20, calories: 260, date: new Date('2026-06-20') },
        ]);
        await leaderboardEntry_1.default.create([
            { rank: 1, name: 'Mia Chen', points: 1250, metric: 'weekly' },
            { rank: 2, name: 'Alex Rivera', points: 1120, metric: 'weekly' },
            { rank: 3, name: 'Noah Patel', points: 980, metric: 'weekly' },
        ]);
        await workout_1.default.create([
            { name: 'Morning Cardio', durationMin: 30, focus: 'Endurance', difficulty: 'Medium', recommendedFor: ['Runners', 'Cyclists'] },
            { name: 'Strength Builder', durationMin: 45, focus: 'Power', difficulty: 'Hard', recommendedFor: ['Athletes', 'Cross-training'] },
            { name: 'Recovery Flow', durationMin: 20, focus: 'Mobility', difficulty: 'Easy', recommendedFor: ['Recovery', 'Warm-up'] },
        ]);
        console.log('Seed the octofit_db database with test data: complete.');
    }
    catch (error) {
        console.error('Seeding error:', error);
    }
    finally {
        await (0, database_1.disconnectDatabase)();
        process.exit(0);
    }
};
seed();
