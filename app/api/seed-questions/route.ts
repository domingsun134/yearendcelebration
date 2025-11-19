import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { christmasQuestions } from '@/data/christmas-questions'

export async function POST() {
  try {
    // Check if questions already exist
    const { data: existingQuestions } = await supabase
      .from('questions')
      .select('id')
      .limit(1)

    if (existingQuestions && existingQuestions.length > 0) {
      return NextResponse.json(
        { message: 'Questions already exist in the database.' },
        { status: 400 }
      )
    }

    // Insert questions
    const questionsToInsert = christmasQuestions.map((q) => ({
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
    }))
    
    const { data, error } = await supabase
      .from('questions')
      .insert(questionsToInsert)
      .select()

    if (error) {
      console.error('Error inserting questions:', error)
      return NextResponse.json(
        { error: 'Failed to insert questions', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: `Successfully inserted ${data?.length || 0} questions!`,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('Error in seed-questions API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

