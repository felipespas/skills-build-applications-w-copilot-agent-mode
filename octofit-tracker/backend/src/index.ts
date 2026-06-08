import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected: ${MONGO_URI}`)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
