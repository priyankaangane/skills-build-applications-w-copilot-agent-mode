import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboardEntry';
import Workout from '../models/workout';

/**
 * Seed the octofit_db database with test data.
 */
const seed = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding:', uri);

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'OctoFit Rockets', description: 'A high-energy team focused on fast-paced cardio.', members: 8 },
      { name: 'Pulse Pioneers', description: 'Team prioritizing endurance and recovery routines.', members: 5 },
    ]);

    await User.create([
      { name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Runner', team: teams[0].name, joinedAt: new Date('2025-05-14') },
      { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'Cyclist', team: teams[1].name, joinedAt: new Date('2025-07-01') },
      { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'Swimmer', team: teams[0].name, joinedAt: new Date('2025-08-08') },
    ]);

    await Activity.create([
      { user: 'Alex Rivera', type: 'Run', distanceKm: 5.2, durationMin: 28, calories: 340, date: new Date('2026-06-18') },
      { user: 'Mia Chen', type: 'Ride', distanceKm: 12.4, durationMin: 45, calories: 520, date: new Date('2026-06-19') },
      { user: 'Noah Patel', type: 'Swim', distanceKm: 1.0, durationMin: 30, calories: 280, date: new Date('2026-06-20') },
      { user: 'Alex Rivera', type: 'Interval', distanceKm: 3.0, durationMin: 20, calories: 260, date: new Date('2026-06-20') },
    ]);

    await LeaderboardEntry.create([
      { rank: 1, name: 'Mia Chen', points: 1250, metric: 'weekly' },
      { rank: 2, name: 'Alex Rivera', points: 1120, metric: 'weekly' },
      { rank: 3, name: 'Noah Patel', points: 980, metric: 'weekly' },
    ]);

    await Workout.create([
      { name: 'Morning Cardio', durationMin: 30, focus: 'Endurance', difficulty: 'Medium', recommendedFor: ['Runners', 'Cyclists'] },
      { name: 'Strength Builder', durationMin: 45, focus: 'Power', difficulty: 'Hard', recommendedFor: ['Athletes', 'Cross-training'] },
      { name: 'Recovery Flow', durationMin: 20, focus: 'Mobility', difficulty: 'Easy', recommendedFor: ['Recovery', 'Warm-up'] },
    ]);

    console.log('Seed the octofit_db database with test data: complete.');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
