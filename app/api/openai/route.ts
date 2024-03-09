import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai'
 
export async function POST (request: NextRequest) {
  const req = await request.json();

  const apiKey = process.env.OPENAI_SECRET_KEY;
  const content = req.content;
  
  const timeout: number = 5000; // Vercel plan limit

  try {
    if (content == '') throw new Error('No content');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const openai = new OpenAI({ apiKey: apiKey });
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: content }],
      model: "gpt-3.5-turbo"
    });

    clearTimeout(timer);

    return NextResponse.json({ choice: completion.choices[0] });
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