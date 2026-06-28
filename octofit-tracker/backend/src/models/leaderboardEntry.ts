import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  name: string;
  points: number;
  metric: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  metric: { type: String, required: true, default: 'score' },
});

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
