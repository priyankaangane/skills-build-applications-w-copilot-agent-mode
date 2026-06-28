import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  distanceKm: number;
  durationMin: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMin: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() },
});

export default mongoose.model<IActivity>('Activity', activitySchema);
