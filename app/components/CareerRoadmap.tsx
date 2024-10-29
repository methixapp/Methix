'use client'

import React, { useState, useEffect } from 'react'
import { db } from '@/app/firebaseConfig'
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  addDoc,
  QuerySnapshot,
  DocumentData,
  Timestamp,
  FirestoreError
} from 'firebase/firestore'

interface Goal {
  id: string;
  title: string;
  progress: number;
  createdAt: Timestamp | null;
}

interface GoalData {
  title: string;
  progress: number;
  createdAt: Timestamp | null;
}

const Roadmap: React.FC = () => {
  const [newGoal, setNewGoal] = useState('')
  const [goals, setGoals] = useState<Goal[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  const setupGoalsListener = (
    onData: (goals: Goal[]) => void,
    onError: (error: FirestoreError) => void
  ) => {
    const goalsCollection = collection(db, 'goals')
    const goalsQuery = query(goalsCollection, orderBy('createdAt', 'desc'))

    return onSnapshot(
      goalsQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const goalsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as GoalData)
        }))
        onData(goalsData)
      },
      onError
    )
  }

  const addNewGoal = async (title: string): Promise<void> => {
    const goalsCollection = collection(db, 'goals')
    const newGoalData: Omit<GoalData, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      title,
      progress: 0,
      createdAt: serverTimestamp()
    }
    await addDoc(goalsCollection, newGoalData)
  }

  useEffect(() => {
    let unsubscribe: () => void

    try {
      console.log('Setting up Firestore listener...')
      unsubscribe = setupGoalsListener(
        (goalsData) => {
          console.log('Received Firestore update:', goalsData)
          setGoals(goalsData)
          setLoading(false)
        },
        (error) => {
          console.error('Firestore error:', error)
          setError('Failed to load goals: ' + error.message)
          setLoading(false)
        }
      )
    } catch (err) {
      console.error('Setup error:', err)
      setError('Failed to setup goals listener')
      setLoading(false)
    }

    return () => {
      console.log('Cleaning up Firestore listener')
      unsubscribe?.()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newGoal.trim()) {
      setError('Goal cannot be empty')
      return
    }

    try {
      console.log('Adding new goal:', newGoal)
      await addNewGoal(newGoal)
      setNewGoal('')
      setSuccess('Goal added successfully!')
    } catch (err) {
      console.error('Error adding goal:', err)
      setError('Failed to add goal. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-center">Loading goals...</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Career Roadmap</h1>
      <p className="mb-8">Explore the stages of a music career and set your goals for success.</p>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter your career goal"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Goal
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">{goal.title}</h3>
            <div className="w-full bg-gray-200 rounded">
              <div 
                className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" 
                style={{ width: `${goal.progress}%` }}
              >
                {goal.progress}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap
