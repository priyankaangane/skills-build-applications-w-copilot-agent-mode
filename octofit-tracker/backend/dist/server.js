"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const leaderboardEntry_1 = __importDefault(require("./models/leaderboardEntry"));
const workout_1 = __importDefault(require("./models/workout"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: apiBaseUrl });
});
app.get('/api/users', async (_req, res) => {
    const data = await user_1.default.find().sort({ joinedAt: -1 });
    res.json({ data });
});
app.get('/api/teams', async (_req, res) => {
    const data = await team_1.default.find().sort({ name: 1 });
    res.json({ data });
});
app.get('/api/activities', async (_req, res) => {
    const data = await activity_1.default.find().sort({ date: -1 });
    res.json({ data });
});
app.get('/api/leaderboard', async (_req, res) => {
    const data = await leaderboardEntry_1.default.find().sort({ rank: 1 });
    res.json({ data });
});
app.get('/api/workouts', async (_req, res) => {
    const data = await workout_1.default.find().sort({ durationMin: 1 });
    res.json({ data });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error('Failed to connect to MongoDB. Exiting.');
        process.exit(1);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
startServer();
