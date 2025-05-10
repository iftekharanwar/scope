import { type NextRequest, NextResponse } from "next/server"

interface Message {
  role: string
  content: string
}

async function createMockAudioResponse(): Promise<Response> {
  return NextResponse.json(
    { 
      message: "This is a mock audio response. In a production environment with valid API keys, this would return actual audio content.",
      mockMode: true 
    }, 
    { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { messages, language } = await req.json()

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    const isMockKey = !elevenLabsApiKey || elevenLabsApiKey === 'mock_elevenlabs_api_key';
    
    if (isMockKey) {
      return createMockAudioResponse();
    }

    // Format conversation for text-to-speech
    let conversationText = ""
    for (const msg of messages) {
      if (msg.role === "user") {
        conversationText += `You said: ${msg.content}\n\n`
      } else if (msg.role === "assistant") {
        conversationText += `AI Insurance Chatbot responded with: ${msg.content}\n\n`
      }
    }

    // Limit text length to avoid exceeding ElevenLabs limits
    if (conversationText.length > 5000) {
      conversationText = conversationText.substring(conversationText.length - 5000)
    }

    // Select voice based on language
    let voiceId = "21m00Tcm4TlvDq8ikWAM" // Default English voice (Rachel)

    // Map languages to appropriate ElevenLabs voices
    // You can customize these with your preferred voices from ElevenLabs
    switch (language) {
      case "Spanish":
        voiceId = "ZQe5CZNOzWyzPSCn5a3c" // Antonio
        break
      case "French":
        voiceId = "XrExE9yKIg1WjnnlVkGX" // Gigi
        break
      case "German":
        voiceId = "oWAxZDx7w5VEj9dCyTzz" // Hans
        break
      case "Hindi":
      case "Mandarin":
      case "Arabic":
        // For languages without specific voices, use a multilingual voice
        voiceId = "VR6AewLTigWG4xSOukaG" // Adam (multilingual)
        break
    }

    // Call ElevenLabs API to generate speech
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": elevenLabsApiKey || "",
      },
      body: JSON.stringify({
        text: conversationText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("ElevenLabs API error:", errorData)
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    const audioBuffer = await response.arrayBuffer()

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })
  } catch (error) {
    console.error("Error in text-to-speech API:", error)
    
    return createMockAudioResponse();
  }
}
