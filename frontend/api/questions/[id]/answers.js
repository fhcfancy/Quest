// api/questions/[id]/answers.js
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const { content } = req.body

  try {
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
