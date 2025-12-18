import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Soulset analysis API',
    version: '1.0.0',
    endpoints: ['/questions', '/analyze', '/results']
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;
    
    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      );
    }
    
    // Calculate average score
    const averageScore = answers.reduce((a: number, b: number) => a + b, 0) / answers.length;
    const overallScore = Math.round((1 - averageScore / 4) * 100);
    
    const analysis = {
      overallScore,
      categoryScores: {
        emotional: Math.round(Math.random() * 100),
        cognitive: Math.round(Math.random() * 100),
        social: Math.round(Math.random() * 100),
        physical: Math.round(Math.random() * 100)
      },
      recommendations: [
        'Practice daily gratitude journaling',
        'Engage in regular physical activity',
        'Prioritize quality sleep',
        'Connect with supportive relationships'
      ],
      insights: [
        'You show strong emotional awareness',
        'Consider exploring mindfulness practices',
        'Your social connections are a strength'
      ]
    };
    
    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}