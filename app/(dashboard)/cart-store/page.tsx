'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const CATEGORIES = [
  { id:'all',         label:'All Products',       emoji:'🛍️' },
  { id:'apparel',     label:'Apparel',             emoji:'👕' },
  { id:'accessories', label:'Cart Accessories',    emoji:'🏌️' },
  { id:'decals',      label:'Decals & Wraps',      emoji:'🎨' },
  { id:'tech',        label:'Tech & Gadgets',      emoji:'📱' },
  { id:'home',        label:'Home & Lifestyle',    emoji:'🏠' },
  { id:'gifts',       label:'Gifts',               emoji:'🎁' },
]

const PRODUCTS = [
  { id:1, name:'VillagerConnect Golf Polo', category:'apparel', emoji:'👕', price:32.99, originalPrice:39.99, points:330, description:'Moisture-wicking polo shirt with VillagerConnect logo. Perfect for the cart path or the course.', badge:'Best Seller', variants:['S','M','L','XL','2XL'], colors:['White','Green','Gold'] },
  { id:2, name:'The Villages Cart Cushion', category:'accessories', emoji:'💺', price:44.99, originalPrice:null, points:450, description:'Premium memory foam seat cushion designed for golf cart seats. Fits most cart models.', badge:null, variants:null, colors:['Beige','Black','Navy'] },
  { id:3, name:'VillagerConnect Windshield Bag', category:'accessories', emoji:'🛍️', price:28.99, originalPrice:34.99, points:290, description:'Attach to your windshield frame. Holds phone, keys, sunglasses, and more.', badge:'New', variants:null, colors:['Black','Green'] },
  { id:4, name:'Golf Cart Rear View Mirror', category:'accessories', emoji:'🪞', price:18.99, originalPrice:null, points:190, description:'Wide-angle panoramic rear view mirror. Universal fit for Club Car, EZGO, Yamaha.', badge:null, variants:null, colors:null },
  { id:5, name:'"Cart Life" Vinyl Decal', category:'decals', emoji:'🎨', price:8.99, originalPrice:null, points:90, description:'Weatherproof vinyl decal. Available in white, gold, or black. 8" x 2.5".', badge:null, variants:null, colors:['White','Gold','Black'] },
  { id:6, name:'The Villages Flag Set (2-pack)', category:'accessories', emoji:'🚩', price:22.99, originalPrice:27.99, points:230, description:'Two Florida-style flags on flexible poles. Mounts to rear grab bar or roof support.', badge:'Popular', variants:null, colors:null },
  { id:7, name:'VillagerConnect Trucker Hat', category:'apparel', emoji:'🧢', price:24.99, originalPrice:null, points:250, description:'Structured snapback with embroidered VillagerConnect logo and "The Villages" script.', badge:null, variants:['One Size'], colors:['White/Green','Black/Gold','Green/White'] },
  { id:8, name:'USB Dual-Port Cart Charger', category:'tech', emoji:'🔌', price:19.99, originalPrice:24.99, points:200, description:'12V cart charger with 2x USB-A + 1x USB-C. Fits standard cart power outlets.', badge:'New', variants:null, colors:null },
  { id:9, name:'VillagerConnect Tumbler 30oz', category:'home', emoji:'☕', price:29.99, originalPrice:null, points:300, description:'Double-wall stainless steel tumbler. Keeps cold 24hr, hot 12hr. Dishwasher safe.', badge:null, variants:null, colors:['White','Green','Black'] },
  { id:10, name:'Cart Path Map — The Villages', category:'home', emoji:'🗺️', price:16.99, originalPrice:19.99, points:170, description:'Laminated full-color cart path map of The Villages. 18"x24". Updated for current paths.', badge:'Popular', variants:null, colors:null },
  { id:11, name:'Golf Cart Cover — Universal Fit', category:'accessories', emoji:'🏠', price:54.99, originalPrice:64.99, points:550, description:'Heavy-duty 300D polyester cover. Fits most 4-seat carts. Includes storage bag.', badge:'Sale', variants:['Standard 4-seat','Extended 6-seat'], colors:null },
  { id:12, name:'Magnetic Phone Mount', category:'tech', emoji:'📱', price:15.99, originalPrice:null, points:160, description:'Strong magnetic dashboard phone mount. MagSafe compatible. Easy one-hand operation.', badge:null, variants:null, colors:['Black','Silver'] },
  { id:13, name:'"The Villages Resident" T-Shirt', category:'apparel', emoji:'👕', price:21.99, originalPrice:null, points:220, description:'Soft cotton tee with The Villages community pride graphic. Unisex sizing.', badge:null, variants:['S','M','L','XL','2XL'], colors:['White','Green','Heather Gray'] },
  { id:14, name:'VillagerConnect Gift Card', category:'gifts', emoji:'🎁', price:25.00, originalPrice:null, points:0, description:'Digital gift card delivered by email. Valid for all VillagerConnect merchandise.', badge:'Great Gift', variants:['$25','$50','$100'], colors:null },
  { id:15, name:'LED Strip Undercart Lighting Kit', category:'tech', emoji:'💡', price:34.99, originalPrice:39.99, points:350, description:'Waterproof RGB LED kit for under-cart accent lighting. Includes controller, 12V adapter.', badge:'Hot', variants:null, colors:['White','Multi-color RGB'] },
]

