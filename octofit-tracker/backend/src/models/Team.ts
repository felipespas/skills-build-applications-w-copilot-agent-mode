import { Schema, model } from 'mongoose'

export interface TeamDocument {
  name: string
  mascot: string
  members: number
  weeklyGoalMinutes: number
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    members: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
)

export const TeamModel = model<TeamDocument>('Team', teamSchema)
