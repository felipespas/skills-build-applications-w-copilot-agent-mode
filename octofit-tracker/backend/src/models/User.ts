import { Schema, model } from 'mongoose'

export interface UserDocument {
  username: string
  displayName: string
  email: string
  team: string
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
  },
  { timestamps: true }
)

export const UserModel = model<UserDocument>('User', userSchema)
