'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Question } from '@/lib/supabase'

export default function QuestionPage() {
  const params = useParams()
  const router = useRouter()
  const questionUniqueId = params.id as string
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | ''>('')

  const fetchQuestion = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('unique_id', questionUniqueId)
        .single()

      if (error) throw error
      setQuestion(data)
    } catch (error) {
      console.error('Error fetching question:', error)
    } finally {
      setLoading(false)
    }
  }, [questionUniqueId])

  useEffect(() => {
    fetchQuestion()
  }, [fetchQuestion])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!employeeEmail.trim() || !selectedAnswer) {
      alert('Please fill in your email and select an answer!')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(employeeEmail.trim())) {
      alert('Please enter a valid email address!')
      return
    }

    setSubmitting(true)
    try {
      const emailLower = employeeEmail.trim().toLowerCase()
      
      if (!question) {
        alert('Question not found. Please refresh the page.')
        return
      }

      // Check if this email already submitted an answer for this question
      const { data: existingAnswer, error: checkError } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', question.id)
        .eq('employee_email', emailLower)
        .maybeSingle()

      if (checkError) throw checkError

      if (existingAnswer) {
        setAlreadySubmitted(true)
        setSubmitted(true)
        setSubmitting(false)
        return
      }

      const answerText = question
        ? `${selectedAnswer}. ${question[`option_${selectedAnswer.toLowerCase()}` as keyof Question]}`
        : selectedAnswer

      // Check if answer is correct
      const correct = question && selectedAnswer === question.correct_answer
      setIsCorrect(correct || false)

      // Calculate points based on question number
      // Questions 1-18: 1 point, Question 19: 3 points, Question 20: 5 points
      let points = 0
      if (correct && question) {
        if (question.id <= 18) {
          points = 1
        } else if (question.id === 19) {
          points = 3
        } else if (question.id === 20) {
          points = 5
        }
      }

      const { error } = await supabase
        .from('answers')
        .insert({
          question_id: question.id,
          employee_email: emailLower,
          answer: answerText,
          points: points,
        })

      if (error) {
        // Check if it's a duplicate submission error
        if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
          setAlreadySubmitted(true)
          setSubmitted(true)
          setSubmitting(false)
          return
        }
        throw error
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-3xl shadow-soft-lg p-6 md:p-12 text-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-christmas-green mx-auto mb-4"></div>
          <div className="text-base md:text-xl font-semibold text-gray-700">Loading question...</div>
        </div>
      </main>
    )
  }

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-3xl shadow-soft-lg p-6 md:p-8 lg:p-12 text-center border border-white/10 max-w-md w-full" style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <div className="text-5xl md:text-6xl mb-4">❓</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-6">
            Question not found
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft"
          >
            Go Home
          </button>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Wrong answer animation */}
        {!isCorrect && !alreadySubmitted && (
          <>
            <div className="wrong-emoji wrong-1">😔</div>
            <div className="wrong-emoji wrong-2">💔</div>
            <div className="wrong-emoji wrong-3">😢</div>
            <div className="wrong-emoji wrong-4">😞</div>
          </>
        )}
        
        <div className={`glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-6 md:p-8 lg:p-12 text-center max-w-2xl w-full mx-2 border border-white/10 relative z-20 ${
          isCorrect ? 'animate-bounce-in' : alreadySubmitted ? '' : 'animate-shake'
        }`}>
          {alreadySubmitted ? (
            <>
              <div className="text-5xl md:text-7xl mb-4 md:mb-6">⚠️</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-3 md:mb-4">
                Already Submitted
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-2">
                You have already submitted an answer for this question. Each employee can only submit once per question.
              </p>
            </>
          ) : isCorrect ? (
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-3 md:mb-4 animate-pulse px-2">
                Congratulations!
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-christmas-green font-bold mb-2 md:mb-3">
                You got it right!
              </p>
              {question && (
                <p className="text-lg md:text-xl lg:text-2xl text-purple-600 font-bold mb-2 md:mb-3">
                  {question.id <= 18 ? '1 point' : question.id === 19 ? '3 points' : question.id === 20 ? '5 points' : '0 points'} earned! 🎉
                </p>
              )}
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-2">
                Your answer has been submitted successfully!
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl md:text-8xl lg:text-9xl mb-4 md:mb-6 animate-wobble">😔</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-3 md:mb-4 animate-pulse px-2">
                Sorry, Wrong Answer 😢
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-2 md:mb-3">
                Better luck next time!
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-2">
                Your answer has been recorded. You cannot resubmit for this question.
              </p>
            </>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-3 md:p-4">
      <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-5 md:p-8 lg:p-12 max-w-4xl w-full border border-white/10 mx-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-gray-800 mb-6 md:mb-8 lg:mb-10 leading-tight">
          {question.question}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 lg:space-y-8">
          <div>
            <label
              htmlFor="employeeEmail"
              className="block text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-3"
            >
              Your Email
            </label>
            <input
              type="email"
              id="employeeEmail"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200/50 rounded-xl focus:border-christmas-green/50 focus:ring-2 md:focus:ring-4 focus:ring-christmas-green/20 focus:outline-none text-base md:text-lg text-gray-900 bg-white/70 backdrop-blur-sm shadow-soft transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-5">
              Select Your Answer
            </label>
            <div className="space-y-3 md:space-y-4">
              {['A', 'B', 'C', 'D'].map((option) => {
                const optionKey = `option_${option.toLowerCase()}` as keyof Question
                const optionText = question?.[optionKey] as string
                return (
                  <label
                    key={option}
                    className={`flex items-start md:items-center p-3 md:p-4 lg:p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedAnswer === option
                        ? 'border-christmas-green/50 bg-gradient-to-r from-emerald-50 to-green-50 shadow-glow scale-[1.02] md:scale-105'
                        : 'border-gray-200/50 bg-white/70 backdrop-blur-sm hover:border-purple-300/50 hover:bg-purple-50/70 hover:shadow-soft'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value as 'A' | 'B' | 'C' | 'D')}
                      className="w-5 h-5 md:w-6 md:h-6 mt-0.5 md:mt-0 text-christmas-green focus:ring-christmas-green focus:ring-2 flex-shrink-0"
                      required
                    />
                    <span className="ml-3 md:ml-5 text-lg md:text-xl font-bold text-gray-800 min-w-[30px] md:min-w-[40px]">
                      {option}.
                    </span>
                    <span className="ml-2 md:ml-3 text-sm md:text-base lg:text-lg text-gray-700 font-medium break-words">{optionText}</span>
                  </label>
                )
              })}
            </div>
          </div>
            <button
              type="submit"
              disabled={submitting}
            className="w-full px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-soft-lg"
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Answer'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

