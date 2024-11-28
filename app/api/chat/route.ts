import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, type } = await request.json(); // Include 'type' in the request body to distinguish requests (e.g., 'prompts' or 'chat').

    const baseUrl = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, '');
    const apiUrl = `${baseUrl}/openai/deployments/${process.env.AZURE_OPENAI_CHAT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`;

    if (type === 'prompts') {
      // Use OpenAI to generate music-related prompts dynamically
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY!,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'You are a creative assistant. Generate three unique, interesting prompts related to the music industry for a user who wants career insights or industry analysis.',
            },
          ],
          max_tokens: 50,
          temperature: 0.8,
          top_p: 0.95,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Azure OpenAI Error:', error);
        throw new Error(`Azure OpenAI API error: ${error}`);
      }

      const data = await response.json();

      const prompts = data.choices[0].message.content
        .split('\n') // Ensure prompts are split into an array
        .filter((line: string) => line.trim()); // Remove any blank lines

      return NextResponse.json({ prompts });
    } else {
      // Handle regular chat messages
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY!,
        },
        body: JSON.stringify({
          messages,
          max_tokens: 800,
          temperature: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0,
          top_p: 0.95,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Azure OpenAI Error:', error);
        throw new Error(`Azure OpenAI API error: ${error}`);
      }

      const data = await response.json();

      return NextResponse.json({
        role: 'assistant',
        content: data.choices[0].message.content,
      });
    }
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));

    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Error processing chat request',
        details: typedError.message,
      },
      { status: 500 }
    );
  }
}
