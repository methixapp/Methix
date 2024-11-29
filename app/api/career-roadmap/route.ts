import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userMetrics, ambitions } = await request.json(); // Expect metrics and ambitions in the request body.

    const baseUrl = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, '');
    const apiUrl = `${baseUrl}/openai/deployments/${process.env.AZURE_OPENAI_CHAT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`;

    // Construct the prompt for the AI model
    const prompt = `
      Based on the following user metrics and career ambitions, generate a personalized career roadmap for a music artist.
      Metrics: ${JSON.stringify(userMetrics)}.
      Ambitions: ${ambitions}.
      Provide 3-5 actionable steps with a title, a short description, and an estimated progress percentage.
      Focus areas include fanbase growth, content creation, networking, and release planning.
    `;

    // Call Azure OpenAI API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a career planner for music artists.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Azure OpenAI Error:', error);
      throw new Error(`Azure OpenAI API error: ${error}`);
    }

    const data = await response.json();

    // Parse the AI-generated content into actionable steps
    const roadmapSteps = data.choices[0]?.message?.content
      ?.split('\n') // Split into lines
      .filter((line: string) => line.trim()) // Remove blank lines
      .map((line: string) => {
        const [title, description] = line.split(':'); // Split into title and description
        return {
          title: title?.trim(),
          description: description?.trim(),
          progress: Math.floor(Math.random() * 20), // Add random progress (0-20%) as a placeholder
        };
      });

    // Return the roadmap steps in JSON format
    return NextResponse.json({ steps: roadmapSteps });
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));

    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Error generating career roadmap',
        details: typedError.message,
      },
      { status: 500 }
    );
  }
}
