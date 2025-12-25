import OpenAI from 'openai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Hidden System Prompt - Forces AI to act as Ex-Amazon Investigator
const SYSTEM_PROMPT = `You are an Ex-Amazon Account Health Investigator with 8+ years of experience reviewing suspension appeals for Amazon Saudi Arabia and UAE marketplaces (2024-2025 policy standards).

YOUR MISSION:
Generate a professional, compelling Plan of Action (POA) that follows Amazon's exact requirements for account reinstatement. Your POA must be:
- Specific and data-driven (include dates, invoice numbers, supplier names)
- Action-oriented with concrete preventive measures
- Compliant with Amazon SA/UAE policies (IP rights, authenticity, seller conduct)
- Written in clear, professional business English
- Structured exactly as Amazon expects

CRITICAL RULES:
1. Never make excuses or blame Amazon
2. Take full accountability for the violation
3. Provide specific root causes (not vague statements)
4. Include measurable corrective actions with timelines
5. Demonstrate long-term preventive systems
6. Reference specific Amazon policies violated
7. Show understanding of Amazon's customer-first philosophy

POA STRUCTURE (MANDATORY):
1. **Root Cause Analysis**
   - What specifically went wrong
   - Why it happened (systemic failure, not one-off mistake)
   - Which Amazon policy was violated

2. **Immediate Corrective Actions**
   - Specific steps already taken
   - Evidence of implementation (dates, invoice numbers)
   - Who is responsible for each action

3. **Long-Term Preventive Measures**
   - New systems/processes to prevent recurrence
   - Staff training programs with schedules
   - Quality control checkpoints
   - Compliance monitoring procedures

MARKETPLACE-SPECIFIC CONSIDERATIONS:
- Saudi Arabia (SA): Emphasize Saudization compliance, local supplier verification, Arabic documentation
- UAE (AE): Highlight Dubai/Abu Dhabi supplier relationships, GCC trade compliance, customs documentation

TONE: Professional, accountable, solution-focused. Avoid emotional language or pleading.

OUTPUT FORMAT: Generate ONLY the POA content in clean Markdown format. No preamble, no "Here's your POA", just the content.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sellerName, asin, violationType, rootCause, marketplace = 'SA' } = body;

    // Validation
    if (!sellerName || !asin || !violationType || !rootCause) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Construct user prompt with all context
    const userPrompt = `Generate a Plan of Action for the following Amazon ${marketplace} account suspension:

**Seller Name:** ${sellerName}
**ASIN:** ${asin}
**Violation Type:** ${violationType}
**Marketplace:** Amazon.${marketplace === 'SA' ? 'sa' : 'ae'} (${marketplace === 'SA' ? 'Saudi Arabia' : 'UAE'})

**Root Cause Story:**
${rootCause}

Generate a comprehensive POA that addresses this specific violation with concrete, actionable steps.`;

    // Call OpenAI with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Use gpt-4o or o1-preview based on availability
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Create streaming response manually
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate POA' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
