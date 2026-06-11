// VillagerConnect AI — full platform concierge with Anthropic tool use.
// POST { messages: [{ role: 'user'|'assistant', content: string }] }
// Returns { text, cards } where cards are structured results for inline rendering.
export const dynamic = 'force-dynamic'
export const maxDuration = 60

import {
  LANDINGS, GOLF_COURSES, CART_RENTALS, COMMUNITY_EVENTS,
  OFFICIALS, UPCOMING_ELECTIONS, VOTER_INFO, ENTERTAINMENT_SHOWS,
} from '../../../lib/villages-data'

const SYSTEM_PROMPT = `You are the VillagerConnect AI — a longtime Villages resident and expert community concierge with live access to the entire VillagerConnect platform for The Villages, Florida. You can search nightly entertainment at all three town squares, look up restaurants and shops at every landing, search 50+ golf courses, find golf cart rental companies with live rates, surface community events, get golf cart decorating ideas for holidays and parades, and pull local officials, upcoming elections, and voter information for Sumter County. You also have live web search for anything else — news, weather, schedules, or questions beyond the platform.

When a user asks a question, proactively search across whatever platform features are relevant and include specific recommendations, names, times, prices, and phone numbers in your response. You can run multiple searches in a single response. Never tell the user you can't look something up. Be warm, direct, knowledgeable, and neighborly — the friendliest guide in the friendliest hometown.`

function match(hay: string, q: string): boolean {
  if (!q) return true
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  if (!words.length) return true
  const h = hay.toLowerCase()
  return words.some(w => h.includes(w))
}

const TOOLS: any[] = [
  { type: 'web_search_20250305', name: 'web_search' },
  {
    name: 'entertainment_search',
    description: 'Search live entertainment and nightly music at The Villages town squares and venues by performer, genre, venue, or date.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Performer, genre, or keyword' },
      venue: { type: 'string', description: 'Lake Sumter Landing, Brownwood Paddock Square, Spanish Springs Town Square, or any' },
      date: { type: 'string', description: 'Date or range, e.g. tonight, this weekend, 2026-06-14' },
    } },
  },
  {
    name: 'dining_lookup',
    description: 'Find restaurants, cafes, and shops at The Villages landings and town squares. Returns hours, phone, and details.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Cuisine, restaurant name, or shop keyword' },
      landing: { type: 'string', description: 'Specific landing/square name, or any' },
      type: { type: 'string', description: 'restaurant or retail' },
    } },
  },
  {
    name: 'golf_course_search',
    description: 'Search The Villages golf courses — championship and executive — by name, type, or public access. Returns holes, par, fees.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Course name or keyword' },
      type: { type: 'string', description: 'Championship, Executive, or any' },
      public_only: { type: 'boolean', description: 'Only courses open to the public / residents' },
    } },
  },
  {
    name: 'cart_rental_lookup',
    description: 'Find golf cart rental companies serving The Villages with daily/weekly/monthly rates, cart types, delivery, and deposits.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Cart type or keyword, e.g. 4-passenger, street legal, luxury' },
      duration: { type: 'string', description: 'daily, weekly, or monthly' },
    } },
  },
  {
    name: 'events_lookup',
    description: 'Find upcoming community events in The Villages — socials, sports, arts, health, education, civic, clubs.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Event keyword' },
      category: { type: 'string', description: 'Social, Sports, Arts & Culture, Health & Wellness, Education, Civic, Holiday, Club, or any' },
      date_range: { type: 'string', description: 'e.g. this weekend, next 30 days' },
    } },
  },
  {
    name: 'elections_lookup',
    description: 'Look up elected officials for The Villages / Sumter County, upcoming elections, and voter registration information.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Official name, office, election, or topic like register to vote' },
      scope: { type: 'string', description: 'Federal, State, Local, or any' },
    } },
  },
  {
    name: 'news_search',
    description: 'Get the trusted local news sources for The Villages and Sumter County. Pair with web_search for live headlines.',
    input_schema: { type: 'object', properties: {
      topic: { type: 'string', description: 'News topic of interest' },
    } },
  },
  {
    name: 'cart_decorating_ideas',
    description: 'Get golf cart decorating themes, parade info, materials and tips for The Villages. Use for any question about decorating a golf cart for holidays, parades, contests, weddings, or events.',
    input_schema: { type: 'object', properties: {
      occasion: { type: 'string', description: 'Occasion or theme, e.g. Christmas, 4th of July, Halloween, Birthday, Wedding' },
    } },
  },
]

type Card = { kind: string; [k: string]: any }

