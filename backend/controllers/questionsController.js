import { supabase } from '../config/supabase.js'

// Get all questions with optional filters
export const getAllQuestions = async (req, res) => {
  try {
    const { category, type, search } = req.query
    
    let query = supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    
    if (type && type !== 'all') {
      query = query.eq('type', type)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    // Get answer counts for each question
    const questionsWithCounts = await Promise.all(
      data.map(async (question) => {
        const { count } = await supabase
          .from('answers')
          .select('*', { count: 'exact', head: true })
          .eq('question_id', question.id)
        
        return {
          ...question,
          answers_count: count || 0
        }
      })
    )
    
    res.json(questionsWithCounts)
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ error: error.message })
  }
}

// Get single question by ID with answers
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params
    
    // Get question
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single()
    
    if (questionError) throw questionError
    
    // Get answers
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('*')
      .eq('question_id', id)
      .order('created_at', { ascending: true })
    
    if (answersError) throw answersError
    
    res.json({
      question,
      answers: answers || []
    })
  } catch (error) {
    console.error('Error fetching question:', error)
    res.status(500).json({ error: error.message })
  }
}

// Create new question
export const createQuestion = async (req, res) => {
  try {
    const { title, content, type, category, customCategory, mediaUrl } = req.body
    
    const questionData = {
      title: title || null,
      content,
      type: type || 'text',
      category: category === 'custom' ? customCategory : category,
      media_url: mediaUrl || null
    }
    
    const { data, error } = await supabase
      .from('questions')
      .insert([questionData])
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json(data)
  } catch (error) {
    console.error('Error creating question:', error)
    res.status(500).json({ error: error.message })
  }
}

// Add answer to question
export const addAnswer = async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Answer content is required' })
    }
    
    const answerData = {
      question_id: id,
      content: content.trim()
    }
    
    const { data, error } = await supabase
      .from('answers')
      .insert([answerData])
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json(data)
  } catch (error) {
    console.error('Error adding answer:', error)
    res.status(500).json({ error: error.message })
  }
}

