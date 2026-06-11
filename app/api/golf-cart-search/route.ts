import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const make      = searchParams.get('make')      ?? ''
  const model     = searchParams.get('model')     ?? ''
  const yearMin   = searchParams.get('yearMin')   ?? ''
  const yearMax   = searchParams.get('yearMax')   ?? ''
  const condition = searchParams.get('condition') ?? ''
  const cartType  = searchParams.get('cartType')  ?? ''
  const priceMin  = searchParams.get('priceMin')  ?? ''
  const priceMax  = searchParams.get('priceMax')  ?? ''
  const zip       = searchParams.get('zip')       ?? ''
  const radius    = searchParams.get('radius')    ?? '50'

  const appId = process.env.EBAY_APP_ID
  if (!appId) return NextResponse.json({ listings: [] })

  const keywords = [make, model, cartType, 'golf cart'].filter(Boolean).join(' ')

  const params = new URLSearchParams({
    'OPERATION-NAME': 'findItemsAdvanced',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': appId,
    'RESPONSE-DATA-FORMAT': 'JSON',
    'REST-PAYLOAD': '',
    'keywords': keywords,
    'categoryId': '47254',
    'paginationInput.entriesPerPage': '24',
    'outputSelector(0)': 'PictureURLSuperSize',
    'outputSelector(1)': 'SellerInfo',
  })

  let filterIdx = 0
  if (condition && condition !== 'All') {
    params.set(`itemFilter(${filterIdx}).name`, 'Condition')
    params.set(`itemFilter(${filterIdx}).value`, condition === 'New' ? 'New' : 'Used')
    filterIdx++
  }
  if (priceMin) { params.set(`itemFilter(${filterIdx}).name`, 'MinPrice'); params.set(`itemFilter(${filterIdx}).value`, priceMin); filterIdx++ }
  if (priceMax) { params.set(`itemFilter(${filterIdx}).name`, 'MaxPrice'); params.set(`itemFilter(${filterIdx}).value`, priceMax); filterIdx++ }
  if (zip) { params.set('buyerPostalCode', zip); params.set(`itemFilter(${filterIdx}).name`, 'MaxDistance'); params.set(`itemFilter(${filterIdx}).value`, radius === 'Nationwide' ? '9999' : radius) }

  try {
    const res = await fetch(`https://svcs.ebay.com/services/search/FindingService/v1?${params}`)
    const data = await res.json()
    const items = data?.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item ?? []
    const listings = items.map((item: Record<string, unknown[]>) => ({
      id:        (item.itemId as string[])?.[0],
      title:     (item.title as string[])?.[0],
      price:     `$${parseFloat((item.sellingStatus as any[])?.[0]?.convertedCurrentPrice?.[0]?.__value__ ?? '0').toLocaleString()}`,
      url:       (item.viewItemURL as string[])?.[0],
      image:     (item.galleryURL as string[])?.[0],
      condition: (item.condition as any[])?.[0]?.conditionDisplayName?.[0],
      location:  (item.location as string[])?.[0],
    }))
    return NextResponse.json({ listings })
  } catch {
    return NextResponse.json({ listings: [] })
  }
}