function runTool(name: string, input: any, cards: Card[]): any {
  const q = (input?.query || '') as string
  if (name === 'entertainment_search') {
    let res = ENTERTAINMENT_SHOWS.filter((s: any) =>
      match(`${s.performer} ${s.genre} ${s.description}`, q) &&
      (!input.venue || input.venue.toLowerCase() === 'any' || s.venue.toLowerCase().includes(input.venue.toLowerCase()))
    ).slice(0, 6)
    if (!res.length) res = ENTERTAINMENT_SHOWS.slice(0, 6)
    res.forEach((s: any) => cards.push({ kind: 'show', ...s }))
    return { shows: res, note: 'Nightly live music at all three town squares 7-10 PM is free. Use web_search for this week’s official schedule if needed.' }
  }
  if (name === 'dining_lookup') {
    const out: any[] = []
    LANDINGS.forEach((l: any) => {
      l.businesses.forEach((b: any) => {
        if (input.landing && input.landing.toLowerCase() !== 'any' && !l.name.toLowerCase().includes(input.landing.toLowerCase())) return
        if (input.type && b.type !== input.type) return
        if (!match(`${b.name} ${b.notes || ''}`, q)) return
        out.push({ ...b, landing: l.name })
      })
    })
    const res = out.slice(0, 8)
    res.forEach((b: any) => cards.push({ kind: 'dining', ...b }))
    return { results: res, landings: LANDINGS.map((l: any) => ({ name: l.name, description: l.description, entertainment: l.entertainment })) }
  }
  if (name === 'golf_course_search') {
    let res = GOLF_COURSES.filter((c: any) =>
      match(`${c.name} ${c.notes}`, q) &&
      (!input.type || input.type.toLowerCase() === 'any' || c.type.toLowerCase() === input.type.toLowerCase()) &&
      (!input.public_only || !c.memberOnly)
    ).slice(0, 8)
    if (!res.length) res = GOLF_COURSES.slice(0, 8)
    res.forEach((c: any) => cards.push({ kind: 'course', ...c }))
    return { courses: res, totals: { championship: 11, executive: '36+', note: 'Executive courses are free for residents' } }
  }
  if (name === 'cart_rental_lookup') {
    const res = CART_RENTALS.filter((r: any) => match(`${r.name} ${(r.types || []).join(' ')} ${r.notes}`, q)).slice(0, 6)
    const list = res.length ? res : CART_RENTALS
    list.forEach((r: any) => cards.push({ kind: 'rental', ...r }))
    return { companies: list }
  }
  if (name === 'events_lookup') {
    let res = COMMUNITY_EVENTS.filter((e: any) =>
      match(`${e.title} ${e.description} ${e.location} ${e.organizer}`, q) &&
      (!input.category || input.category.toLowerCase() === 'any' || e.category === input.category)
    ).slice(0, 6)
    if (!res.length) res = COMMUNITY_EVENTS.slice(0, 6)
    res.forEach((e: any) => cards.push({ kind: 'event', ...e }))
    return { events: res }
  }
  if (name === 'elections_lookup') {
    const officials = OFFICIALS.filter((o: any) =>
      match(`${o.name} ${o.title}`, q) &&
      (!input.scope || input.scope.toLowerCase() === 'any' || o.scope.toLowerCase() === input.scope.toLowerCase())
    )
    const offs = officials.length ? officials : OFFICIALS
    offs.slice(0, 6).forEach((o: any) => cards.push({ kind: 'official', ...o }))
    UPCOMING_ELECTIONS.forEach((e: any) => cards.push({ kind: 'election', ...e }))
    return { officials: offs, upcoming_elections: UPCOMING_ELECTIONS, voter_info: VOTER_INFO }
  }
  if (name === 'news_search') {
    return {
      sources: [
        { name: 'Villages-News.com', url: 'https://www.villages-news.com' },
        { name: 'The Villages Daily Sun', url: 'https://www.thevillagesdailysun.com' },
        { name: 'Ocala Star-Banner', url: 'https://www.ocala.com' },
      ],
      note: 'Use web_search now to pull live current headlines on the topic: ' + (input.topic || 'The Villages Florida news'),
    }
  }
  if (name === 'cart_decorating_ideas') {
    const occ = input.occasion || q || 'Holiday'
    cards.push({ kind: 'decor', occasion: occ, title: occ + ' Cart Decorating Studio', note: 'Full decorating AI assistant, idea gallery, and community cart photos' })
    return {
      occasion: occ,
      popular_themes: ['Christmas', 'Halloween', '4th of July', 'Spring/Easter', 'Game Day', 'Birthday', 'Wedding', 'Thanksgiving', 'New Years', 'Valentines Day', 'St Patricks Day', 'Golf Tournament'],
      parades: 'Famous decorated golf cart parades at Lake Sumter Landing, Brownwood Paddock Square, and Spanish Springs - biggest are Christmas and 4th of July.',
      tips: 'Use magnetic mounts, zip ties, and Command strips (no frame damage). Pick Florida-proof materials that survive heat, humidity, and rain. LED lighting works with 36V/48V/72V carts via 12V accessory outlets. Shop Dollar Tree, Walmart, Michaels near 32162.',
      instruction: 'Give the user a materials list with estimated costs, step-by-step instructions, attachment tips, and Florida weather notes for the occasion. Point them to the Cart Decorating studio card for the full gallery and dedicated AI assistant.',
    }
  }
  return { error: 'Unknown tool' }
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return Response.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 })
    const body = await req.json()
    const history = (body.messages || []).slice(-12).map((m: any) => ({ role: m.role, content: String(m.content || '').slice(0, 4000) }))
    if (!history.length) return Response.json({ error: 'No messages' }, { status: 400 })

    const cards: Card[] = []
    const msgs: any[] = [...history]
    let text = ''

    for (let turn = 0; turn < 6; turn++) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'web-search-2025-03-05',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          tools: TOOLS,
          messages: msgs,
        }),
      })
      if (!r.ok) {
        const err = await r.text()
        return Response.json({ error: err.slice(0, 300) }, { status: 502 })
      }
      const data = await r.json()
      const content = data.content || []
      text = content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n')

      if (data.stop_reason !== 'tool_use') break

      const toolUses = content.filter((b: any) => b.type === 'tool_use')
      msgs.push({ role: 'assistant', content })
      msgs.push({
        role: 'user',
        content: toolUses.map((tu: any) => ({
          type: 'tool_result',
          tool_use_id: tu.id,
          content: JSON.stringify(runTool(tu.name, tu.input || {}, cards)).slice(0, 6000),
        })),
      })
    }

    // de-dupe cards
    const seen = new Set<string>()
    const unique = cards.filter(c => {
      const k = c.kind + ':' + (c.name || c.title || c.performer || '')
      if (seen.has(k)) return false
      seen.add(k)
      return true
    }).slice(0, 12)

    return Response.json({ text: text || 'Sorry — I came up empty on that one. Try rephrasing?', cards: unique })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}
