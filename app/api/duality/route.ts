import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { input, lang } = await req.json()

    // 1️⃣ Langue cible
    const language =
      lang === 'ar'
        ? 'Arabic'
        : lang === 'fr'
        ? 'French'
        : 'English'

    // 2️⃣ Prompt STRICT (clé du problème)
    const systemPrompt = `
You are a deep introspective guide.
You MUST respond ONLY in ${language}.
Never mix languages.

If the language is Arabic:
- Use clear modern Arabic
- No English words
- No Latin characters
- Use emotionally deep and poetic Arabic

If the language is French:
- Use elegant, introspective French

Structure the response clearly.
`

    // 3️⃣ Appel OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input },
      ],
      temperature: 0.8,
    })

    return NextResponse.json({
      analysis: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}
