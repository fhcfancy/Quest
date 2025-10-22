import express from 'express'
import multer from 'multer'
import { uploadFile } from '../controllers/uploadController.js'

const router = express.Router()

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
})

// POST /api/upload - Upload file to Cloudinary
router.post('/', upload.single('file'), uploadFile)

export default router

