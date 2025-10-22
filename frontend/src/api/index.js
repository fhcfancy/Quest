import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Questions API
export const questionsAPI = {
  // Get all questions with optional filters
  getAll: (params = {}) => api.get('/questions', { params }),
  
  // Get single question by ID
  getById: (id) => api.get(`/questions/${id}`),
  
  // Create new question
  create: (data) => api.post('/questions', data),
  
  // Add answer to question
  addAnswer: (id, content) => api.post(`/questions/${id}/answers`, { content })
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories')
}

// Upload API
export const uploadAPI = {
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default api

