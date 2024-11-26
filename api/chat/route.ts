// Modified from https://github.com/microsoft/openai/blob/main/examples/azure-ad-authentication/server.ts
// Updated to use Azure OpenAI with DefaultAzureCredential

import { NextResponse } from 'next/server';
import AzureOpenAI from 'openai';
import { DefaultAzureCredential } from '@azure/identity';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Authenticate using DefaultAzureCredential
    const credential = new DefaultAzureCredential();
    const tokenResponse = await credential.getToken("https://cognitiveservices.azure.com/.default");

    // Create the Azure OpenAI client
    const client = new AzureOpenAI({
      apiKey: tokenResponse.token, // Use token from DefaultAzureCredential
    });

    // Call the Azure OpenAI API
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_CHAT_DEPLOYMENT!, // Deployment name
      messages,
      max_tokens: 800,
      temperature: 0.7,
    });

    // Return the response as JSON
    return NextResponse.json({
      role: 'assistant',
      content: response.choices[0].message.content,
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Error processing chat request',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
