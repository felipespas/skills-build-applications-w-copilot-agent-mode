import { Schema, model } from 'mongoose'

export interface WorkoutDocument {
  name: string
  level: string
  durationMinutes: number
  focusArea: string
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
  },
  { timestamps: true }
)

export const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema)
