import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'week';
  
  // Simulated mood data
  const moodData = {
    week: {
      average: 72,
      trend: 'up',
      data: [65, 70, 68, 75, 80, 78, 75]
    },
    month: {
      average: 68,
      trend: 'stable',
      data: Array.from({ length: 30 }, () => 60 + Math.random() * 40)
    },
    year: {
      average: 65,
      trend: 'improving',
      data: Array.from({ length: 12 }, () => 50 + Math.random() * 50)
    }
  };
  
  return NextResponse.json({
    period,
    summary: moodData[period as keyof typeof moodData] || moodData.week,
    timestamp: new Date().toISOString()
  });
}