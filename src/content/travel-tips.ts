// Travel tips content data for Visit Sri Lanka

export interface TravelTip {
  slug: string;
  title: string;
  shortDescription: string;
  longContent: string;
  heroImage: string;
  category: 'planning' | 'money' | 'transport' | 'culture' | 'safety' | 'practical';
  tags: string[];
  lastUpdated: string;
  faqs: { question: string; answer: string }[];
}

export const tipCategories = {
  planning: { name: 'Trip Planning', icon: '📋' },
  money: { name: 'Money & Budget', icon: '💰' },
  transport: { name: 'Getting Around', icon: '🚂' },
  culture: { name: 'Culture & Etiquette', icon: '🙏' },
  safety: { name: 'Safety & Health', icon: '🏥' },
  practical: { name: 'Practical Info', icon: '📱' },
} as const;

export const travelTips: TravelTip[] = [
  {
    slug: 'sri-lanka-visa-eta',
    title: 'Sri Lanka Visa & ETA Guide 2026',
    shortDescription: 'Everything you need to know about getting your Electronic Travel Authorization (ETA) for Sri Lanka.',
    longContent: `
# Sri Lanka Visa & ETA Guide

As of 2024, most visitors to Sri Lanka need an Electronic Travel Authorization (ETA) before arrival. Here's your complete guide to obtaining yours.

## Who Needs an ETA?

Citizens of most countries require an ETA, including:
- United States, UK, EU countries
- Australia, Canada, New Zealand
- Most Asian and African countries

## ETA Application Process

### Online Application (Recommended)

1. Visit the official ETA website: www.eta.gov.lk
2. Complete the online form with passport details
3. Pay the fee online (credit card/debit card)
4. Receive confirmation via email within 24-48 hours

### On Arrival

ETA can be obtained at Colombo airport, but this is slower and not recommended during peak season.

## ETA Fees (2024)

| Nationality | 30-Day ETA | Extension |
|-------------|------------|-----------|
| SAARC countries | Free | $25 USD |
| All other countries | $50 USD | $25 USD |

## Validity

- Processing time: 24-48 hours online
- Initial validity: 30 days
- Extendable to 90 days in country
- Can be extended at Department of Immigration in Colombo

## Tips for Success

- Apply at least 1 week before travel
- Ensure passport is valid for 6+ months
- Have confirmed return/onward travel
- Keep a printout of your ETA approval
    `,
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop',
    category: 'planning',
    tags: ['visa', 'ETA', 'entry requirements', 'passport'],
    lastUpdated: '2026-01-15',
    faqs: [
      { question: 'How long does ETA processing take?', answer: 'Usually 24-48 hours when applied online.' },
      { question: 'Can I extend my ETA in Sri Lanka?', answer: 'Yes, you can extend up to 90 days at the Department of Immigration in Colombo.' },
      { question: 'Do children need an ETA?', answer: 'Yes, all visitors including children need their own ETA.' },
    ],
  },
  {
    slug: 'money-currency-guide',
    title: 'Money, Currency & ATMs in Sri Lanka',
    shortDescription: 'Your guide to Sri Lankan Rupees, ATMs, credit cards, and managing your travel budget.',
    longContent: `
# Money & Currency Guide for Sri Lanka

Understanding money matters will help you budget effectively and avoid common pitfalls.

## Currency Basics

**Currency:** Sri Lankan Rupee (LKR)
**Symbol:** Rs. or LKR
**Exchange Rate (approx):** 1 USD = 320-330 LKR (check current rates)

## Getting Cash

### ATMs

ATMs are widely available in cities and tourist areas. Look for:
- Commercial Bank
- Sampath Bank
- HSBC
- Nations Trust Bank

**Tips:**
- ATM withdrawal limit: usually 40,000-60,000 LKR per transaction
- Fees: 300-500 LKR per withdrawal
- Inform your bank before traveling

### Money Exchange

- Best rates at banks and licensed money changers
- Colombo airport rates are poor—exchange minimum on arrival
- Keep exchange receipts (needed for some purchases)

## Credit Cards

Major cards (Visa, Mastercard) accepted at:
- Hotels
- Large restaurants
- Shopping malls
- Tourist attractions

**Cash needed for:**
- Small shops and local restaurants
- Tuk-tuks and local transport
- Markets and street food
- Tips

## Tipping Guide

| Service | Suggested Tip |
|---------|--------------|
| Restaurant | 10% (check if included) |
| Driver/guide | 1,000-2,000 LKR/day |
| Hotel porter | 200-300 LKR |
| Spa/massage | 10-15% |
    `,
    heroImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop',
    category: 'money',
    tags: ['money', 'currency', 'ATM', 'budget', 'tipping'],
    lastUpdated: '2026-01-10',
    faqs: [
      { question: 'Should I bring USD or exchange before arrival?', answer: 'Bring some USD cash for emergencies, but exchange most money in Sri Lanka for better rates.' },
      { question: 'Are credit cards widely accepted?', answer: 'Only in tourist areas and larger establishments. Always carry cash.' },
      { question: 'What is the daily budget for Sri Lanka?', answer: 'Budget: $30-50/day. Mid-range: $80-150/day. Luxury: $200+/day.' },
    ],
  },
  {
    slug: 'sim-cards-internet',
    title: 'SIM Cards & Internet in Sri Lanka',
    shortDescription: 'How to stay connected with local SIM cards, WiFi, and mobile data packages.',
    longContent: `
# Staying Connected in Sri Lanka

Getting online in Sri Lanka is easy and affordable. Here's how to stay connected.

## SIM Cards

### Buying a SIM

**Best Places:**
- Colombo Airport (24/7 counters)
- Mobile shops in any town
- Supermarkets

**Required Documents:**
- Passport (for registration)
- Passport-sized photo (sometimes)

### Mobile Providers

| Provider | Coverage | Best For |
|----------|----------|----------|
| Dialog | Excellent | Best overall coverage |
| Mobitel | Very Good | Good value packages |
| Airtel | Good | Budget option |
| Hutch | Moderate | Urban areas |

### Recommended Packages

**Dialog Tourist Pack (Most Popular):**
- Cost: ~1,500 LKR ($5)
- Data: 25GB for 30 days
- Includes local calls

**Mobitel Visitor Pack:**
- Cost: ~1,200 LKR ($4)
- Data: 20GB for 30 days
- Good value option

## WiFi

Free WiFi available at:
- Most hotels and guesthouses
- Restaurants and cafes (especially in tourist areas)
- Some train stations

**Speed varies** significantly—don't rely on WiFi for important calls.

## Tips

- 4G coverage is good in most tourist areas
- Signal can be weak in rural/mountainous areas
- Top up via Dialog app or any shop displaying provider logo
    `,
    heroImage: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=2025&auto=format&fit=crop',
    category: 'practical',
    tags: ['SIM card', 'internet', 'mobile', 'connectivity', 'WiFi'],
    lastUpdated: '2026-01-12',
    faqs: [
      { question: 'Can I buy a SIM at the airport?', answer: 'Yes! Dialog and Mobitel have 24/7 counters at Colombo airport arrivals.' },
      { question: 'Do I need to unlock my phone?', answer: 'Yes, your phone must be unlocked to use a local SIM.' },
      { question: 'How good is 4G coverage?', answer: '4G is available in most tourist areas and cities. Rural areas may have 3G or limited coverage.' },
    ],
  },
  {
    slug: 'sri-lanka-train-travel',
    title: 'Ultimate Guide to Sri Lanka Train Travel',
    shortDescription: 'How to book, what to expect, and the most scenic train routes in Sri Lanka.',
    longContent: `
# Sri Lanka Train Travel Guide

Sri Lanka's railway system offers some of the world's most scenic train journeys. Here's everything you need to know.

## Why Travel by Train?

- **Breathtaking scenery** (especially hill country)
- **Affordable** (much cheaper than hired cars)
- **Cultural experience** (mingle with locals)
- **Sustainable** travel option

## Most Scenic Routes

### 1. Kandy to Ella (★★★★★)
The most famous route, passing through tea plantations, mountains, and crossing the Nine Arch Bridge.
- Duration: 6-7 hours
- Best seats: Right side outward from Kandy

### 2. Colombo to Kandy (★★★★)
Scenic journey through hills and forests.
- Duration: 2.5-3 hours
- Beautiful countryside views

### 3. Colombo to Galle (★★★★)
Coastal route hugging the ocean.
- Duration: 2-3 hours
- Amazing sunset views

## Class Types

| Class | Description | Fan/AC | Reserve? |
|-------|-------------|--------|----------|
| 1st Class | Comfortable seats, AC | AC | Yes, must book |
| 2nd Class | Padded seats, windows open | Fan | Observation class only |
| 3rd Class | Bench seating, crowded | None | No |

## Booking Tips

### How to Book

1. **In Person:** Railway stations (Colombo Fort, Kandy, etc.)
2. **Online:** visit12go.asia or bookaway.com (markup applies)
3. **Through Hotel:** Many hotels book for a small fee

### Key Tips

- Book 30 days in advance for 1st class on popular routes
- 2nd class observation carriages sell out fast
- Unreserved seats? Arrive 1 hour early
- Trains often run late—build flexibility into plans
    `,
    heroImage: 'https://images.unsplash.com/photo-1590123573398-04e31805df3b?q=80&w=2070&auto=format&fit=crop',
    category: 'transport',
    tags: ['trains', 'scenic routes', 'transport', 'Kandy', 'Ella'],
    lastUpdated: '2026-01-14',
    faqs: [
      { question: 'How far in advance should I book?', answer: '30 days for 1st class, 7-14 days for 2nd class observation on popular routes.' },
      { question: 'Can I hang out of the train doors?', answer: 'While many do, it\'s technically not allowed and can be dangerous. Be careful.' },
      { question: 'Are trains on time?', answer: 'Delays are common. Build buffer time into your itinerary.' },
    ],
  },
  {
    slug: 'safety-tips',
    title: 'Sri Lanka Safety Guide for Travelers',
    shortDescription: 'Is Sri Lanka safe? Common scams, health tips, and how to stay safe during your trip.',
    longContent: `
# Safety Guide for Sri Lanka

Sri Lanka is generally a safe destination for tourists, but like anywhere, awareness helps you avoid problems.

## Overall Safety

Sri Lanka is considered **safe for tourists**. Violent crime against tourists is rare. Most visitors experience nothing but warmth and hospitality.

## Common Scams to Avoid

### Gem Scams
"My uncle has a gem shop..." Don't buy gems from touts or without certificates.

### Tuk-Tuk Overcharging
Always agree on price before getting in, or use PickMe app.

### "Temple is Closed"
Touts claiming attractions are closed to redirect you elsewhere.

### Fake Guides
Only use licensed guides for important sites.

## Health & Medical

### Vaccinations
Check with your doctor, but commonly recommended:
- Hepatitis A & B
- Typhoid
- Routine vaccinations up to date

### Medical Care
- Good hospitals in Colombo and major cities
- Travel insurance is **essential**
- Pharmacies widely available

### Food & Water
- Drink only bottled water
- Eat freshly cooked food
- Be cautious with street food initially

## Natural Hazards

### Sun Protection
The tropical sun is intense. Use SPF 50+, wear hats.

### Mosquitoes
Dengue is present. Use repellent, especially at dusk.

### Ocean Currents
Strong currents on some beaches. Swim where locals swim.

## Emergency Contacts

| Service | Number |
|---------|--------|
| Police | 119 |
| Ambulance | 110 |
| Tourist Police | 011-242-1052 |
    `,
    heroImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
    category: 'safety',
    tags: ['safety', 'health', 'scams', 'emergency', 'travel insurance'],
    lastUpdated: '2026-01-08',
    faqs: [
      { question: 'Is Sri Lanka safe for solo female travelers?', answer: 'Yes, generally safe. Standard precautions apply—dress modestly at temples, be cautious at night.' },
      { question: 'Do I need travel insurance?', answer: 'Absolutely. Medical evacuation can be expensive. Get comprehensive coverage.' },
      { question: 'Is the tap water safe to drink?', answer: 'No, always drink bottled or filtered water.' },
    ],
  },
  {
    slug: 'best-time-to-visit',
    title: 'Best Time to Visit Sri Lanka',
    shortDescription: 'Understanding Sri Lanka\'s two monsoons and when to visit each region.',
    longContent: `
# Best Time to Visit Sri Lanka

Sri Lanka's unique position means you can visit year-round—you just need to pick the right coast!

## Understanding the Monsoons

Sri Lanka has two monsoon seasons affecting different coasts:

### Southwest Monsoon (Yala)
**When:** May to September
**Affects:** West and South coasts, hill country
**Best Coast:** East coast (dry season)

### Northeast Monsoon (Maha)
**When:** October to January
**Affects:** East and North coasts
**Best Coast:** West and South coasts (dry season)

## Monthly Breakdown

| Month | West/South Coast | East Coast | Hill Country | Best For |
|-------|-----------------|------------|--------------|----------|
| Jan | ☀️ Dry | 🌧️ Wet | ☀️ Cool | South coast |
| Feb | ☀️ Dry | ☀️ Dry | ☀️ Cool | Everywhere |
| Mar | ☀️ Dry | ☀️ Dry | ☀️ Warm | Everywhere |
| Apr | 🌧️ Wet | ☀️ Dry | 🌧️ Wet | East coast |
| May | 🌧️ Wet | ☀️ Dry | 🌧️ Wet | East/Cultural |
| Jun | 🌧️ Wet | ☀️ Dry | 🌧️ Wet | East coast |
| Jul | 🌧️ Wet | ☀️ Dry | ☀️ Cool | East/Hill country |
| Aug | 🌧️ Wet | ☀️ Dry | ☀️ Cool | East/Hill country |
| Sep | 🌧️ Wet | 🌧️ Mixed | 🌧️ Wet | Cultural Triangle |
| Oct | 🌧️ Mixed | 🌧️ Wet | 🌧️ Wet | Transition |
| Nov | ☀️ Dry | 🌧️ Wet | 🌧️ Mixed | South coast |
| Dec | ☀️ Dry | 🌧️ Wet | ☀️ Cool | South/West coast |

## Peak Seasons

### High Season (December - March)
- Best weather on south and west coasts
- Higher prices and crowds
- Book well in advance

### Shoulder Season (April, October - November)
- Unpredictable weather
- Better deals on accommodation
- Fewer tourists

### Low Season (May - September)
- Great for east coast
- Yala wildlife excellent
- Best hotel deals

## Special Events

- **Esala Perahera (July/August):** Kandy
- **Sinhala New Year (April 13-14):** Island-wide
- **Whale Season:** November-April (South), March-August (East)
    `,
    heroImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=2080&auto=format&fit=crop',
    category: 'planning',
    tags: ['weather', 'seasons', 'monsoon', 'planning', 'when to visit'],
    lastUpdated: '2026-01-05',
    faqs: [
      { question: 'Can I visit Sri Lanka during monsoon?', answer: 'Yes! Just visit the coast not affected by monsoon. Rain usually comes in short bursts.' },
      { question: 'What\'s the best month overall?', answer: 'February and March offer good weather across most of the island.' },
      { question: 'Is it very humid?', answer: 'Yes, especially on the coasts. Hill country is cooler and less humid.' },
    ],
  },
  {
    slug: 'packing-list',
    title: 'Complete Sri Lanka Packing List',
    shortDescription: 'What to pack for Sri Lanka: clothing, gear, and essentials for every type of traveler.',
    longContent: `
# Complete Sri Lanka Packing List

Pack smart for Sri Lanka's diverse climates—from tropical beaches to cool hill stations.

## Clothing Essentials

### General
- Lightweight, breathable fabrics (cotton, linen)
- Clothes that cover shoulders and knees (for temples)
- Comfortable walking shoes
- Flip-flops/sandals for beach and casual wear

### For Women
- Sarong (multi-purpose: beach cover, temple visit, scarf)
- One-piece swimsuit or modest bikini
- Light cardigan for AC and temples

### For Hill Country
- Light jacket or fleece (evenings can be cool)
- Long pants for hiking and cool weather
- Closed-toe shoes for trekking

## Essential Gear

### Sun Protection
- SPF 50+ sunscreen (expensive locally)
- Sunglasses
- Wide-brimmed hat

### Medical Kit
- Personal medications
- Insect repellent (DEET-based)
- Antimalarial if advised
- Basic first aid
- Rehydration salts

### Tech
- Universal power adapter (Type D, M, G sockets)
- Portable charger
- Waterproof phone case

## Documents

- Passport (valid 6+ months)
- ETA/visa approval printout
- Travel insurance documents
- Flight bookings
- Hotel confirmations
- Copies stored in email/cloud

## What NOT to Pack

- Too many clothes (laundry is cheap and quick)
- Expensive jewelry
- Provocative clothing
- Large amounts of cash

## Packing by Trip Type

### Beach Holiday
- Multiple swimwear
- Reef-safe sunscreen
- Snorkel gear (or rent locally)

### Cultural Tour
- Modest clothing
- Comfortable shoes for ruins
- Hat and water bottle

### Adventure/Hiking
- Hiking boots
- Quick-dry clothing
- Rain jacket
- Daypack
    `,
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    category: 'practical',
    tags: ['packing', 'checklist', 'essentials', 'clothing', 'gear'],
    lastUpdated: '2026-01-06',
    faqs: [
      { question: 'What\'s the electricity standard?', answer: 'Type D, M, and G sockets. 230V. Bring a universal adapter.' },
      { question: 'Can I buy things I forget?', answer: 'Most essentials are available in Colombo and tourist areas, though sunscreen is pricey.' },
      { question: 'What should I wear to temples?', answer: 'Cover shoulders and knees. Remove shoes and hats before entering.' },
    ],
  },
  {
    slug: 'local-etiquette',
    title: 'Sri Lankan Culture & Etiquette Guide',
    shortDescription: 'Cultural customs, religious etiquette, and how to be a respectful traveler in Sri Lanka.',
    longContent: `
# Sri Lankan Culture & Etiquette

Understanding local customs will enrich your experience and earn you respect from locals.

## Religious Etiquette

### Buddhist Temples

- Remove shoes and hats before entering
- Dress modestly (cover shoulders and knees)
- Never turn your back to Buddha statues for photos
- Don't point feet toward Buddha images
- Ask before photographing monks
- Women should not touch monks

### Hindu Temples

- Similar rules to Buddhist temples
- Some temples restrict entry to certain areas
- Leather items sometimes not allowed

### Mosques

- Remove shoes
- Women should cover head
- Dress very conservatively
- Ask permission before entering

## Social Customs

### Greetings
- "Ayubowan" (may you live long) with palms together
- Handshakes common in tourist/business contexts
- Slight bow shows respect

### The Head
- The head is considered sacred
- Never pat a child's head
- Remove hats in homes and temples

### Feet
- Feet are considered lowest and impure
- Don't point feet at people or religious objects
- Remove shoes when entering homes

### The Left Hand
- Traditionally considered unclean
- Use right hand for eating and handing objects

## Dining Etiquette

- Wait to be seated
- Use right hand if eating with hands
- Accept food/drink offers graciously
- Finish food to show appreciation
- Tipping: 10% in restaurants

## Photography

- Always ask before photographing people
- Never pose with Buddha statues irreverently
- Some temples charge for photography
- Avoid photographing military/police installations

## Dress Code

### What to Wear
- Modest clothing in public
- Cover shoulders and knees at temples
- Swimwear only at beaches/pools
- White clothing for temple visits (appreciated but not required)

### What to Avoid
- Clothing with Buddha images (offensive, may be confiscated)
- Very short shorts/skirts in village areas
- Revealing tops away from the beach
    `,
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52707b?q=80&w=2070&auto=format&fit=crop',
    category: 'culture',
    tags: ['culture', 'etiquette', 'temples', 'customs', 'respect'],
    lastUpdated: '2026-01-07',
    faqs: [
      { question: 'Can I wear shorts in Sri Lanka?', answer: 'Yes, at beaches and tourist areas. Cover up for temples and rural villages.' },
      { question: 'Is it okay to photograph monks?', answer: 'Ask permission first. Most will agree politely.' },
      { question: 'What if I accidentally offend someone?', answer: 'A sincere apology with palms together will be graciously accepted. Sri Lankans are forgiving.' },
    ],
  },
  {
    slug: 'getting-around',
    title: 'Getting Around Sri Lanka: Transport Guide',
    shortDescription: 'Complete guide to tuk-tuks, buses, trains, taxis, and hiring a private driver in Sri Lanka.',
    longContent: `
# Getting Around Sri Lanka

From iconic tuk-tuks to scenic trains, here's how to navigate the island.

## Transport Options Compared

| Mode | Cost | Comfort | Experience | Best For |
|------|------|---------|------------|----------|
| Tuk-Tuk | $ | Low | High | Short trips |
| Bus | $ | Low | High | Budget travel |
| Train | $ | Medium | Highest | Scenic routes |
| Taxi/Uber | $$ | High | Low | City travel |
| Private Driver | $$$ | Highest | Medium | Touring |
| Rental Car | $$ | High | Low | Not recommended |

## Tuk-Tuks

The quintessential Sri Lankan experience!

### Tips
- Agree on price BEFORE getting in
- Use PickMe app for fair metered pricing
- Typical short trip: 200-300 LKR
- Long journeys: negotiate or use PickMe
- Tuk-tuks can be hired for full days (3,000-5,000 LKR)

## Buses

Extensive network reaching everywhere.

### Types
- **Red CTB buses:** Government, cheap, crowded
- **Private buses:** Slightly more expensive, faster
- **Intercity express:** AC, reserved seats, limited routes

### Tips
- No advance booking needed (except express)
- Enter from the rear, exit from front
- Money collected by conductor on board
- Hold on tight—drivers are fast!

## Trains

See the train travel guide for detailed information.

## Private Driver

Popular for multi-day touring.

### Typical Costs
- Per day: 8,000-12,000 LKR ($25-40)
- Per kilometer: 40-60 LKR
- Fuel included in better deals

### Finding a Driver
- Book through your hotel
- Reputable agencies online
- Driver becomes your guide

## Ride-Hailing Apps

### PickMe
- Most widely used
- Tuk-tuks and cars
- Fair metered pricing
- Download before arrival

### Uber
- Available in Colombo area
- Limited outside cities

## Renting a Car

**Not recommended for tourists:**
- Left-hand traffic
- Aggressive driving culture
- Confusing roads
- Hiring a driver is similar cost and much easier
    `,
    heroImage: 'https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?q=80&w=2070&auto=format&fit=crop',
    category: 'transport',
    tags: ['transport', 'tuk-tuk', 'bus', 'taxi', 'driver'],
    lastUpdated: '2026-01-11',
    faqs: [
      { question: 'Should I hire a driver for my trip?', answer: 'For multi-day touring, yes. It\'s affordable ($25-40/day) and eliminates transport stress.' },
      { question: 'Is Uber available?', answer: 'Only in Colombo area. PickMe is more widely available.' },
      { question: 'Can I rent a scooter?', answer: 'Yes, in tourist areas. International license required. Be very careful—traffic is chaotic.' },
    ],
  },
  {
    slug: 'sri-lanka-budget-guide',
    title: 'Sri Lanka Budget Guide: Costs & Prices',
    shortDescription: 'Detailed breakdown of daily costs, accommodation prices, food, and activities in Sri Lanka.',
    longContent: `
# Complete Sri Lanka Budget Guide

Sri Lanka offers excellent value for money. Here's what things actually cost.

## Daily Budget Breakdown

### Budget Traveler ($30-50/day)
- Guesthouse/hostel: $10-20
- Local food: $5-10
- Transport (buses/trains): $5
- Activities: $10

### Mid-Range ($80-150/day)
- 3-star hotel: $40-80
- Restaurant meals: $15-25
- Private transport: $25-35
- Activities: $20-30

### Luxury ($200+/day)
- 5-star resort: $150+
- Fine dining: $40+
- Private car + guide: $50+
- Premium activities: unlimited

## Accommodation Costs

| Type | Low Season | High Season |
|------|------------|-------------|
| Hostel dorm | $8-15 | $12-20 |
| Guesthouse | $15-30 | $25-50 |
| Mid-range hotel | $40-80 | $60-120 |
| Boutique hotel | $80-150 | $120-250 |
| Luxury resort | $150-500+ | $200-800+ |

## Food Costs

| Item | Price (LKR) | Price (USD) |
|------|-------------|-------------|
| Rice & curry (local) | 400-600 | $1.50-2 |
| Restaurant main | 800-2,000 | $2.50-6 |
| Tourist restaurant | 2,000-4,000 | $6-12 |
| Fine dining | 5,000+ | $15+ |
| Bottled water (1.5L) | 80-120 | $0.30 |
| Local beer | 400-700 | $1.20-2 |
| Fresh juice | 200-400 | $0.60-1.20 |
| Street snack | 100-300 | $0.30-1 |

## Activity Costs

| Activity | Price (USD) |
|----------|-------------|
| Sigiriya entrance | $30 |
| Yala full-day safari | $50-80 |
| Whale watching | $30-50 |
| Cooking class | $25-40 |
| Surf lesson | $20-30 |
| Temple entrance | $0-5 |
| Train (Kandy-Ella, 2nd class) | $3 |

## Money-Saving Tips

1. Eat at local restaurants (rice & curry)
2. Travel by train and bus
3. Stay in guesthouses
4. Visit temples (many are free)
5. Book accommodation directly
6. Avoid peak season (Dec-Jan)
7. Share tuk-tuks and tours
    `,
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    category: 'money',
    tags: ['budget', 'costs', 'prices', 'money saving', 'travel expenses'],
    lastUpdated: '2026-01-09',
    faqs: [
      { question: 'Is Sri Lanka expensive to visit?', answer: 'No, it offers excellent value. Budget travelers can manage on $30-50/day.' },
      { question: 'Should I bargain?', answer: 'At markets and with tuk-tuks, yes. Shops often have fixed prices.' },
      { question: 'Are entrance fees expensive?', answer: 'Major attractions like Sigiriya ($30) can add up. Budget for these.' },
    ],
  },
];

export function getTipBySlug(slug: string): TravelTip | undefined {
  return travelTips.find((t) => t.slug === slug);
}

export function getTipsByCategory(category: TravelTip['category']): TravelTip[] {
  return travelTips.filter((t) => t.category === category);
}
