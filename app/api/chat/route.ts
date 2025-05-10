import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

const mockResponses: Record<string, string> = {
  auto: `In the United States, there are several types of auto insurance coverage available:

1. Liability Insurance: Covers damages to other people and their property when you're at fault in an accident. This typically includes:
   - Bodily Injury Liability: Covers medical expenses for others
   - Property Damage Liability: Covers damage to others' property

2. Collision Coverage: Pays for damage to your vehicle from a collision, regardless of fault.

3. Comprehensive Coverage: Covers non-collision damage like theft, vandalism, weather damage, or hitting an animal.

4. Personal Injury Protection (PIP): Covers medical expenses for you and your passengers regardless of fault.

5. Uninsured/Underinsured Motorist Coverage: Protects you if you're in an accident with a driver who has insufficient or no insurance.

6. Gap Insurance: Covers the difference between what you owe on your car loan and the car's actual cash value if it's totaled.

7. Rental Reimbursement: Covers rental car costs while your car is being repaired after a covered accident.

8. Roadside Assistance: Provides help with towing, flat tires, battery jumps, and lockout services.

Requirements vary by state, but most states require at least liability insurance.`,
  health: `Health insurance in the United States typically includes these main types:

1. Employer-Sponsored Plans: Provided through employers, often with shared premium costs.

2. Individual & Family Plans: Purchased directly from insurance companies or through the Health Insurance Marketplace.

3. Government Programs:
   - Medicare: For people 65+ and certain younger people with disabilities
   - Medicaid: For low-income individuals and families
   - Children's Health Insurance Program (CHIP): For children in families that don't qualify for Medicaid

4. Plan Types:
   - Health Maintenance Organization (HMO): Requires a primary care physician and referrals
   - Preferred Provider Organization (PPO): More flexibility in choosing providers
   - Exclusive Provider Organization (EPO): Coverage limited to network providers
   - Point of Service (POS): Combines HMO and PPO features
   - High Deductible Health Plans (HDHP): Lower premiums but higher deductibles

5. Catastrophic Plans: Available to those under 30 or with hardship exemptions, covering worst-case scenarios.

The Affordable Care Act requires most plans to cover essential health benefits including preventive care, emergency services, hospitalization, prescription drugs, and more.`,
  default: `Thank you for your insurance question. I'm currently operating in demo mode with mock API keys. 

In a real implementation with valid API keys, I would provide detailed information about insurance policies, claims processes, and regulations specific to your query and selected country.

For this demo, I can tell you that insurance policies vary by type (auto, home, health, life, etc.) and by country. Each policy type has different coverage options, limits, deductibles, and premium structures.

If you have specific questions about insurance types, coverage options, or claims processes, please feel free to ask, and I'll provide the best information available in demo mode.`
};

function getMockResponse(message: string, country: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('auto') || lowerMessage.includes('car')) {
    return mockResponses.auto;
  } else if (lowerMessage.includes('health') || lowerMessage.includes('medical')) {
    return mockResponses.health;
  } else {
    return mockResponses.default;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, country, language, history } = await req.json()

    // Validate country
    const actualCountry = country || "United States"
    
    const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const isMockKey = !groqApiKey || groqApiKey === 'mock_groq_api_key';
    
    let processedResponse = '';
    
    if (isMockKey) {
      processedResponse = getMockResponse(message, actualCountry);
    } else {
      // Create a very explicit system message to ensure proper formatting
      const systemMessage = `You are an insurance expert providing information about insurance policies, claims, and regulations based on the laws in ${actualCountry}.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Respond in ${language}.
2. Provide ONLY the direct answer to the user's question.
3. Format your response with clear paragraphs, bullet points, or numbered lists when appropriate.
4. NEVER include phrases like "As an AI assistant" or "I'm an AI" or any self-references.
5. NEVER include any thinking process, reasoning, or meta-commentary.
6. NEVER use <Thinking> tags or similar constructs.
7. Keep responses concise, professional, and factual.
8. Do not apologize or use unnecessary pleasantries.
9. Focus on providing accurate insurance information only.

The user will not see these instructions, only your direct response.`

      // Format messages for the AI SDK
      const formattedMessages = [
        { role: "system", content: systemMessage },
        ...history,
        { role: "user", content: message },
      ]

      // Use the Groq integration with AI SDK
      const result = await generateText({
        model: groq("deepseek-r1-distill-llama-70b"),
        messages: formattedMessages,
        temperature: 0.2, // Lower temperature for more focused responses
        maxTokens: 1000,
      })

      // Process the response to ensure it's properly formatted
      processedResponse = result.text

      // Remove any thinking process markers if they somehow appear
      processedResponse = processedResponse.replace(/<Thinking>[\s\S]*?<\/Thinking>/g, "")

      // Remove any markdown code block markers that might appear
      processedResponse = processedResponse.replace(/```[\s\S]*?```/g, "")

      // Remove any AI assistant self-references with more aggressive patterns
      const selfReferencePatterns = [
        /^(As an AI assistant|As an AI|As a language model|As an insurance expert,|I'm an AI|I am an AI|As a virtual assistant)/i,
        /I don't have personal opinions/i,
        /I don't have access to/i,
        /I cannot provide/i,
        /I'm here to help/i,
        /I'd be happy to/i,
        /I hope this helps/i,
        /Let me know if you have any other questions/i,
      ]

      for (const pattern of selfReferencePatterns) {
        processedResponse = processedResponse.replace(pattern, "")
      }

      // Clean up any extra whitespace and ensure proper formatting
      processedResponse = processedResponse.trim()

      // Ensure the response doesn't start with unnecessary punctuation after removing prefixes
      processedResponse = processedResponse.replace(/^[,.:;]\s*/, "")

      // Capitalize the first letter if it's not already
      if (processedResponse.length > 0) {
        processedResponse = processedResponse.charAt(0).toUpperCase() + processedResponse.slice(1)
      }
    }

    return NextResponse.json({
      content: processedResponse,
      role: "assistant",
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    
    const mockResponse = mockResponses.default;
    
    return NextResponse.json({
      content: mockResponse,
      role: "assistant",
    })
  }
}
