"use server";

import { ClovaXClient } from "@/app/api/clovax/client";

interface CareerMatch {
  career: string;
  matchScore: number;
  reasons: string[];
  challenges: string[];
}

interface ProfileData {
  name: string;
  gpa: number;
  mbti: string;
  traits: Record<string, number>;
  skills: Record<string, number>;
  interests: string[];
}

export async function generateCareerAdvice(
  profileData: ProfileData,
  predictions: CareerMatch[]
) {
  const client = new ClovaXClient();

  const systemPrompt = `You are an expert AI career counselor with 15+ years of experience in the technology industry.

YOUR MISSION:
- Analyze career prediction results from the system
- Provide PRACTICAL, PERSONALIZED advice for students
- Clearly explain WHY these careers are suitable
- Be encouraging but NOT exaggerated
- Point out challenges constructively

PRINCIPLES:
Base advice on specific data (GPA, MBTI, skills, interests)
Balance passion with market reality
Provide actionable advice
Be positive but honest
DO NOT make up information
DO NOT give generic advice
DO NOT be overly optimistic or pessimistic`;

  const userMessage = `Please analyze and provide career counseling for this student:

STUDENT PROFILE:
- Name: ${profileData.name}
- GPA: ${profileData.gpa.toFixed(1)}/4.0
- MBTI Personality Type: ${profileData.mbti}

PERSONALITY TRAITS (0-10 scale):
${Object.entries(profileData.traits).map(([trait, value]) => `  • ${trait}: ${value}/10`).join('\n')}

SKILLS ASSESSMENT (0-10 scale):
${Object.entries(profileData.skills).map(([skill, value]) => `  • ${skill}: ${value}/10`).join('\n')}

INTERESTS:
${profileData.interests.map(i => `  • ${i}`).join('\n')}

AI PREDICTION RESULTS:

${predictions.slice(0, 3).map((pred, idx) => `
${idx + 1}. ${pred.career} - Match Score: ${(pred.matchScore * 100).toFixed(1)}%
   
   Why suitable:
${pred.reasons.map(r => `   • ${r}`).join('\n')}
   
   Challenges:
${pred.challenges.map(c => `   • ${c}`).join('\n')}
`).join('\n')}

---

Please provide detailed analysis and advice for this student. Format your response with this structure:

1. **PROFILE SUMMARY**: Highlight key strengths & weaknesses
2. **TOP 3 RECOMMENDED CAREERS**: Detailed explanation for each career path
3. **ACTION RECOMMENDATIONS**: Specific next steps (short-term, mid-term, long-term)
4. **PERSONAL ADVICE**: Motivation and guidance tailored to this student`;

  try {
    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userMessage },
    ];

    const request = client.createRequest(messages);
    const response = await client.createChatCompletion(request);

    return {
      success: true,
      advice: response.result.message.content as string,
      metadata: {
        tokensUsed: response.result.usage.totalTokens,
        model: 'ClovaX',
      },
    };
  } catch (error) {
    console.error('Error generating advice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
