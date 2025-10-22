import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Questions API
export const questionsAPI = {
  // Get all questions with optional filters
  getAll: (params = {}) => api.get('/api/questions', { params }),
  
  // Get single question by ID
  getById: (id) => api.get(`/api/questions/${id}`),
  
  // Create new question
  create: (data) => api.post('/api/questions/create', data),
  
  // Add answer to question
  addAnswer: (id, content) => api.post(`/api/questions/${id}/answers`, { content })
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/api/categories')
}

// Upload API
export const uploadAPI = {
  upload: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        api.post('/api/upload', { file: reader.result })
          .then(resolve)
          .catch(reject)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}

export default api

