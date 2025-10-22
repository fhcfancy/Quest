import express from 'express'
import { getAllCategories } from '../controllers/categoriesController.js'

const router = express.Router()

// GET /api/categories - Get all categories
router.get('/', getAllCategories)

export default router

