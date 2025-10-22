import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import questionsRouter from './routes/questions.js'
import categoriesRouter from './routes/categories.js'
import uploadRouter from './routes/upload.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/questions', questionsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/upload', uploadRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Quest API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})

