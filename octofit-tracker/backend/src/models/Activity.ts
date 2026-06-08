import { Schema, model } from 'mongoose'

export interface ActivityDocument {
  username: string
  activityType: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
}

const activitySchema = new Schema<ActivityDocument>(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
)

export const ActivityModel = model<ActivityDocument>('Activity', activitySchema)
