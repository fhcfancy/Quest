// api/questions/index.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

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
    
    res.status(200).json(questionsWithCounts)
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ error: error.message })
  }
}
