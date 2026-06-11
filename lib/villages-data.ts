// Shared Villages platform data for the VillagerConnect AI tool handlers.
// Mirrors the feature pages (/landings, /golf-courses, /golf-carts, /events, /elections, /entertainment).
/* eslint-disable */

export const LANDINGS: any[] = [
  {
    name: 'Lake Sumter Landing',
    icon: '🌊',
    description: 'The premier waterfront town square with lakeside dining, shops, and nightly entertainment on the clock tower square.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission',
    businesses: [
      { name: "Cody's Original Roadhouse", type: 'restaurant', hours: 'Sun–Thu 11am–10pm, Fri–Sat 11am–11pm', phone: '(352) 259-5075', notes: 'American bar & grill, steaks, ribs, seafood' },
      { name: 'Markers 51', type: 'restaurant', hours: 'Daily 11am–10pm', phone: '(352) 430-0088', notes: 'Upscale lakeside dining, seafood, and cocktails' },
      { name: "Maguire's Hill 16 Irish Pub", type: 'restaurant', hours: 'Daily 11am–11pm', phone: '(352) 259-8006', notes: 'Irish pub fare, live music, draft beer and whiskey' },
      { name: 'Chula Vista Mexican', type: 'restaurant', hours: 'Daily 11am–9pm', notes: 'Authentic Mexican cuisine and margaritas' },
      { name: 'Bistro 101', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Breakfast, lunch and dinner with waterfront views' },
      { name: 'Panera Bread', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Bakery café, sandwiches, soups, salads' },
      { name: 'Starbucks', type: 'restaurant', hours: 'Daily 6am–8pm', notes: 'Coffee, espresso drinks, pastries, sandwiches' },
      { name: 'Publix Super Market', type: 'retail', hours: 'Daily 7am–10pm', phone: '(352) 259-8060', notes: 'Full-service grocery store' },
      { name: 'CVS Pharmacy', type: 'retail', hours: 'Mon–Fri 8am–9pm, Sat–Sun 9am–7pm', notes: 'Pharmacy, health, beauty, household needs' },
      { name: 'Vera Bradley', type: 'retail', notes: 'Bags, luggage, accessories, and gifts' },
      { name: 'Chico\'s', type: 'retail', notes: "Women's clothing and accessories" },
      { name: 'Coldwater Creek', type: 'retail', notes: "Women's fashion and resort wear" },
    ]
  },
  {
    name: 'Brownwood Paddock Square',
    icon: '🏇',
    description: 'A paddock-themed town square with country charm, casual dining, and nightly entertainment under the stars.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission · Country and Western themed square',
    businesses: [
      { name: 'Glory Days Grill', type: 'restaurant', hours: 'Daily 11am–11pm', phone: '(352) 753-7378', notes: 'Sports bar, American comfort food, burgers, wings' },
      { name: "TooJay's Original Gourmet Deli", type: 'restaurant', hours: 'Daily 8am–9pm', phone: '(352) 259-8060', notes: 'New York-style deli, breakfast all day, sandwiches' },
      { name: 'First Watch', type: 'restaurant', hours: 'Daily 7am–2:30pm', notes: 'Daytime café, breakfast and brunch specialists' },
      { name: 'Perkins Restaurant', type: 'restaurant', hours: 'Daily 6am–10pm', notes: 'Family restaurant, breakfast, lunch, dinner, bakery' },
      { name: 'Broken Egg Café', type: 'restaurant', hours: 'Daily 7am–2pm', notes: 'Fresh breakfast and brunch, egg dishes, benedicts' },
      { name: 'Nothing Bundt Cakes', type: 'restaurant', hours: 'Mon–Sat 10am–6pm, Sun 11am–5pm', notes: 'Specialty bundt cakes and bundtlets, gift shop' },
      { name: 'Bealls Florida', type: 'retail', hours: 'Mon–Sat 10am–9pm, Sun 11am–7pm', notes: 'Florida-based department store, clothing, home goods' },
      { name: 'Hallmark Gold Crown', type: 'retail', notes: 'Greeting cards, gifts, ornaments, seasonal items' },
      { name: 'Talbot\'s', type: 'retail', notes: "Women's classic clothing and accessories" },
      { name: 'Kirkland\'s Home', type: 'retail', notes: 'Home décor, furniture, art, gifts' },
    ]
  },
  {
    name: 'Spanish Springs Town Square',
    icon: '🏰',
    description: 'The original Villages town square with Spanish architecture, a mix of dining, retail, and free nightly entertainment.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission · Historic original square',
    businesses: [
      { name: "Beef 'O' Brady's", type: 'restaurant', hours: 'Daily 11am–midnight', notes: 'Family sports pub, wings, burgers, sandwiches' },
      { name: 'El Conquistador Mexican', type: 'restaurant', hours: 'Daily 11am–10pm', notes: 'Traditional Mexican cuisine, margaritas, fajitas' },
      { name: "Frogger's Grill and Bar", type: 'restaurant', hours: 'Daily 11am–11pm', notes: 'Casual grill, seafood, burgers, outdoor patio' },
      { name: 'Bonefish Grill', type: 'restaurant', hours: 'Mon–Thu 4pm–10pm, Fri 4pm–11pm, Sat 11am–11pm, Sun 11am–9pm', phone: '(352) 775-5552', notes: 'Upscale casual seafood, wood-grilled fish, cocktails' },
      { name: 'Panera Bread', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Bakery café, soups, salads, sandwiches' },
      { name: 'CVS Pharmacy', type: 'retail', hours: 'Daily 8am–10pm', notes: 'Pharmacy, health and beauty, convenience' },
      { name: 'GNC Nutrition', type: 'retail', notes: 'Vitamins, supplements, health and fitness products' },
      { name: 'Coldwater Creek', type: 'retail', notes: 'Resort and casual wear for active lifestyles' },
      { name: 'The Villages Hat Company', type: 'retail', notes: 'Custom hats, Villages apparel, accessories' },
    ]
  },
  {
    name: 'Colony Plaza',
    icon: '🏬',
    description: 'A major retail center featuring national chains and restaurants serving the southern Villages communities.',
    entertainment: 'Convenient shopping plaza — no entertainment square',
    businesses: [
      { name: 'Olive Garden Italian Restaurant', type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–9pm', phone: '(352) 259-7676', notes: 'Italian-American cuisine, pasta, seafood, unlimited breadsticks' },
      { name: 'Red Lobster', type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–9pm', notes: 'Seafood chain restaurant, lobster, shrimp, fish' },
      { name: "Chili's Grill & Bar", type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–10pm', notes: 'American casual dining, burgers, Tex-Mex, ribs' },
      { name: "McDonald's", type: 'restaurant', hours: 'Daily 5am–midnight', notes: 'Fast food, burgers, breakfast, McCafé' },
      { name: 'Subway', type: 'restaurant', hours: 'Daily 8am–9pm', notes: 'Fresh-made subs, salads, wraps' },
      { name: 'Target', type: 'retail', hours: 'Mon–Sat 8am–10pm, Sun 8am–9pm', notes: 'General merchandise, clothing, groceries, pharmacy' },
      { name: "Marshall's", type: 'retail', hours: 'Mon–Sat 9:30am–9:30pm, Sun 10am–9pm', notes: 'Off-price clothing, shoes, home goods, gifts' },
      { name: 'Tuesday Morning', type: 'retail', notes: 'Off-price home décor, gifts, seasonal items' },
    ]
  },
  {
    name: 'Pinellas Plaza',
    icon: '🛒',
    description: 'A convenient retail center serving northern Villages residents with everyday needs.',
    entertainment: 'Shopping plaza — no entertainment square',
    businesses: [
      { name: 'Walmart Supercenter', type: 'retail', hours: 'Open 24 hours', phone: '(352) 430-2960', notes: 'Full supercenter, groceries, pharmacy, electronics, clothing' },
      { name: 'Jo-Ann Fabric and Craft', type: 'retail', hours: 'Mon–Sat 9am–9pm, Sun 10am–6pm', notes: 'Fabric, sewing, crafts, yarn, seasonal décor' },
      { name: 'Dollar Tree', type: 'retail', hours: 'Mon–Sat 8am–9pm, Sun 9am–8pm', notes: 'Dollar store, housewares, party supplies, snacks' },
      { name: 'Five Below', type: 'retail', notes: 'Discount retail, gifts, accessories, seasonal' },
      { name: 'Wendy\'s', type: 'restaurant', hours: 'Daily 6:30am–midnight', notes: 'Fast food, burgers, Frosty, breakfast' },
      { name: 'Firehouse Subs', type: 'restaurant', hours: 'Daily 10:30am–9pm', notes: 'Gourmet sub sandwiches, soups, salads' },
    ]
  },
  {
    name: 'Sumter Landing Market',
    icon: '🌿',
    description: 'A market-style landing with local shops and services serving the Lake Sumter area.',
    entertainment: 'Market-style landing — local character and boutique shops',
    businesses: [
      { name: 'Winn-Dixie', type: 'retail', hours: 'Daily 7am–11pm', notes: 'Full-service grocery store, pharmacy, deli' },
      { name: 'Bealls Outlet', type: 'retail', notes: 'Off-price clothing, accessories, shoes, home goods' },
      { name: 'Planet Fitness', type: 'retail', hours: 'Open 24 hours', notes: 'Fitness center, cardio and strength equipment' },
      { name: 'China Buffet Palace', type: 'restaurant', hours: 'Daily 11am–9:30pm', notes: 'Chinese and Asian buffet, sushi, hibachi' },
      { name: "Domino's Pizza", type: 'restaurant', hours: 'Daily 10am–midnight', notes: 'Pizza delivery and carry-out' },
      { name: 'Tijuana Flats', type: 'restaurant', hours: 'Daily 11am–9pm', notes: 'Tex-Mex, burritos, tacos, hot sauce bar' },
    ]
  },
]

export const GOLF_COURSES: any[] = [
  // Championship
  { name: 'Hacienda Hills Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'One of the most prestigious championship courses in The Villages. Rolling terrain, water hazards, and immaculate fairways.' },
  { name: 'Evans Prairie Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Championship course with challenging layout featuring multiple water features and well-bunkered greens.' },
  { name: 'Tierra Del Sol Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Spanish-themed championship course with beautiful landscaping, mature trees, and demanding back nine.' },
  { name: 'Bonifay Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Traditional championship layout with tree-lined fairways and elevated greens. A Villages classic.' },
  { name: 'Belle Glade Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'New championship course featuring modern design with native Florida landscaping and challenging par 5s.' },
  { name: 'Fenney Golf Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Located in the newest Fenney neighborhoods. Modern championship design with stunning views and challenging greens.' },
  { name: 'Loblolly Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Named for the native loblolly pine trees that frame many of its fairways. A challenging and scenic layout.' },
  { name: 'Laurel Valley Golf Club', type: 'Championship', holes: 18, par: 72, location: 'Lady Lake, FL', greenFees: '$45–$75', memberOnly: false, phone: '(352) 753-7400', notes: 'Semi-private championship course open to the public. Located adjacent to The Villages with excellent greens.' },
  // Executive
  { name: 'Allamanda Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Nine-hole executive course. Perfect for a quick 9 or beginners learning the game. Walking distance from neighborhoods.' },
  { name: 'Aloha Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Hawaiian-themed executive course with beautiful tropical landscaping and friendly layout for all skill levels.' },
  { name: 'Amelia Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Classic executive layout. Great for a morning round before the Florida heat sets in.' },
  { name: 'Annex Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Compact executive course in a neighborhood setting. Perfect for residents within walking or cart distance.' },
  { name: 'Arroyo Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Challenging executive layout with several water features. A step up for executive course players.' },
  { name: 'Bailey Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Friendly executive course with open fairways and manageable greens. Great for all handicap levels.' },
  { name: 'Belvedere Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Scenic executive course with rolling terrain and views of surrounding neighborhoods.' },
  { name: 'Boone Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Classic Villages executive course design. Well-maintained throughout the year.' },
  { name: 'Breckenridge Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Tree-lined executive course that rewards accurate iron play. A local favorite.' },
  { name: 'Brixton Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Fun executive layout with a mix of short and medium holes. Great for working on the short game.' },
  { name: 'Calumet Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Open executive layout good for beginners. Plenty of birdie opportunities for experienced players.' },
  { name: 'Cane Garden Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Challenging executive course with native landscape. One of the more scenic executive layouts in The Villages.' },
  { name: 'Chula Vista Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Named for the Spanish Springs area. Compact but challenging layout with tight fairways.' },
  { name: 'Clifton Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Relaxed executive course. Ideal for an evening round or a beginner wanting to develop their game.' },
  { name: 'Coconut Cove Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Tropical-themed executive course with beautiful Florida landscaping and water features.' },
  { name: 'Crestview Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Elevated terrain executive course. Offers some of the best views of surrounding neighborhoods.' },
]

export const CART_RENTALS: any[] = [
  {
    name: 'The Villages Golf Cart Rentals (Official)',
    phone: '(352) 753-4300',
    website: 'https://www.thevillages.com/golf-carts/',
    daily: '$55–$75',
    weekly: '$245–$350',
    monthly: '$650–$950',
    types: ['2-passenger standard', '4-passenger', 'Lifted street legal', 'LSV (Low Speed Vehicle)'],
    delivery: true,
    deposit: '$200 credit card hold',
    notes: 'The official Villages cart rental program. All carts are properly insured and meet Villages standards. Available to guests of residents.',
    address: 'Multiple pickup locations throughout The Villages',
  },
  {
    name: 'Gatehouse Golf Carts',
    phone: '(352) 430-0094',
    daily: '$65',
    weekly: '$280',
    monthly: '$700',
    types: ['2-passenger', '4-passenger', 'Street legal LSV', 'Custom lifted carts'],
    delivery: true,
    deposit: '$150 security deposit',
    notes: 'Local family-owned rental company with free delivery within The Villages. Excellent customer service and well-maintained fleet.',
    address: 'The Villages, FL',
  },
  {
    name: 'Villages Golf Cart & Service',
    phone: '(352) 259-4060',
    daily: '$60',
    weekly: '$260',
    types: ['Standard 2-passenger', '4-passenger', 'Lifted 4-passenger', 'Custom builds'],
    delivery: true,
    deposit: '$100 security deposit',
    notes: 'Rents and sells golf carts. Also offers service, repair, and custom modifications for cart owners.',
    address: 'Lady Lake, FL',
  },
  {
    name: 'Sun Country Golf Cars',
    phone: '(352) 748-2222',
    daily: '$55',
    weekly: '$240',
    monthly: '$625',
    types: ['2-passenger', '4-passenger', '6-passenger', 'Electric and gas'],
    delivery: true,
    deposit: '$200 credit card authorization',
    notes: 'Serving The Villages and surrounding areas. Large fleet with electric and gas options. Weekly and monthly discounts available.',
    address: 'Leesburg, FL',
  },
  {
    name: 'Villages Elite Golf Carts',
    phone: '(352) 391-8400',
    hourly: '$25/hr',
    daily: '$85',
    weekly: '$325',
    types: ['Luxury custom carts', 'LED-lit carts', 'Street legal LSV', 'Party carts (6-passenger)'],
    delivery: true,
    deposit: '$250 security deposit',
    notes: 'Premium cart rentals with luxury features including LED lighting, premium sound systems, and custom upholstery. Perfect for special occasions.',
    address: 'The Villages, FL',
  },
]

export const COMMUNITY_EVENTS: any[] = [
  { id: '1', title: 'Spanish Springs Farmers Market', description: 'Fresh local produce, artisan crafts, baked goods, and live music every Saturday morning at Spanish Springs Town Square.', event_date: '2026-06-14', event_time: '8:00 AM – 1:00 PM', location: 'Spanish Springs Town Square', category: 'Social', organizer: 'Villages Farmers Market Association', cost: 'Free admission', rsvp_url: '' },
  { id: '2', title: 'Villages Pickleball Tournament', description: 'Semi-annual pickleball tournament open to all skill levels. Divisions for beginners through advanced. Prizes for top finishers.', event_date: '2026-06-20', event_time: '8:00 AM – 5:00 PM', location: 'Mulberry Recreation Center', category: 'Sports', organizer: 'Villages Pickleball Club', cost: '$25 entry fee', max_attendees: 128 },
  { id: '3', title: 'Community Blood Drive', description: 'Biannual community blood drive hosted by Florida Blood Services. Appointments preferred but walk-ins welcome. Light refreshments provided.', event_date: '2026-06-18', event_time: '9:00 AM – 3:00 PM', location: 'Savannah Center', category: 'Civic', organizer: 'Florida Blood Services', cost: 'Free', max_attendees: 200 },
  { id: '4', title: 'Villages Symphony Orchestra Concert', description: 'The Villages Symphony Orchestra presents their summer showcase featuring Beethoven\'s 9th Symphony and crowd-favorite encores.', event_date: '2026-06-21', event_time: '7:30 PM', location: 'Sharon L. Morse Performing Arts Center', category: 'Arts & Culture', organizer: 'Villages Symphony Orchestra', cost: '$15–$35', max_attendees: 1200 },
  { id: '5', title: 'Senior Health & Wellness Fair', description: 'Annual health fair with free screenings for blood pressure, cholesterol, vision, and hearing. Medical providers, fitness demonstrations, and nutrition information.', event_date: '2026-06-25', event_time: '9:00 AM – 2:00 PM', location: 'Lake Sumter Landing', category: 'Health & Wellness', organizer: 'The Villages Health', cost: 'Free', max_attendees: 500 },
  { id: '6', title: 'Golf Cart Parade & Show', description: 'Annual decorated golf cart parade through Lake Sumter Landing followed by a judged cart show. Categories for best decorated, most creative, and best classic cart.', event_date: '2026-07-04', event_time: '10:00 AM – 2:00 PM', location: 'Lake Sumter Landing', category: 'Holiday', organizer: 'Villages Recreation Department', cost: 'Free', max_attendees: 2000 },
  { id: '7', title: "Fourth of July Celebration & Fireworks", description: 'The Villages\' biggest annual celebration with live entertainment, food vendors, and a spectacular fireworks display over Lake Sumter.', event_date: '2026-07-04', event_time: '5:00 PM – 10:00 PM', location: 'Lake Sumter Landing', category: 'Holiday', organizer: 'The Villages Developer', cost: 'Free', max_attendees: 10000 },
  { id: '8', title: 'Newcomers Welcome Reception', description: 'Monthly welcome reception for new Villages residents. Meet neighbors, learn about clubs and activities, and get essential tips for new residents.', event_date: '2026-06-16', event_time: '2:00 PM – 5:00 PM', location: 'Savannah Center', category: 'Social', organizer: 'Villages Newcomers Club', cost: 'Free', max_attendees: 300 },
  { id: '9', title: 'Environmental & Nature Walk', description: 'Guided nature walk through the Reedy Creek Nature Trail. Learn about Florida native plants, birds, and wildlife. Led by master naturalists.', event_date: '2026-06-22', event_time: '7:30 AM – 10:00 AM', location: 'Reedy Creek Trail', category: 'Health & Wellness', organizer: 'Villages Nature Club', cost: 'Free', max_attendees: 30 },
  { id: '10', title: 'Lifelong Learning Institute — Tech Help for Seniors', description: 'Free technology help session covering smartphones, tablets, social media, and internet safety. Volunteer helpers from local college available.', event_date: '2026-06-17', event_time: '1:00 PM – 3:30 PM', location: 'Laurel Manor Recreation Center', category: 'Education', organizer: 'Villages Lifelong Learning Institute', cost: 'Free', max_attendees: 40 },
  { id: '11', title: 'Water Aerobics Championship', description: 'Annual water aerobics competition featuring teams from across The Villages\' recreation centers. Spectators welcome and encouraged!', event_date: '2026-06-27', event_time: '9:00 AM – 12:00 PM', location: 'Mulberry Recreation Center Pool', category: 'Sports', organizer: 'Villages Aquatics Club', cost: 'Free to watch', max_attendees: 200 },
  { id: '12', title: 'Villages Art Show & Sale', description: 'Quarterly juried art show featuring paintings, sculpture, photography, and mixed media from Villages-area artists. Work available for purchase.', event_date: '2026-06-28', event_time: '10:00 AM – 4:00 PM', location: 'Colony Cottage Recreation Center', category: 'Arts & Culture', organizer: 'Villages Art Association', cost: 'Free admission', max_attendees: 300 },
  { id: '13', title: 'Town Hall — Sumter County Commissioners', description: 'Open town hall meeting with Sumter County commissioners. Residents can ask questions about county services, development, and local issues.', event_date: '2026-06-23', event_time: '6:30 PM – 8:30 PM', location: 'Sumter County Government Center', category: 'Civic', organizer: 'Sumter County Board of Commissioners', cost: 'Free', max_attendees: 200 },
  { id: '14', title: 'Line Dancing Social & Lessons', description: 'Weekly line dancing event with lessons for beginners and open dancing for experienced dancers. All welcome, no partner needed!', event_date: '2026-06-13', event_time: '7:00 PM – 9:00 PM', location: 'Brownwood Paddock Square', category: 'Social', organizer: 'Villages Line Dance Club', cost: 'Free', max_attendees: 200 },
  { id: '15', title: 'Villages Golf Scramble Tournament', description: 'Friendly 18-hole scramble golf tournament open to all residents. Teams of four, prizes for first, second, and third place. Breakfast and lunch included.', event_date: '2026-06-19', event_time: '7:30 AM Shotgun Start', location: 'Evans Prairie Country Club', category: 'Sports', organizer: 'Villages Golf Association', cost: '$45 per player', max_attendees: 144 },
]

export const OFFICIALS: any[] = [
  { name: 'Greg Steube', title: 'U.S. Representative, FL-17', party: 'Republican', phone: '(941) 747-9081', website: 'https://steube.house.gov', scope: 'Federal' },
  { name: 'Marco Rubio', title: 'U.S. Senator, Florida', party: 'Republican', phone: '(407) 254-2573', website: 'https://www.rubio.senate.gov', scope: 'Federal' },
  { name: 'Rick Scott', title: 'U.S. Senator, Florida', party: 'Republican', phone: '(202) 224-5274', website: 'https://www.rickscott.senate.gov', scope: 'Federal' },
  { name: 'Ron DeSantis', title: 'Governor of Florida', party: 'Republican', phone: '(850) 488-7146', website: 'https://www.flgov.com', scope: 'State' },
  { name: 'Wilton Simpson', title: 'Florida Commissioner of Agriculture', party: 'Republican', phone: '(850) 617-7400', website: 'https://www.fdacs.gov', scope: 'State' },
  { name: 'Danny Burgess', title: 'Florida Senate, District 20', party: 'Republican', phone: '(850) 487-5020', website: 'https://www.flsenate.gov', scope: 'State' },
  { name: 'Garland Garrett', title: 'Sumter County Commission Chair', party: 'Republican', phone: '(352) 689-4400', website: 'https://www.sumtercountyfl.gov', scope: 'Local' },
  { name: 'Gloria R. Edwards', title: 'Sumter County Supervisor of Elections', party: 'Nonpartisan', phone: '(352) 689-4615', website: 'https://www.sumterelections.org', scope: 'Local' },
]

export const UPCOMING_ELECTIONS: any[] = [
  { name: 'Florida Primary Election', date: 'August 2026', type: 'Primary', scope: 'State/Local', description: 'Party primaries for state legislative seats, county commission, and local offices.' },
  { name: 'General Election 2026', date: 'November 3, 2026', type: 'General', scope: 'Federal/State/Local', description: 'U.S. Senate, U.S. House, Florida House and Senate seats, county commission, and local referendums.' },
  { name: 'Sumter County School Board Election', date: 'November 3, 2026', type: 'General', scope: 'Local', description: 'School board seats for The Villages Charter School and Sumter County District Schools.' },
]

export const VOTER_INFO: any[] = [
  { title: 'Register to Vote in Sumter County', desc: 'New residents can register at the Sumter County Supervisor of Elections office or online through the Florida Division of Elections website. Registration must be completed 29 days before an election.', icon: '📋' },
  { title: 'Check Your Registration Status', desc: 'Verify your voter registration is current and your address is correct. You can update your registration anytime at vote.org or the Sumter County Supervisor of Elections.', icon: '✅' },
  { title: 'Vote by Mail', desc: 'Florida residents can request a vote-by-mail ballot for any election. Request must be received by 7 days before the election. Ballots must be returned by 7:00 PM on Election Day.', icon: '📬' },
  { title: 'Early Voting Locations', desc: 'Early voting is available at multiple locations in Sumter County, including locations near The Villages. Check the Supervisor of Elections website for dates and locations closer to each election.', icon: '🗳️' },
]

export const ENTERTAINMENT_SHOWS: any[] = [
  { performer: 'The Midnight Cowboys', genre: 'Country', venue: 'Lake Sumter Landing', date: '2026-06-10', time: '7:00 PM', cover_charge: 'Free', description: 'Classic country hits from the 70s and 80s' },
  { performer: 'Florida Gold', genre: 'Oldies', venue: 'Spanish Springs Town Square', date: '2026-06-10', time: '7:30 PM', cover_charge: 'Free', description: 'Your favorite golden oldies from the 50s through 70s' },
  { performer: 'The Swingin\' Seniors', genre: 'Big Band', venue: 'Brownwood Paddock Square', date: '2026-06-10', time: '8:00 PM', cover_charge: 'Free', description: 'Big band and swing music in the Paddock Square tradition' },
  { performer: 'Eagles Tribute', genre: 'Tribute Band', venue: 'Lake Sumter Landing', date: '2026-06-11', time: '7:00 PM', cover_charge: 'Free', description: 'The complete Eagles experience — Hotel California and more' },
  { performer: 'Jazz Ensemble of The Villages', genre: 'Jazz', venue: 'Savannah Center', date: '2026-06-11', time: '7:00 PM', cover_charge: '$5', description: 'The Villages\' premier jazz ensemble performs standards and originals' },
  { performer: 'Southern Roots', genre: 'Country', venue: 'Spanish Springs Town Square', date: '2026-06-12', time: '7:30 PM', cover_charge: 'Free', description: 'Modern country and bluegrass performed by local favorites' },
  { performer: 'Classic Rock All-Stars', genre: 'Rock', venue: 'Brownwood Paddock Square', date: '2026-06-12', time: '8:00 PM', cover_charge: 'Free', description: 'Classic rock anthems from the 60s, 70s, and 80s' },
  { performer: 'The Villages Symphony Orchestra', genre: 'Classical', venue: 'Sharon L. Morse Performing Arts Center', date: '2026-06-13', time: '7:30 PM', cover_charge: '$15', description: 'Full orchestra performing classical masterworks' },
  { performer: 'Elton John Tribute — Crocodile Rock', genre: 'Tribute Band', venue: 'Lake Sumter Landing', date: '2026-06-13', time: '7:00 PM', cover_charge: 'Free', description: 'A dazzling tribute to the Rocket Man himself' },
  { performer: 'Margaritaville Band', genre: 'Pop', venue: 'Spanish Springs Town Square', date: '2026-06-14', time: '7:30 PM', cover_charge: 'Free', description: 'Jimmy Buffett favorites and island vibes for the weekend' },
  { performer: 'Country Roads', genre: 'Country', venue: 'Brownwood Paddock Square', date: '2026-06-14', time: '8:00 PM', cover_charge: 'Free', description: 'John Denver, Kenny Rogers, Dolly Parton and more' },
  { performer: 'Village Voices Choir', genre: 'Classical', venue: 'First United Methodist Church', date: '2026-06-15', time: '3:00 PM', cover_charge: 'Free', description: 'Community choir concert featuring sacred and secular music' },
  { performer: 'The Platters Tribute', genre: 'Oldies', venue: 'Lake Sumter Landing', date: '2026-06-15', time: '7:00 PM', cover_charge: 'Free', description: 'Doo-wop and early rock and roll classics' },
  { performer: 'Fleetwood Mac Revisited', genre: 'Tribute Band', venue: 'Spanish Springs Town Square', date: '2026-06-16', time: '7:30 PM', cover_charge: 'Free', description: 'Go your own way with this incredible Fleetwood Mac tribute' },
  { performer: 'Blues Brothers Experience', genre: 'Rock', venue: 'Brownwood Paddock Square', date: '2026-06-17', time: '8:00 PM', cover_charge: 'Free', description: 'Soul, blues, and R&B in the Blues Brothers tradition' },
  { performer: 'Piano Bar with Larry Stevens', genre: 'Jazz', venue: 'The Waterfront Inn', date: '2026-06-18', time: '6:00 PM', cover_charge: 'Free with dinner', description: 'Intimate piano bar with standards and singalong favorites' },
  { performer: 'Alabama Tribute — Forever Country', genre: 'Country', venue: 'Lake Sumter Landing', date: '2026-06-19', time: '7:00 PM', cover_charge: 'Free', description: 'The best of Alabama and classic country radio hits' },
  { performer: 'Pop Hits of the 80s', genre: 'Pop', venue: 'Spanish Springs Town Square', date: '2026-06-20', time: '7:30 PM', cover_charge: 'Free', description: 'All your favorite 80s pop hits live on the square' },
  { performer: 'Villages Big Band', genre: 'Big Band', venue: 'Savannah Center', date: '2026-06-21', time: '7:00 PM', cover_charge: '$8', description: 'Glenn Miller, Tommy Dorsey, and the golden era of swing' },
  { performer: 'Neil Diamond Tribute', genre: 'Tribute Band', venue: 'Brownwood Paddock Square', date: '2026-06-21', time: '8:00 PM', cover_charge: 'Free', description: 'Sweet Caroline and all the Diamond classics live on the square' },
]

