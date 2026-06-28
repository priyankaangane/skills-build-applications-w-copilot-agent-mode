import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  durationMin: number;
  focus: string;
  difficulty: string;
  recommendedFor: string[];
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  durationMin: { type: Number, required: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true },
  recommendedFor: { type: [String], required: true },
});

export default mongoose.model<IWorkout>('Workout', workoutSchema);
