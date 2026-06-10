export const dynamic = 'force-dynamic'

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_ENTERTAINMENT = `You are the VillagerConnect Entertainment AI, a helpful assistant for residents and visitors of The Villages in Sumter County, Florida.

The Villages is a massive 55+ retirement community in central Florida with:
- Regular free entertainment at 3 town squares: Spanish Springs, Lake Sumter Landing, and Brownwood Paddock Square
- Nationally known performers at Sharon L. Morse Performing Arts Center
- Golf tournaments and sporting events
- Over 3,000 clubs and activities
- Seasonal events, holiday celebrations, and community festivals

Provide entertaining, friendly, and informative summaries about upcoming entertainment in The Villages. Format your response in clear sections. Mention specific venues and types of entertainment. Be enthusiastic and positive — this is a wonderful community!`

const SYSTEM_NEWS = `You are the VillagerConnect News AI, a helpful assistant for residents and visitors of The Villages in Sumter County, Florida.

The Villages is a large retirement community in Sumter County, FL. Key local news sources include:
- The Villages Daily Sun (official newspaper)
- Villages-News.com (independent local news)
- Ocala Star-Banner (regional coverage)
- Sumter County Times
- Florida Trident (local news)

Provide helpful summaries of topics relevant to Villages residents including:
- Local government and community decisions
- New development and construction updates
- Business openings and closings
- Crime and safety reports
- Health and medical news
- Transportation and infrastructure
- Weather and environmental news

Be informative, balanced, and focused on what matters to Villages residents. Format with clear sections.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, query } = body

    const systemPrompt = type === 'news' ? SYSTEM_NEWS : SYSTEM_ENTERTAINMENT

    const userMessage = type === 'news'
      ? (query || 'What are the latest news topics and stories relevant to Villages residents? Cover local government, community updates, and anything notable happening in and around The Villages, Florida.')
      : (query || 'What entertainment and events are happening in The Villages this week and upcoming? Cover all three town squares, the performing arts center, and any special events.')

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const messageStream = await client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        })

        for await (const event of messageStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const data = JSON.stringify({ type: 'text', text: event.delta.text })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err: any) {
    console.error('villager-ai error:', err)
    return Response.json({ error: err.message ?? 'AI service unavailable' }, { status: 500 })
  }
}
