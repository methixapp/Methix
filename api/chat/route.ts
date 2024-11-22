import { NextResponse } from 'next/server';
import OpenAI from '@azure/openai';

export async function POST(request: Request) {
  try {
    // Debug logging
    console.log('Starting chat request...');
    
    // Verify environment variables
    if (!process.env.AZURE_OPENAI_API_KEY) {
      throw new Error('Missing API Key');
    }
    if (!process.env.AZURE_OPENAI_ENDPOINT) {
      throw new Error('Missing Endpoint');
    }
    if (!process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
      throw new Error('Missing Deployment Name');
    }

    const client = new OpenAI.OpenAIClient(
      process.env.AZURE_OPENAI_ENDPOINT,
      new OpenAI.AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY)
    );

    // Get the message from the request
    const { messages } = await request.json();
    console.log('Received messages:', messages);

    // Make the API call
    const result = await client.getChatCompletions(
      process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      messages
    );

    console.log('Got response:', result.choices[0].message);

    return NextResponse.json({
      role: 'assistant',
      content: {
        response: result.choices[0].message?.content || "No response generated"
      }
    });

  } catch (error: any) {
    console.error('Error details:', error);
    return NextResponse.json(
      { 
        error: 'Chat API Error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 