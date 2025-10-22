import { supabase } from '../config/supabase.js'

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_en', { ascending: true })
    
    if (error) throw error
    
    res.json(data || [])
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: error.message })
  }
}

