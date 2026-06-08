import express from 'express'
import { connectDatabase, MONGO_URI } from './config/database'
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models'

const app = express()
const PORT = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

app.get('/api/users/', async (_request, response) => {
  const users = await UserModel.find().sort({ username: 1 }).lean()
  response.json(users)
})

app.get('/api/teams/', async (_request, response) => {
  const teams = await TeamModel.find().sort({ name: 1 }).lean()
  response.json(teams)
})

app.get('/api/activities/', async (_request, response) => {
  const activities = await ActivityModel.find().sort({ date: -1 }).lean()
  response.json(activities)
})

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean()
  response.json(leaderboard)
})

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await WorkoutModel.find().sort({ name: 1 }).lean()
  response.json(workouts)
})

connectDatabase()
  .then(() => {
    console.log(`MongoDB connected: ${MONGO_URI}`)
    app.listen(PORT, () => {
      console.log(`Server running at ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })