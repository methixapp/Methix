// Modified from https://github.com/microsoft/openai/blob/main/examples/azure-ad-authentication/server.ts
// Modified import statements to use the latest version of openai

import { NextResponse } from 'next/server';
import { AzureOpenAI, getBearerTokenProvider } from 'openai';
import { DefaultAzureCredential } from '@azure/identity';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const credential = new DefaultAzureCredential();
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);

    const client = new AzureOpenAI({
      azureADTokenProvider,
      deployment: process.env.AZURE_OPENAI_CHAT_DEPLOYMENT,
      apiVersion: "2024-10-21",
    });

    const response = await client.chat.completions.create({
      messages,
      max_tokens: 800,
      temperature: 0.7,
    });

    return NextResponse.json({
      role: 'assistant',
      content: response.choices[0].message.content,
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Error processing chat request',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
} 