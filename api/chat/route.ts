import { NextResponse } from 'next/server';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const client = new OpenAIClient(
      new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!),
      process.env.AZURE_OPENAI_ENDPOINT
    );

    const response = await client.getChatCompletions({
      messages: messages,
      maxTokens: 800,
      temperature: 0.7,
    });

    return NextResponse.json({
      role: 'assistant',
      content: response.choices[0].message.content,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Error processing chat request',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 