import { NextRequest, NextResponse } from 'next/server';
import { predictCareers } from '@/lib/career-matching';

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json();

    const predictions = predictCareers(profileData);
    
    return NextResponse.json({
      success: true,
      predictions,
    });
  } catch (error) {
    console.error('Error in career prediction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to predict careers' },
      { status: 500 }
    );
  }
}