const BADGE_STYLES: Record<string,{bg:string;color:string}> = {
  'Best Seller': { bg:'rgba(255,215,0,0.15)', color:'#8B6914' },
  'New':         { bg:'rgba(45,122,45,0.1)',  color:'#2D7A2D' },
  'Popular':     { bg:'rgba(26,92,154,0.1)',  color:'#1a5c9e' },
  'Sale':        { bg:'rgba(204,0,0,0.1)',    color:'#CC0000' },
  'Hot':         { bg:'rgba(204,0,0,0.1)',    color:'#CC0000' },
  'Great Gift':  { bg:'rgba(139,0,139,0.1)',  color:'#8B008B' },
}

export default function CartStorePage() {
  const [category, setCategory] = useState('all')
  const [cart, setCart]         = useState<Record<number,number>>({})
  const [user, setUser]         = useState<any>(null)
  const [points, setPoints]     = useState(0)
  const [toast, setToast]       = useState('')
  const supabase = createClient()

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function addToCart(product: typeof PRODUCTS[0]) {
    setCart(c => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }))
    setPoints(p => p + product.points)
    showToast(`Added ${product.name} to cart! +${product.points} Villager Points`)
  }

  const filtered = PRODUCTS.filter(p => category === 'all' || p.category === category)
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(p => p.id === Number(id))
    return sum + (p ? p.price * qty : 0)
  }, 0)

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
      {toast && (
        <div style={{ position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:100, background:'#2D7A2D', color:'white', padding:'0.875rem 1.5rem', borderRadius:'1rem', fontWeight:700, fontSize:'0.875rem', boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
          ✅ {toast}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', fontWeight:900, color:'#1A1A1A', marginBottom:'0.3rem' }}>🛍️ Cart Accessories Store</h1>
          <p style={{ color:'#666', fontSize:'0.9rem' }}>Official VillagerConnect merchandise and golf cart accessories</p>
        </div>
        {cartCount > 0 && (
          <div style={{ background:'#2D7A2D', color:'white', borderRadius:'1rem', padding:'0.875rem 1.5rem', display:'flex', gap:'1rem', alignItems:'center' }}>
            <span style={{ fontWeight:700 }}>🛒 {cartCount} item{cartCount!==1?'s':''}</span>
            <span style={{ fontWeight:800, fontSize:'1.1rem' }}>${cartTotal.toFixed(2)}</span>
            <span style={{ color:'#FFD700', fontSize:'0.8rem', fontWeight:700 }}>+{points} pts</span>
          </div>
        )}
      </div>

      {/* Villager Points Banner */}
      <div style={{ background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,215,0,0.05))', borderRadius:'1rem', padding:'1.1rem 1.5rem', marginBottom:'1.75rem', border:'1px solid rgba(255,215,0,0.35)', display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>
        <span style={{ fontSize:'2rem' }}>⭐</span>
        <div style={{ flex:1 }}>
          <p style={{ fontWeight:800, color:'#1A1A1A', marginBottom:'0.15rem' }}>Villager Points Program</p>
          <p style={{ color:'#666', fontSize:'0.83rem' }}>Earn points with every purchase. 100 points = $1 off future orders. Share on social media to earn bonus points!</p>
        </div>
        {user && (
          <div style={{ textAlign:'center', background:'rgba(255,215,0,0.2)', borderRadius:'0.875rem', padding:'0.625rem 1rem', border:'1px solid rgba(255,215,0,0.4)' }}>
            <div style={{ fontWeight:900, color:'#8B6914', fontSize:'1.3rem' }}>{points.toLocaleString()}</div>
            <div style={{ fontSize:'0.65rem', color:'#8B6914', textTransform:'uppercase' }}>Your Points</div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.75rem' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)}
            style={{ background:category===c.id?'rgba(45,122,45,0.1)':'#FFFFFF', border:`1px solid ${category===c.id?'rgba(45,122,45,0.4)':'#E0E0E0'}`, color:category===c.id?'#2D7A2D':'#555', padding:'0.45rem 1rem', borderRadius:'9999px', fontSize:'0.85rem', cursor:'pointer', fontWeight:category===c.id?700:400 }}>
            {c.emoji} {c.label} {c.id!=='all' && `(${PRODUCTS.filter(p=>p.category===c.id).length})`}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(270px,1fr))', gap:'1.1rem' }}>
        {filtered.map(p => {
          const bstyle = p.badge ? BADGE_STYLES[p.badge] : null
          const qty = cart[p.id] || 0
          return (
            <div key={p.id} style={{ background:'#FFFFFF', borderRadius:'1.1rem', overflow:'hidden', border:'1px solid #E0E0E0', display:'flex', flexDirection:'column' }}>
              <div style={{ background:`linear-gradient(135deg,rgba(45,122,45,0.07),rgba(255,215,0,0.07))`, height:'140px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3.5rem', position:'relative' }}>
                {p.emoji}
                {p.badge && bstyle && (
                  <span style={{ position:'absolute', top:'0.625rem', right:'0.625rem', background:bstyle.bg, color:bstyle.color, border:`1px solid ${bstyle.color}33`, fontSize:'0.65rem', fontWeight:700, padding:'0.2rem 0.55rem', borderRadius:'9999px' }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div style={{ padding:'1.1rem', flex:1, display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                <h3 style={{ fontWeight:800, fontSize:'0.95rem', color:'#1A1A1A', lineHeight:1.3 }}>{p.name}</h3>
                <p style={{ color:'#666', fontSize:'0.78rem', lineHeight:1.5, flex:1 }}>{p.description}</p>
                {p.variants && <p style={{ color:'#888', fontSize:'0.72rem' }}>Options: {p.variants.join(', ')}</p>}
                {p.colors && <p style={{ color:'#888', fontSize:'0.72rem' }}>Colors: {p.colors.join(', ')}</p>}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.5rem' }}>
                  <div>
                    <span style={{ fontWeight:900, fontSize:'1.1rem', color:'#1A1A1A' }}>${p.price.toFixed(2)}</span>
                    {p.originalPrice && <span style={{ color:'#AAA', fontSize:'0.78rem', textDecoration:'line-through', marginLeft:'0.4rem' }}>${p.originalPrice.toFixed(2)}</span>}
                  </div>
                  {p.points > 0 && <span style={{ color:'#8B6914', fontSize:'0.72rem', fontWeight:700 }}>+{p.points} pts</span>}
                </div>
                <button onClick={() => addToCart(p)}
                  style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.75rem', padding:'0.65rem', fontWeight:700, cursor:'pointer', fontSize:'0.85rem', marginTop:'0.25rem' }}>
                  {qty > 0 ? `Add More (${qty} in cart)` : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Note */}
      <div style={{ background:'#F9F9F9', borderRadius:'1rem', padding:'1.25rem 1.5rem', marginTop:'2.5rem', border:'1px solid #E8E8E8' }}>
        <p style={{ fontWeight:700, color:'#1A1A1A', marginBottom:'0.4rem' }}>🛍️ About This Store</p>
        <p style={{ color:'#666', fontSize:'0.82rem', lineHeight:1.6, margin:0 }}>This store is a demo powered by VillagerConnect. Checkout and payment will be available soon. Products, prices, and Villager Points are illustrative. Join our mailing list to be notified when the store launches!</p>
      </div>
    </div>
  )
}
