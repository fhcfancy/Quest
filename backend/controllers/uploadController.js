import cloudinary from '../config/cloudinary.js'
import { Readable } from 'stream'

// Upload file to Cloudinary
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    
    // Convert buffer to stream
    const stream = Readable.from(req.file.buffer)
    
    // Determine resource type
    const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image'
    
    // Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: 'quest-questions',
          transformation: resourceType === 'image' 
            ? [{ width: 1200, height: 1200, crop: 'limit' }]
            : undefined
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      
      stream.pipe(uploadStream)
    })
    
    const result = await uploadPromise
    
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).json({ error: error.message })
  }
}

