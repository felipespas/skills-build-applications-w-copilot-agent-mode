import { Schema, model } from 'mongoose'

export interface LeaderboardDocument {
  rank: number
  username: string
  points: number
  streakDays: number
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    rank: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    points: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true }
)

export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema)
