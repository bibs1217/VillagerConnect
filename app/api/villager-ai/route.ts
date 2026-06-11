export const dynamic = 'force-dynamic'

const SYSTEM_ENTERTAINMENT = `You are the VillagerConnect Entertainment AI for The Villages, Florida.
Present findings in clear sections: list performers by venue (Spanish Springs, Lake Sumter Landing, Brownwood), include dates/times, cover genres/styles, and mention any special events at Sharon L. Morse Performing Arts Center. Be enthusiastic and community-focused.`

const SYSTEM_NEWS = `You are the VillagerConnect News AI for The Villages, Florida and Sumter County.
Organize findings into sections: Local Government, Community News, Development, Business, and any notable stories. Cite sources (Villages Daily Sun, Ocala Star-Banner, Villages-News.com) when found. Be factual, balanced, and focused on what matters to Villages residents.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, query } = body

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return Response.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 })

    const systemPrompt = type === 'news' ? SYSTEM_NEWS : SYSTEM_ENTERTAINMENT

    const defaultEntertainmentQuery = `Search the web for current entertainment events and live music performances at The Villages Florida town squares including Lake Sumter Landing, Brownwood Paddock Square, and Spanish Springs Town Square for this month. Find real scheduled performers and events.`

    const defaultNewsQuery = `Search the web for the latest news from The Villages Florida and Sumter County. Find real current headlines from Villages Daily Sun, Ocala Star-Banner, and Villages-News.com`

    const userMessage = type === 'news'
      ? (query || defaultNewsQuery)
      : (query || defaultEntertainmentQuery)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        stream: true,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    if (!response.ok || !response.body) {
      const err = await response.text()
      return Response.json({ error: err.slice(0, 200) }, { status: response.status })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line.startsWith('data:')) continue
            const payload = line.slice(5).trim()
            if (payload === '[DONE]') break
            try {
              const ev = JSON.parse(payload)
              if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
                const data = JSON.stringify({ type: 'text', text: ev.delta.text })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }
            } catch {}
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
