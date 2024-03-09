import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai'
 
export async function POST (request: NextRequest) {
  const req = await request.json();

  const apiKey = process.env.OPENAI_SECRET_KEY;
  const message = req.message;
  
  const timeout: number = 5000; // Vercel plan limit

  try {
    if (message == '') throw new Error('No message');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const openai = new OpenAI({ apiKey: apiKey });
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: `You're a Korean. Please answer the question in Korea. Question: ${message}` }],
      model: "gpt-3.5-turbo"
    });
    const content = completion.choices[0].message.content;

    clearTimeout(timer);

    return NextResponse.json({ content: content });
  } catch (error) {
    let errorMsg;
    if (typeof(error) === "string") {
      errorMsg = error.toUpperCase();
    } else if (error instanceof Error) {
      errorMsg = error.message;
    }
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
};