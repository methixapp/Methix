import { NextResponse } from 'next/server';
import { db } from '@/app/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

interface GoalData {
  title: string;
  progress: number;
  createdAt: Date;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Fetching goals...');
    const goalsSnapshot = await getDocs(collection(db, 'goals'));
    const goals = goalsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Fetched goals:', goals);
    return NextResponse.json({ goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newGoal: Omit<GoalData, 'createdAt'> = {
      title,
      progress: 0,
    };

    const docRef = await addDoc(collection(db, 'goals'), {
      ...newGoal,
      createdAt: serverTimestamp()
    });

    return NextResponse.json({ id: docRef.id, message: 'Goal added successfully' });
  } catch (error) {
    console.error('Error adding goal:', error);
    return NextResponse.json({ error: 'Failed to add goal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, progress } = await request.json();
    if (!id || progress === undefined) {
      return NextResponse.json({ error: 'ID and progress are required' }, { status: 400 });
    }
    
    const goalRef = doc(db, 'goals', id);
    await updateDoc(goalRef, { progress });
    
    return NextResponse.json({ message: 'Goal progress updated successfully' });
  } catch (error) {
    console.error('Error updating goal progress:', error);
    return NextResponse.json({ error: 'Failed to update goal progress' }, { status: 500 });
  }
}

