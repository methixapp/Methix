import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { OpenAIError } from 'openai/error';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: Request) {
  try {
    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client inside the handler
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const { messages } = await request.json() as { messages: ChatMessage[] };
    console.log('Received messages:', messages);

    try {
      console.log('Sending request to OpenAI API...');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      return NextResponse.json(completion.choices[0].message);
    } catch (error) {
      console.error('Error in OpenAI API call:', error);
      const apiError = error as OpenAIError;
      return NextResponse.json(
        { 
          error: 'Error communicating with OpenAI',
          details: apiError.message,
          type: apiError.name
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
