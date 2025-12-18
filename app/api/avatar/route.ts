import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Avatar API endpoint',
    status: 'under construction'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      success: true,
      message: 'Avatar generation endpoint',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}