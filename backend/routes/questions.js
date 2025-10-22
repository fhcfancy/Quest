import express from 'express'
import { 
  getAllQuestions, 
  getQuestionById, 
  createQuestion, 
  addAnswer 
} from '../controllers/questionsController.js'

const router = express.Router()

// GET /api/questions - Get all questions with optional filters
router.get('/', getAllQuestions)

// GET /api/questions/:id - Get single question with answers
router.get('/:id', getQuestionById)

// POST /api/questions - Create new question
router.post('/', createQuestion)

// POST /api/questions/:id/answers - Add answer to question
router.post('/:id/answers', addAnswer)

export default router

