import { NextResponse } from 'next/server';
import OpenAI from '@azure/openai';

export async function POST(request: Request) {
  try {
    // Create client
    const client = new OpenAI.OpenAIClient(
      process.env.AZURE_OPENAI_ENDPOINT!,
      new OpenAI.AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!)
    );

    const { messages } = await request.json();

    if (!process.env.AZURE_OPENAI_API_KEY || !process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
      return NextResponse.json(
        { error: 'Azure OpenAI configuration is missing' },
        { status: 500 }
      );
    }

    const completion = await client.getChatCompletions(
      process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      messages.map((msg: any) => ({
        role: msg.role,
        content: typeof msg.content === 'string' ? msg.content : msg.content.response
      }))
    );

    return NextResponse.json({
      role: 'assistant',
      content: {
        response: completion.choices[0].message?.content || "No response generated",
      }
    });

  } catch (error) {
    console.error('Azure OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Error communicating with Azure OpenAI API' },
      { status: 500 }
    );
  }
}
