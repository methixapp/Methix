import { NextResponse } from 'next/server';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import app from '@/app/firebaseConfig';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' }, 
        { status: 400 }
      );
    }

    // Get auth instance for this request
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Sign in successful',
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        }
      });

    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = getErrorMessage(error.code);
        return NextResponse.json(
          { success: false, message: errorMessage }, 
          { status: 401 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
    case 'auth/invalid-email':
      return 'Invalid email address';
    default:
      return 'An error occurred during sign-in';
  }
}
