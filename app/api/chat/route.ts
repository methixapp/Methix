import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    // Remove any trailing slashes from the endpoint
    const baseUrl = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, '');
    
    // Construct the Azure OpenAI API URL properly
    const apiUrl = `${baseUrl}/openai/deployments/${process.env.AZURE_OPENAI_CHAT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`;
    
    console.log('Sending request to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!
      },
      body: JSON.stringify({
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Azure OpenAI Error:', error);
      throw new Error(`Azure OpenAI API error: ${error}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      role: 'assistant',
      content: data.choices[0].message.content
    });

  } catch (error) {

    const typedError = error instanceof Error ? error : new Error(String(error));

    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Error processing chat request',
        details: typedError.message 
      },
      { status: 500 }
    );
  }
}
