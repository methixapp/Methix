/*import { NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/app/firebaseConfig';

export async function POST(request: Request) {
  console.log('Signup endpoint hit');

  try {
    // Log the incoming request
    const body = await request.text();
    console.log('Request body:', body);

    // Parse the JSON body
    let email, password;
    try {
      const data = JSON.parse(body);
      email = data.email;
      password = data.password;
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return NextResponse.json({
        success: false,
        message: 'Invalid request body'
      }, { status: 400 });
    }

    // Validate inputs
    if (!email || !password) {
      console.log('Missing required fields');
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }

    try {
      console.log('Creating user account...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        userId: user.uid
      }, { status: 201 });

    } catch (error) {
      console.error('Firebase error:', error);
      if (error instanceof FirebaseError) {
        const errorMessage = {
          'auth/email-already-in-use': 'An account with this email already exists',
          'auth/weak-password': 'Password is too weak',
          'auth/invalid-email': 'Invalid email address'
        }[error.code] || 'Failed to create account';

        return NextResponse.json({
          success: false,
          message: errorMessage,
          code: error.code
        }, { status: 400 });
      }

      // For any other type of error
      return NextResponse.json({
        success: false,
        message: 'An unexpected error occurred',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
} */

export {};