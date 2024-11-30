import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, type } = await request.json(); // Parse the request body
    const baseUrl = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, '');
    const apiUrl = `${baseUrl}/openai/deployments/${process.env.AZURE_OPENAI_CHAT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`;

    // Handle 'prompts' type
    if (type === 'prompts') {
      const fallbackPrompts = [
        "🎵 How can you expand your music network today?",
        "🎶 What's your next big music project idea?",
        "🎸 Have you thought about improving your stage performance?",
      ];

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
                'You are a creative assistant. Generate three unique prompts about the music industry, no longer than 10-15 words. Tokens MUST be less than 70. Each prompt should include an actionable or engaging suggestion. Prepend each prompt with a music emoji (either a guitar, piano, microphone, or musical score). Each prompt has a different music emoji. Avoid unnecessary formatting like ** or --.',
            },
          ],
          max_tokens: 70, // Limit tokens to ensure concise responses
          temperature: 0.8,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Azure OpenAI Error (Prompts):', error);
        return NextResponse.json({ prompts: fallbackPrompts });
      }

      const data = await response.json();
      const generatedPrompts = data.choices[0]?.message?.content
        ?.split('\n') // Split into individual lines
        .filter((line: string) => line.trim()) // Remove blank lines
        .map((line: string) => line.trim().substring(0, 50)) // Truncate to ensure 10-15 words max
        .map((line: string) => `🎵 ${line}`) // Prepend emoji
        .slice(0, 3); // Limit to 3 prompts

      return NextResponse.json({
        prompts: generatedPrompts.length > 0 ? generatedPrompts : fallbackPrompts,
      });
    }

    // Handle 'welcomeMessage' type
    if (type === 'welcomeMessage') {
      const fallbackMessages = [
        "Welcome back! Let's make music magic happen!",
        "Hi there! Ready to create something amazing today?",
        "Hello! Let's tune into your musical dreams.",
      ];

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
                'You are a friendly and professional assistant for musicians. Generate a short, welcoming, and encouraging message (no more than 20 words) that feels warm and personal. Avoid fancy or overly formal language.',
            },
          ],
          max_tokens: 30, // Keep the response concise
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Azure OpenAI Error (Welcome Message):', error);
        const fallbackMessage =
          fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
        return NextResponse.json({ content: fallbackMessage });
      }

      const data = await response.json();
      const welcomeMessage =
        data.choices[0]?.message?.content ||
        fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];

      return NextResponse.json({ content: welcomeMessage });
    }

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
      console.error('Azure OpenAI Error (Chat):', error);
      throw new Error(`Azure OpenAI API error: ${error}`);
    }

    const data = await response.json();

    return NextResponse.json({
      role: 'assistant',
      content: data.choices[0]?.message?.content,
    });
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));

    console.error('API Error:', typedError.message);
    return NextResponse.json(
      {
        error: 'Error processing chat request',
        details: typedError.message,
      },
      { status: 500 }
    );
  }
}
