// api/questions/[id].js
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

  const { id } = req.query

  try {
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
    
    res.status(200).json({
      question,
      answers: answers || []
    })
  } catch (error) {
    console.error('Error fetching question:', error)
    res.status(500).json({ error: error.message })
  }
}
