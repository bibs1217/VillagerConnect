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

Return ONLY a valid JSON object — no markdown code fences, no commentary, no text before or after the JSON. Exact format:
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
      "zillowUrl": "https://www.zillow.com/the-villages-fl/",
      "redfin": "https://www.redfin.com/city/18749/FL/The-Villages",
      "daysOnMarket": 12,
      "priceChange": null
    }
  ]
}`

const FALLBACK_LISTINGS = [
  {
    id: '1',
    address: '1204 Wisteria Way',
    community: 'Brownwood',
    price: 329000,
    beds: 2,
    baths: 2,
    sqft: 1452,
    yearBuilt: 2019,
    style: 'Designer',
    description: 'Charming designer home with open floor plan, golf cart garage, and birdcage lanai overlooking a quiet cul-de-sac.',
    features: ['Golf Cart Garage', 'Birdcage Lanai', 'Granite Counters'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 5,
    priceChange: null,
  },
  {
    id: '2',
    address: '857 Magnolia Grove Drive',
    community: 'Fenney',
    price: 358500,
    beds: 3,
    baths: 2,
    sqft: 1784,
    yearBuilt: 2021,
    style: 'Ranch',
    description: 'Spacious ranch-style home with whole-house generator, quartz counters, and extended lanai with golf course views.',
    features: ['Whole-House Generator', 'Golf Course View', 'Extended Lanai'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 11,
    priceChange: null,
  },
  {
    id: '3',
    address: '412 Topaz Terrace',
    community: 'Tamarind Grove',
    price: 299900,
    beds: 2,
    baths: 2,
    sqft: 1298,
    yearBuilt: 2017,
    style: 'Patio Villa',
    description: 'Low-maintenance patio villa with updated kitchen, tile throughout, and screened lanai perfect for Florida living.',
    features: ['Low Maintenance', 'Tile Throughout', 'Screened Lanai'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 3,
    priceChange: null,
  },
  {
    id: '4',
    address: '2031 Cypress Run Boulevard',
    community: 'Summerfield',
    price: 412000,
    beds: 3,
    baths: 2,
    sqft: 2104,
    yearBuilt: 2020,
    style: 'Golf Front',
    description: 'Premium golf-front home with panoramic fairway views, chef kitchen with gas range, and oversized two-car garage.',
    features: ['Golf Front', 'Gas Range', 'Oversized Garage'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 18,
    priceChange: '↓ Price Reduced',
  },
  {
    id: '5',
    address: '738 Primrose Path',
    community: 'Hemingway',
    price: 345000,
    beds: 2,
    baths: 2,
    sqft: 1612,
    yearBuilt: 2018,
    style: 'Courtyard Villa',
    description: 'Elegant courtyard villa with private enclosed patio, crown molding throughout, and updated master bath with walk-in shower.',
    features: ['Private Courtyard', 'Crown Molding', 'Walk-In Shower'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 7,
    priceChange: null,
  },
  {
    id: '6',
    address: '1559 Hazel Nut Run',
    community: 'Piedmont',
    price: 375000,
    beds: 3,
    baths: 2,
    sqft: 1890,
    yearBuilt: 2022,
    style: 'Designer',
    description: 'Nearly new designer home with smart home features, luxury vinyl plank floors, and large birdcage pool enclosure.',
    features: ['Smart Home', 'Birdcage Pool', 'Luxury Vinyl Plank'],
    zillowUrl: 'https://www.zillow.com/the-villages-fl/',
    redfin: 'https://www.redfin.com/city/18749/FL/The-Villages',
    daysOnMarket: 2,
    priceChange: null,
  },
]

export async function POST(req: NextRequest) {
  const { filters } = await req.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Return fallback data instead of an error so the UI still shows listings
    return new Response(JSON.stringify({
      summary: 'The Villages real estate market remains one of the most active 55+ communities in the United States. Demand from retirees nationwide keeps inventory tight, with well-priced homes typically going under contract within 30 days.',
      medianPrice: '$342,000',
      avgDaysOnMarket: '28 days',
      priceChange: '+4.2% YoY',
      listings: FALLBACK_LISTINGS,
    }), { headers: { 'Content-Type': 'application/json' } })
  }

  const priceDesc = filters.minPrice || filters.maxPrice
    ? `between $${parseInt(filters.minPrice || '0').toLocaleString()} and $${parseInt(filters.maxPrice || '999999999').toLocaleString()}`
    : 'any price range'

  const communityDesc = filters.community && filters.community !== 'Any Community'
    ? `in the ${filters.community} community`
    : 'across The Villages communities'

  const userPrompt = `Search for ${filters.type === 'rent' ? 'rental homes' : 'homes for sale'} in The Villages, FL ${communityDesc}.
Filters: Price ${priceDesc}, ${filters.beds !== 'Any' ? `${filters.beds} bedrooms` : 'any bedrooms'}, ${filters.baths !== 'Any' ? `${filters.baths} bathrooms` : 'any bathrooms'}, ${filters.sqft !== 'Any' ? `${filters.sqft} sq ft` : 'any size'}.

Generate exactly 6 realistic home listings matching these criteria. Return ONLY the raw JSON object with no markdown, no code fences, no extra text.`

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
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const text: string = data.content?.[0]?.text || ''

    // Robust JSON extraction: find the outermost { ... } block
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    let parsed: object

    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0])
      } catch {
        parsed = {
          summary: 'The Villages real estate market remains strong with consistent demand from retirees nationwide.',
          medianPrice: '$342,000',
          avgDaysOnMarket: '28 days',
          priceChange: '+4.2% YoY',
          listings: FALLBACK_LISTINGS,
        }
      }
    } else {
      parsed = {
        summary: 'The Villages real estate market remains strong with consistent demand from retirees nationwide.',
        medianPrice: '$342,000',
        avgDaysOnMarket: '28 days',
        priceChange: '+4.2% YoY',
        listings: FALLBACK_LISTINGS,
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({
      summary: 'The Villages real estate market remains strong with consistent demand from retirees nationwide.',
      medianPrice: '$342,000',
      avgDaysOnMarket: '28 days',
      priceChange: '+4.2% YoY',
      listings: FALLBACK_LISTINGS,
    }), { headers: { 'Content-Type': 'application/json' } })
  }
}
