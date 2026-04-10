const API_KEY = import.meta.env.VITE_GROQ_API_KEY

const SYSTEM_DEFAULT = `You are MediQ, a knowledgeable and empathetic AI health assistant built into a premium healthcare platform. 
Your role is to help users understand health topics, symptoms, medicines, and first aid.
Always be clear, structured, and compassionate. Use plain language.
IMPORTANT RULES:
- Never provide a definitive medical diagnosis.
- Always encourage consulting a qualified doctor for serious symptoms.
- Include a brief disclaimer when giving medical information.
- Format responses with clear sections, bullet points, or numbered lists where helpful.
- Keep responses informative but concise.`

export async function askGroq(messages, systemOverride = null) {
  if (!API_KEY || API_KEY === 'your_groq_api_key_here') {
    throw new Error('Missing API key. Please add your Groq API key to the .env file. Get a free key at console.groq.com')
  }

  const systemInstruction = systemOverride || SYSTEM_DEFAULT

  const groqMessages = [
    { role: 'system', content: systemInstruction },
    ...messages.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content : String(m.content),
    })),
  ]

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: groqMessages,
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error.message || 'Groq API error occurred')
  }

  const choice = data.choices?.[0]
  if (!choice) throw new Error('No response from Groq')

  return choice.message.content
}

export const askGemini = askGroq
export const askClaude = askGroq
