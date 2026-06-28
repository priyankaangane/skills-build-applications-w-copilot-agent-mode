import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/database';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import LeaderboardEntry from './models/leaderboardEntry';
import Workout from './models/workout';

dotenv.config();

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.get('/api/users', async (_req, res) => {
  const data = await User.find().sort({ joinedAt: -1 });
  res.json({ data });
});

app.get('/api/teams', async (_req, res) => {
  const data = await Team.find().sort({ name: 1 });
  res.json({ data });
});

app.get('/api/activities', async (_req, res) => {
  const data = await Activity.find().sort({ date: -1 });
  res.json({ data });
});

app.get('/api/leaderboard', async (_req, res) => {
  const data = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json({ data });
});

app.get('/api/workouts', async (_req, res) => {
  const data = await Workout.find().sort({ durationMin: 1 });
  res.json({ data });
});

const startServer = async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Failed to connect to MongoDB. Exiting.');
    process.exit(1);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
};

startServer();
