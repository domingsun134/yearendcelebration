'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Question, Answer } from '@/lib/supabase'
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [showQR, setShowQR] = useState<number | null>(null)
  const [seeding, setSeeding] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [questionDeletingId, setQuestionDeletingId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [questionsRes, answersRes] = await Promise.all([
        supabase.from('questions').select('*').order('id'),
        supabase.from('answers').select('*').order('created_at', { ascending: false }),
      ])

      if (questionsRes.error) throw questionsRes.error
      if (answersRes.error) throw answersRes.error

      setQuestions(questionsRes.data || [])
      setAnswers(answersRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  function getQuestionAnswers(questionId: number) {
    return answers.filter((a) => a.question_id === questionId)
  }

  function getFirstCorrectAnswer(questionId: number) {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return null

    const questionAnswers = getQuestionAnswers(questionId)
    const correctAnswers = questionAnswers
      .filter((a) => {
        const answerLetter = a.answer.trim().toUpperCase().charAt(0)
        return answerLetter === question.correct_answer.toUpperCase()
      })
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    return correctAnswers.length > 0 ? correctAnswers[0] : null
  }

  function getParticipantStats() {
    const stats: Record<string, { email: string; totalPoints: number; totalCount: number }> = {}

    answers.forEach((answer) => {
      const email = answer.employee_email
      if (!stats[email]) {
        stats[email] = { email, totalPoints: 0, totalCount: 0 }
      }

      stats[email].totalCount++
      // Add points from the answer (points are already calculated when answer was submitted)
      stats[email].totalPoints += answer.points || 0
    })

    return Object.values(stats)
      .sort((a, b) => {
        // Sort by total points (descending), then by total count (descending)
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints
        }
        return b.totalCount - a.totalCount
      })
      .slice(0, 5) // Only show top 5
  }

  function getBaseUrl() {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return ''
  }

  async function seedQuestions() {
    setSeeding(true)
    try {
      const response = await fetch('/api/seed-questions', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (response.ok) {
        alert(`Success! ${data.message}`)
        fetchData() // Refresh the data
      } else {
        alert(`Error: ${data.error || data.message}`)
      }
    } catch (error) {
      console.error('Error seeding questions:', error)
      alert('Failed to seed questions. Please try again.')
    } finally {
      setSeeding(false)
    }
  }

  async function deleteAllAnswers() {
    if (!confirm('Are you sure you want to delete ALL answers? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      // Delete all answers by using a condition that matches all rows
      const { error } = await supabase
        .from('answers')
        .delete()
        .gte('id', 0) // This matches all rows since all IDs are >= 0

      if (error) throw error

      alert(`Success! All answers have been deleted.`)
      fetchData() // Refresh the data
    } catch (error) {
      console.error('Error deleting answers:', error)
      alert('Failed to delete answers. Please make sure the DELETE policy is enabled in Supabase. Error: ' + (error as Error).message)
    } finally {
      setDeleting(false)
    }
  }

  async function deleteQuestion(questionId: number) {
    if (
      !confirm(
        'Are you sure you want to delete this question? All answers for it will be removed and this action cannot be undone.'
      )
    ) {
      return
    }

    setQuestionDeletingId(questionId)
    try {
      const { error } = await supabase.from('questions').delete().eq('id', questionId)
      if (error) throw error

      setQuestions((prev) => prev.filter((q) => q.id !== questionId))
      setAnswers((prev) => prev.filter((a) => a.question_id !== questionId))
      setShowQR((prev) => (prev === questionId ? null : prev))
      if (selectedQuestion === questionId) {
        setSelectedQuestion(null)
      }
      alert('Question deleted successfully.')
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Failed to delete question. Please make sure the DELETE policy is enabled in Supabase.')
    } finally {
      setQuestionDeletingId(null)
    }
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
      alert('Failed to log out. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-6 md:p-12 text-center border border-white/20">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-christmas-green mx-auto mb-4"></div>
          <div className="text-base md:text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-3 md:p-4 py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              🎄 Admin Dashboard 🎄
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
              {questions.length === 0 && (
                <button
                  onClick={seedQuestions}
                  disabled={seeding}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-christmas-gold to-orange-400 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow-gold hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {seeding ? 'Seeding...' : 'Seed 20 Questions'}
                </button>
              )}
              {questions.length > 0 && (
                <Link
                  href="/admin/print-qr"
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft text-center"
                >
                  🖨️ Print QR Templates
                </Link>
              )}
              {answers.length > 0 && (
                <button
                  onClick={deleteAllAnswers}
                  disabled={deleting}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {deleting ? 'Deleting...' : 'Delete All Answers'}
                </button>
              )}
                <Link
                  href="/"
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft text-center"
                >
                  Home
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-soft-lg hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">{questions.length}</div>
              <div className="text-base md:text-lg font-semibold">Total Questions</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-soft-lg hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">{answers.length}</div>
              <div className="text-base md:text-lg font-semibold">Total Answers</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-soft-lg hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">
                {new Set(answers.map((a) => a.employee_email)).size}
              </div>
              <div className="text-base md:text-lg font-semibold">Unique Participants</div>
            </div>
          </div>
          
          {/* Print QR Templates Card */}
          {questions.length > 0 && (
            <div className="mb-4 md:mb-6">
              <Link
                href="/admin/print-qr"
                className="block bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-soft-lg hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-5xl md:text-6xl lg:text-7xl">🖨️</div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Print QR Code Templates</h3>
                    <p className="text-sm md:text-base text-white/90">
                      Generate and print all {questions.length} stocking templates with embedded QR codes
                    </p>
                  </div>
                  <div className="text-3xl md:text-4xl">→</div>
                </div>
              </Link>
            </div>
          )}

          {/* Participant Leaderboard */}
          {answers.length > 0 && (
            <div className="mb-4 md:mb-6 glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-4 md:p-6 border border-white/20">
              <h2 className="text-xl md:text-2xl font-display font-bold text-gray-800 mb-4 md:mb-6">
                🏆 Top 5 Leaderboard
              </h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getParticipantStats().map((stat, index) => (
                  <div
                    key={stat.email}
                    className={`p-3 md:p-4 border-2 rounded-xl transition-all duration-300 ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-400 shadow-soft-lg'
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300 shadow-soft'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-soft'
                        : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`text-xl md:text-2xl font-bold ${
                          index === 0 ? 'text-yellow-600' : index === 1 ? 'text-gray-500' : index === 2 ? 'text-orange-600' : 'text-gray-400'
                        }`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm md:text-base break-all">
                            {stat.email}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            {stat.totalCount} total answer{stat.totalCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl md:text-3xl font-bold ${
                          index === 0 ? 'text-yellow-700' : index === 1 ? 'text-gray-600' : index === 2 ? 'text-orange-700' : 'text-purple-600'
                        }`}>
                          {stat.totalPoints}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          point{stat.totalPoints !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Questions List */}
          <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-4 md:p-6 border border-white/20">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-800 mb-4 md:mb-6">Questions</h2>
            {questions.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-600 mb-4 text-sm md:text-base">No questions found.</p>
                <button
                  onClick={seedQuestions}
                  disabled={seeding}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-christmas-gold to-orange-400 text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-glow-gold hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {seeding ? 'Seeding Questions...' : 'Seed 20 Christmas Questions'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] md:max-h-[600px] overflow-y-auto">
                {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-3 md:p-4 lg:p-5 border-2 border-gray-200 rounded-xl bg-white hover:border-purple-300 hover:bg-purple-50 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-christmas-red mb-1 text-sm md:text-base">
                        Question #{q.id}
                      </div>
                      <div className="text-gray-700 mb-2 text-sm md:text-base break-words">{q.question}</div>
                      <div className="text-xs md:text-sm text-gray-600 space-y-1 mb-2">
                        <div className="break-words">A. {q.option_a}</div>
                        <div className="break-words">B. {q.option_b}</div>
                        <div className="break-words">C. {q.option_c}</div>
                        <div className="break-words">D. {q.option_d}</div>
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-christmas-green">
                        ✓ Correct Answer: {q.correct_answer}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 mt-2">
                        {getQuestionAnswers(q.id).length} answer(s)
                      </div>
                      {(() => {
                        const winner = getFirstCorrectAnswer(q.id)
                        return winner ? (
                          <div className="mt-2 p-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border border-yellow-300">
                            <div className="text-xs md:text-sm font-semibold text-amber-800">
                              🏆 Winner: {winner.employee_email}
                            </div>
                            <div className="text-xs text-amber-600">
                              Answered at {new Date(winner.created_at).toLocaleString()}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 text-xs md:text-sm text-gray-400 italic">
                            No winner yet
                          </div>
                        )
                      })()}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowQR(showQR === q.id ? null : q.id)
                        }}
                        className="w-full sm:w-auto px-3 md:px-4 py-2 bg-gradient-to-r from-christmas-gold to-orange-400 text-white rounded-lg text-xs md:text-sm font-semibold hover:shadow-glow-gold hover:scale-105 transition-all duration-300 shadow-soft flex-shrink-0"
                      >
                        {showQR === q.id ? 'Hide QR' : 'Show QR'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteQuestion(q.id)
                        }}
                        disabled={questionDeletingId === q.id}
                        className="w-full sm:w-auto px-3 md:px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg text-xs md:text-sm font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {questionDeletingId === q.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  {showQR === q.id && (
                    <div className="mt-4 flex justify-center p-3 md:p-4 bg-white rounded-lg">
                      <Link 
                        href={`/question/${q.unique_id}`}
                        className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <QRCodeSVG
                          value={`${getBaseUrl()}/question/${q.unique_id}`}
                          size={Math.min(200, typeof window !== 'undefined' ? window.innerWidth * 0.6 : 200)}
                          level="H"
                          includeMargin={true}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              </div>
            )}
          </div>

          {/* Answers List */}
          <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-4 md:p-6 border border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-gray-800">
                {selectedQuestion
                  ? `Answers for Question #${selectedQuestion}`
                  : 'All Answers'}
              </h2>
              {answers.length > 0 && (
                <button
                  onClick={deleteAllAnswers}
                  disabled={deleting}
                  className="px-3 md:px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg text-xs md:text-sm font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {deleting ? 'Deleting...' : 'Delete All'}
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-[500px] md:max-h-[600px] overflow-y-auto">
              {answers
                .filter((a) => !selectedQuestion || a.question_id === selectedQuestion)
                .map((a) => {
                  const question = questions.find((q) => q.id === a.question_id)
                  return (
                    <div
                      key={a.id}
                      className="p-3 md:p-4 lg:p-5 border-2 border-gray-200 rounded-xl bg-white hover:border-christmas-green hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:shadow-soft transition-all duration-300"
                    >
                      <div className="font-semibold text-christmas-green mb-1 text-sm md:text-base break-all">
                        {a.employee_email}
                      </div>
                      {question && (
                        <div className="text-xs md:text-sm text-gray-500 mb-2 break-words">
                          Q#{a.question_id}: {question.question}
                        </div>
                      )}
                      <div className="text-gray-700 mb-2 text-sm md:text-base break-words">{a.answer}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(a.created_at).toLocaleString()}
                      </div>
                    </div>
                  )
                })}
              {answers.filter(
                (a) => !selectedQuestion || a.question_id === selectedQuestion
              ).length === 0 && (
                <div className="text-center text-gray-500 py-8 text-sm md:text-base">
                  No answers yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

