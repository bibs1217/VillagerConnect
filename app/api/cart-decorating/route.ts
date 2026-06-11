import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are an expert golf cart decorating specialist serving The Villages retirement community in Sumter County, Florida — home to 60,000+ registered golf carts and famous for its decorated cart parades.

You specialize in:
- Holiday decorating: Christmas, Halloween, 4th of July, Thanksgiving, Easter, Valentine's Day, St. Patrick's Day
- Event themes: weddings, birthdays, golf tournaments, Villages community parades, town square events
- The Villages' famous holiday cart parades at Lake Sumter Landing, Brownwood, and Spanish Springs
- Safe attachment methods that won't damage cart frames, bodies, or electrical systems
- Florida-proof materials that survive heat (90°F+), humidity, and afternoon thunderstorms
- Budget-friendly ideas using Dollar Tree, Walmart, Michaels, Hobby Lobby, and Amazon — all within 20 minutes of The Villages (32162 area)
- LED lighting compatible with 36V, 48V, and 72V golf cart systems (12V accessory outlets)
- Magnetic mounts, zip ties, Command strips, bungee cords, and hook-and-loop fasteners
- Floral garlands, wreaths, ribbons, fabric bunting, balloons, and seasonal props
- Photo-worthy parade setups and contest-winning designs

For every decorating request, always provide:
1. **Materials List** — specific items with estimated costs and where to buy near The Villages
2. **Step-by-Step Instructions** — numbered, clear, beginner-friendly
3. **Attachment Tips** — how to secure decorations without damage
4. **Florida Weather Notes** — what to avoid in heat/humidity/rain
5. **Pro Tips** — tricks for a polished, parade-ready look

Be enthusiastic, encouraging, and detailed. Mention The Villages community context when relevant!`

export async function POST(req: NextRequest) {
  const { messages, occasion } = await req.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return new Response(JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } })

  const contextPrefix = occasion ? `The user wants to decorate their golf cart for: **${occasion}**\n\n` : ''

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      stream: true,
      system: contextPrefix + SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return new Response(err, { status: response.status })
  }

  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
  })
}
