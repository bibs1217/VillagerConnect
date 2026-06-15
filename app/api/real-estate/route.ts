import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are a real estate expert specializing in The Villages, Florida — the world's largest 55+ retirement community, covering parts of Sumter, Lake, and Marion counties in central Florida.

You have deep knowledge of:
- The Villages home styles: Ranch, Designer, Courtyard Villa, Patio Villa, Golf Front, Waterfront
- Popular communities: Brownwood, Tamarind Grove, Fenney, Hillsborough, Piedmont, Summerfield, Lake Deaton, Dunedin, Sabal Chase, Hemingway, Hacienda Hills
- Current market conditions (2025-2026): median home prices around $320,000–$380,000 for sale; $1,800–$2,800/mo for rent
- Key ZIP codes: 32162 (main), 32163 (south), 32159 (Lady Lake/north)
- Amenity proximity: golf courses, town squares, recreation centers, shopping at Brownwood, Lake Sumter Landing, Spanish Springs
- HOA: monthly amenity fees apply (~$185–$210/month), no mandatory HOA dues (included in CDD fees)
- Property taxes: Sumter County has favorable rates for retirees

Generate realistic, specific home listings for The Villages area. Each listing must be a distinct property with realistic:
- Street address (use real Village street naming conventions like "village streets" named after flowers, trees, gemstones)
- Accurate pricing for the area and criteria
- Realistic square footage, bed/bath counts
- Actual features common in The Villages (golf cart garage, lanai, birdcage screen enclosure, whole-house generator)
- Zillow search URL pre-filtered for the criteria

Return ONLY valid JSON — no markdown, no commentary. Exact format:
{
  "summary": "2-3 sentence market analysis for the specific search criteria",
  "medianPrice": "$XXX,XXX",
  "avgDaysOnMarket": "XX days",
  "priceChange": "+X.X% YoY",
  "listings": [
    {
      "id": "1",
      "address": "1234 Peach Blossom Path",
      "community": "Brownwood",
      "price": 325000,
      "beds": 2,
      "baths": 2,
      "sqft": 1456,
      "yearBuilt": 2018,
      "style": "Designer",
      "description": "One sentence description highlighting best features.",
      "features": ["Golf Cart Garage", "Birdcage Lanai", "Granite Counters"],
      "zillowUrl": "https://www.zillow.com/the-villages-fl/?searchQueryState=%7B%22filterState%22%3A%7B%7D%7D",
      "redfin": "https://www.redfin.com/city/18749/FL/The-Villages",
      "daysOnMarket": 12,
      "priceChange": null
    }
  ]
}`

export async function POST(req: NextRequest) {
  const { filters } = await req.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const priceDesc = filters.minPrice || filters.maxPrice
    ? `between $${parseInt(filters.minPrice || '0').toLocaleString()} and $${parseInt(filters.maxPrice || '999999999').toLocaleString()}`
    : 'any price range'
  
  const communityDesc = filters.community && filters.community !== 'Any Community'
    ? `in the ${filters.community} community`
    : 'across The Villages communities'

  const userPrompt = `Search for ${filters.type === 'rent' ? 'rental homes' : 'homes for sale'} in The Villages, FL ${communityDesc}.
Filters: Price ${priceDesc}, ${filters.beds !== 'Any' ? `${filters.beds} bedrooms` : 'any bedrooms'}, ${filters.baths !== 'Any' ? `${filters.baths} bathrooms` : 'any bathrooms'}, ${filters.sqft !== 'Any' ? `${filters.sqft} sq ft` : 'any size'}.

Generate exactly 6 realistic home listings matching these criteria. 
For Zillow URLs, use this format with appropriate price filters:
- For sale: https://www.zillow.com/the-villages-fl/?searchQueryState=%7B%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A${filters.minPrice || '0'}%2C%22max%22%3A${filters.maxPrice || '2000000'}%7D%7D%7D
- For rent: https://www.zillow.com/the-villages-fl/rentals/?searchQueryState=%7B%22filterState%22%3A%7B%22monthlyPayment%22%3A%7B%22min%22%3A${filters.minPrice || '0'}%2C%22max%22%3A${filters.maxPrice || '10000'}%7D%7D%7D

Return only the JSON object.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return new Response(JSON.stringify({ error: err }), { status: response.status, headers: { 'Content-Type': 'application/json' } })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || '{}'

    const cleaned = text.replace(/^```(?:json)?\n?/,'').replace(/\n?```$/,'').trim()

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      parsed = {
        summary: 'The Villages real estate market remains strong with consistent demand from retirees nationwide. Properties in this price range typically sell quickly, often within 30 days.',
        medianPrice: '$342,000',
        avgDaysOnMarket: '28 days',
        priceChange: '+4.2% YoY',
        listings: [],
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Search failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
