// Blog posts content data for Visit Sri Lanka

export interface BlogPost {
  slug: string;
  title: string;
  shortDescription: string;
  longContent: string;
  heroImage: string;
  author: string;
  publishedDate: string;
  lastUpdated: string;
  category: 'guides' | 'experiences' | 'culture' | 'nature' | 'food' | 'adventure';
  tags: string[];
  readingTime: number; // minutes
  featured: boolean;
}

export const blogCategories = {
  guides: { name: 'Travel Guides', icon: '📖' },
  experiences: { name: 'Experiences', icon: '✨' },
  culture: { name: 'Culture', icon: '🏛️' },
  nature: { name: 'Nature & Wildlife', icon: '🌿' },
  food: { name: 'Food & Drink', icon: '🍛' },
  adventure: { name: 'Adventure', icon: '🏔️' },
} as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'first-time-sri-lanka-guide',
    title: 'First Time in Sri Lanka? The Ultimate Beginner\'s Guide',
    shortDescription: 'Everything you need to know before your first trip to Sri Lanka—from visa to itineraries to packing tips.',
    longContent: `
# First Time in Sri Lanka? Your Complete Guide

Planning your first trip to Sri Lanka? This comprehensive guide covers everything from visa requirements to creating the perfect itinerary.

## Why Visit Sri Lanka?

Sri Lanka packs an incredible amount of diversity into a compact island. In just two weeks, you can:

- Explore 2,500-year-old ruins
- Spot leopards on safari
- Surf perfect point breaks
- Take one of the world's most scenic train rides
- Relax on pristine beaches
- Hike through misty tea plantations

## When to Go

Sri Lanka can be visited year-round thanks to its dual monsoon system:

- **December to March:** Best for south and west coasts
- **April to September:** Best for east coast
- **Cultural Triangle:** Good year-round

## How Long to Stay

- **5-7 days:** Highlights of one region
- **10-14 days:** Comprehensive island tour
- **2-3 weeks:** In-depth exploration with beach time

## Getting Around

For first-timers, we recommend:

1. **Private driver:** Stress-free, flexible, about $35-50/day
2. **Trains:** For scenic routes (Kandy-Ella is a must!)
3. **Tuk-tuks:** For local trips, use PickMe app

## Sample 10-Day Itinerary

| Days | Destination | Highlights |
|------|-------------|------------|
| 1-2 | Sigiriya | Rock Fortress, Dambulla |
| 3 | Kandy | Temple of the Tooth |
| 4-5 | Ella | Train, Nine Arch Bridge, hiking |
| 6 | Yala | Safari |
| 7-9 | Mirissa | Beach, whale watching |
| 10 | Galle | Fort exploration |

## Essential Tips

1. Apply for your ETA before arrival
2. Pack modest clothing for temples
3. Sunscreen is expensive locally—bring your own
4. Get a local SIM card at the airport
5. Try the rice and curry—it's amazing!

Start planning your Sri Lanka adventure today. Trust us, you'll want to come back!
    `,
    heroImage: 'https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2026-01-10',
    lastUpdated: '2026-01-10',
    category: 'guides',
    tags: ['first time', 'beginners', 'planning', 'itinerary', 'tips'],
    readingTime: 8,
    featured: true,
  },
  {
    slug: 'kandy-ella-train-guide',
    title: 'The Kandy to Ella Train: Complete Guide to Sri Lanka\'s Most Scenic Journey',
    shortDescription: 'How to book, what to expect, and insider tips for the famous Kandy to Ella train ride.',
    longContent: `
# The Kandy to Ella Train Journey

The train ride from Kandy to Ella is frequently ranked among the most beautiful train journeys in the world. Here's everything you need to know.

## Why It's Special

For approximately 7 hours, the train winds through:

- Emerald tea plantations
- Misty mountain peaks
- Cascading waterfalls
- Colonial-era stations
- The famous Nine Arch Bridge

## Booking Your Tickets

### Class Options

**First Class (Reserved, AC)**
- Most comfortable seats
- Air conditioning (windows don't open!)
- Book 30 days in advance
- Cost: ~$10

**Second Class Observation (Reserved)**
- Large windows
- Windows open for photos
- Very popular—book 14+ days ahead
- Cost: ~$5

**Second/Third Class (Unreserved)**
- Show up and hop on
- Can be crowded
- Cost: ~$2-3

### Where to Book

1. **Colombo Fort Station:** In person, up to 30 days ahead
2. **Online:** 12go.asia or bookaway.com (with markup)
3. **Your hotel:** Small fee but convenient

## The Best Seats

- **Right side from Kandy:** Best views toward Ella
- **Observation carriage:** End of train, panoramic views
- **Hang from the door:** Not officially allowed but everyone does it—carefully!

## Key Stops

| Station | Time from Kandy | Notable |
|---------|-----------------|---------|
| Peradeniya | 10 min | Botanical Gardens |
| Nanu Oya | 3 hrs | For Nuwara Eliya |
| Haputale | 5 hrs | Viewpoint town |
| Ella | 7 hrs | Final destination |

## Tips for the Journey

1. Bring snacks and water
2. Trains often run late—be flexible
3. The train gets cooler as altitude increases
4. Best light for photos: morning journeys
5. Sit on the right side leaving Kandy

This journey alone is worth coming to Sri Lanka for!
    `,
    heroImage: 'https://images.unsplash.com/photo-1590123573398-04e31805df3b?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2026-01-08',
    lastUpdated: '2026-01-12',
    category: 'experiences',
    tags: ['train', 'Kandy', 'Ella', 'scenic', 'transport'],
    readingTime: 6,
    featured: true,
  },
  {
    slug: 'sri-lanka-food-guide',
    title: '15 Sri Lankan Dishes You Must Try',
    shortDescription: 'A delicious guide to Sri Lanka\'s best foods, from rice and curry to kottu roti.',
    longContent: `
# 15 Must-Try Sri Lankan Foods

Sri Lankan cuisine is an explosion of flavors—spicy, fragrant, and utterly addictive. Don't leave without trying these dishes.

## Rice and Curry

The national dish. A plate of rice surrounded by small curries:

- **Dhal curry:** Creamy lentil curry
- **Pol sambol:** Spicy coconut relish  
- **Chicken/fish curry:** Aromatic and spicy
- **Vegetable curries:** Endless variety
- **Papadum:** Crispy lentil crackers

**Where to try:** Any local restaurant (Rs. 400-600)

## Kottu Roti

The sound of Sri Lanka! Shredded roti chopped on a hot griddle with vegetables, egg, and meat. Best enjoyed late at night from a street stall.

## Hoppers (Appa)

Bowl-shaped pancakes made from fermented rice batter:

- **Plain hopper:** Crispy edges, soft center
- **Egg hopper:** With an egg cooked in the middle
- **String hoppers:** Thin noodle nests

**Best for:** Breakfast or dinner

## Lamprais

Dutch-Burgher heritage dish: rice, meat curries, and sambols wrapped in banana leaf and baked. Rich and special.

## Seafood

Fresh from the Indian Ocean:

- Grilled fish with spices
- Devilled prawns
- Jaffna crab curry
- Ambul thiyal (sour fish curry)

## Street Food

- **Isso vade:** Shrimp fritters
- **Mutton rolls:** Crispy fried rolls
- **Wade:** Savory fried lentil donuts
- **Rotti:** Flatbread with fillings

## Sweet Treats

- **Watalappan:** Coconut custard
- **Kiribath:** Milk rice
- **Kavum:** Sweet fried cakes

## Drinks

- **Ceylon tea:** World-famous
- **King coconut:** Refreshing street drink
- **Arrack:** Local palm spirit
- **Ginger beer:** Spicy and sweet

## Eating Tips

1. Eating with hands is traditional (right hand only)
2. "Spicy" means VERY spicy—ask for "no spicy" if needed
3. Lunch packets are great value
4. Best food is often in simple local restaurants
    `,
    heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2026-01-05',
    lastUpdated: '2026-01-05',
    category: 'food',
    tags: ['food', 'cuisine', 'restaurants', 'rice and curry', 'kottu'],
    readingTime: 7,
    featured: false,
  },
  {
    slug: 'whale-watching-mirissa',
    title: 'Whale Watching in Mirissa: Complete Guide',
    shortDescription: 'How to spot blue whales off Sri Lanka\'s south coast—operators, seasons, and whale watching tips.',
    longContent: `
# Whale Watching in Mirissa

Mirissa is one of the best places in the world to see blue whales—the largest animals ever to exist on Earth.

## The Experience

Boats depart early (6 AM) and head about 10-15 km offshore where blue whales come to feed in the deep waters. On a good day, you might see:

- **Blue whales:** The main attraction (up to 30m long!)
- **Sperm whales:** Often in groups
- **Dolphins:** Spinner and bottlenose
- **Whale sharks:** Occasional sightings

## Best Time to Go

**Peak season:** November to April

- January-March: Highest sighting rates
- December & April: Good chances, fewer crowds
- May-October: Whales move to east coast (Trincomalee)

## Choosing an Operator

### Responsible Whale Watching

Look for operators who:
- Limit passenger numbers
- Maintain distance from whales (100m minimum)
- Don't chase or harass animals
- Use trained naturalist guides

### Recommended Operators

- Raja & The Whales
- Whale Watching Club
- Sail Lanka Charter

### Prices

- Standard boat: $30-50
- Small group/premium: $60-100

## What to Expect

**Duration:** 4-5 hours total

**Success rate:** 90%+ during peak season

**Typical schedule:**
- 5:30 AM: Check-in at harbor
- 6:00 AM: Departure
- 7:30 AM: Reach whale territory
- 8:00-10:00 AM: Whale watching
- 10:30-11:00 AM: Return

## Practical Tips

1. Take seasickness medication BEFORE boarding
2. Bring sunscreen, hat, and camera with zoom lens
3. Eat a light breakfast
4. Sit outside the cabin for best views
5. Be patient—nature isn't predictable

## Conservation

Sri Lanka's whale populations face threats from:
- Ship strikes
- Fishing nets
- Irresponsible whale watching

Choose responsible operators to support conservation efforts.
    `,
    heroImage: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2026-01-03',
    lastUpdated: '2026-01-03',
    category: 'nature',
    tags: ['whale watching', 'Mirissa', 'wildlife', 'ocean', 'blue whales'],
    readingTime: 6,
    featured: true,
  },
  {
    slug: 'sigiriya-vs-pidurangala',
    title: 'Sigiriya vs Pidurangala: Which Rock Should You Climb?',
    shortDescription: 'Comparing Sri Lanka\'s two famous rocks—price, difficulty, and which offers the best experience.',
    longContent: `
# Sigiriya vs Pidurangala: The Complete Comparison

Both rocks offer stunning views, but they're very different experiences. Here's how to choose.

## Quick Comparison

| Factor | Sigiriya | Pidurangala |
|--------|----------|-------------|
| Price | $30 (foreigner) | $4 (foreigner) |
| Crowd Level | High | Low |
| Difficulty | Moderate | Moderate-Hard |
| Time Needed | 2-3 hours | 1.5 hours |
| Best For | History & views | Sunrise & budget |
| UNESCO Site | Yes | No |

## Sigiriya Rock Fortress

### Pros
- UNESCO World Heritage Site
- Ancient frescoes of the Sigiriya Maidens
- Water gardens and royal ruins
- Lion paw gateway
- Historical significance

### Cons
- Expensive entry ($30)
- Very crowded (especially 8-11 AM)
- More steps and structured path
- Can feel rushed at peak times

### Best For
History lovers who want the full cultural experience.

## Pidurangala Rock

### Pros
- Cheap entry ($4)
- Incredible sunrise views OF Sigiriya
- Far fewer tourists
- Feels more adventurous
- Ancient reclining Buddha at base

### Cons
- No historical site at the summit
- Final section involves scrambling over rocks
- Less well-maintained
- No facilities at top

### Best For
Photographers, budget travelers, and those seeking a quieter experience.

## Our Recommendation

**Do both!**

- **Sunrise at Pidurangala:** Wake early for the iconic Sigiriya view
- **Morning at Sigiriya:** Explore the fortress and history

If you can only do one:
- History buff? **Sigiriya**
- Photographer? **Pidurangala**
- Budget traveler? **Pidurangala**
- First time in Sri Lanka? **Sigiriya**
    `,
    heroImage: 'https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-28',
    lastUpdated: '2026-01-02',
    category: 'guides',
    tags: ['Sigiriya', 'Pidurangala', 'hiking', 'comparison', 'Cultural Triangle'],
    readingTime: 5,
    featured: false,
  },
  {
    slug: 'yala-safari-tips',
    title: 'Yala Safari: How to Maximize Your Leopard Sighting Chances',
    shortDescription: 'Expert tips for spotting leopards at Sri Lanka\'s premier national park.',
    longContent: `
# Maximizing Your Leopard Chances at Yala

Yala has the highest density of leopards in the world—here's how to stack the odds in your favor.

## Understanding Yala's Leopards

Yala's Block 1 is home to approximately 25 leopards, making sightings relatively common. However, sightings aren't guaranteed.

**Current sighting rate:** ~60-70% on full-day safaris

## Best Time to Visit

### Season
- **February to July:** Best wildlife viewing (dry season)
- **September:** Park closed for rest
- **October-January:** Can be good, wetter conditions

### Time of Day
- **Dawn patrol (5:30 AM):** Best chance—leopards active before heat
- **Afternoon (2:00 PM):** Good late sightings near water

## Safari Duration

| Duration | Price | Leopard Chance |
|----------|-------|----------------|
| Half-day (5 hours) | $50-60 | 40-50% |
| Full-day (10 hours) | $80-100 | 60-70% |
| Two full days | $150+ | 85%+ |

**Our tip:** Book a full-day safari for the best chance.

## Choosing a Block

- **Block 1:** Most leopards (and most jeeps)
- **Block 5:** Seasonal leopards, fewer crowds
- **Combination:** Some operators do both

## Key Leopard Spots

While sightings can happen anywhere:
- **Pathena Kema lake area**
- **Galge Rock**
- **Palatupana entrance road**
- **Near water holes in dry season**

## Safari Tips

1. **Hire a good tracker:** Experience matters enormously
2. **Be patient:** Stay quiet and wait near promising spots
3. **Bring binoculars:** Essential for distant sightings
4. **Telephoto lens:** 300mm minimum for photos
5. **Layer up:** Early mornings are cool
6. **Stay hydrated:** Long days in a jeep

## Other Wildlife

Even without leopards, you'll likely see:
- Elephants (especially near water)
- Crocodiles
- Wild boar
- Spotted deer
- Peacocks
- Eagles and other birds

## Responsible Safari

- Don't pressure your driver to approach too closely
- Never disturb animals for photos
- Stay in the vehicle at all times
- Use serious operators (not the cheapest)
    `,
    heroImage: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?q=80&w=2187&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-25',
    lastUpdated: '2026-01-01',
    category: 'nature',
    tags: ['Yala', 'safari', 'leopards', 'wildlife', 'national park'],
    readingTime: 7,
    featured: false,
  },
  {
    slug: 'sri-lanka-temples-guide',
    title: 'A Guide to Sri Lanka\'s Most Sacred Buddhist Temples',
    shortDescription: 'From the Temple of the Tooth to ancient dagobas—exploring Sri Lanka\'s Buddhist heritage.',
    longContent: `
# Sri Lanka's Most Sacred Buddhist Temples

Sri Lanka has been a Buddhist nation for over 2,000 years. Here are the temples every visitor should experience.

## Temple of the Sacred Tooth Relic, Kandy

**Sri Lanka's most sacred.**

This temple houses a tooth relic of the Buddha himself, making it the most important Buddhist site in Sri Lanka.

### What to See
- Morning and evening puja ceremonies
- The golden-roofed shrine
- Museum with royal artifacts
- Kandy Lake views

### Tips
- Visit during evening puja (6:30 PM) for the most atmospheric experience
- Dress modestly (covered shoulders and knees)
- Photography restricted near the relic chamber

## Dambulla Cave Temple

**2,000-year-old rock art.**

Five caves containing over 150 Buddha statues and stunning ancient frescoes covering 2,100 square meters.

### What to See
- Cave 2: Largest and most impressive
- Ancient ceiling paintings
- Giant reclining Buddha

## Anuradhapura Sacred City

**Pilgrimage city with the world's oldest tree.**

Sri Maha Bodhi—a sapling from the original Bodhi Tree under which Buddha attained enlightenment, making it the oldest documented tree in the world.

### Key Sites
- Sri Maha Bodhi
- Ruwanwelisaya dagoba
- Jetavanaramaya (once third tallest structure on Earth)

## Gal Vihara, Polonnaruwa

**The finest rock-carved Buddhas in Asia.**

Four Buddha images carved from a single granite rock in the 12th century—breathtaking artistry.

## Kelaniya Raja Maha Vihara

**Just outside Colombo.**

Believed to be visited by Buddha himself, with beautiful modern and ancient murals.

## Temple Etiquette

1. Remove shoes and hats
2. Cover shoulders and knees
3. Never turn your back to Buddha images
4. Don't point feet toward Buddha or monks
5. Ask before photographing
6. Speak quietly and respectfully
    `,
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52707b?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-20',
    lastUpdated: '2025-12-20',
    category: 'culture',
    tags: ['temples', 'Buddhism', 'culture', 'heritage', 'Kandy'],
    readingTime: 8,
    featured: false,
  },
  {
    slug: 'arugam-bay-surf-guide',
    title: 'Surfing Arugam Bay: The Complete Guide',
    shortDescription: 'Everything surfers need to know about Sri Lanka\'s legendary east coast surf destination.',
    longContent: `
# Surfing Arugam Bay: The Complete Guide

Arugam Bay is one of the world's top surf destinations. Here's everything you need to ride its legendary waves.

## Why Arugam Bay?

- World-class right-hand point break
- Consistent waves April-September
- Mellow surf town vibes
- Multiple breaks for all levels
- Affordable surf lifestyle

## The Season

**Best months:** May to August
**Rideable:** April to October
**Off-season:** November to March (very quiet, flat)

## The Breaks

### Main Point (★★★★★)
The famous A-Bay right-hander
- **Level:** Intermediate to advanced
- **Wave:** Long right, up to 400m rides
- **Best tide:** Mid to high
- **Crowd factor:** High during peak season

### Baby Point (★★★)
Perfect for beginners
- **Level:** Beginner to intermediate
- **Wave:** Gentle, forgiving right
- **Crowd factor:** Low

### Peanut Farm (★★★★)
Uncrowded alternative
- **Level:** Intermediate
- **Wave:** Powerful rights
- **Crowd factor:** Low

### Elephant Rock (★★★★)
Challenging reef break
- **Level:** Advanced
- **Wave:** Fast, hollow right
- **Crowd factor:** Low

### Okanda (★★★★★)
Remote, world-class
- **Level:** Intermediate to advanced
- **Wave:** Long right point
- **Crowd factor:** Very low

## Surf Schools & Board Rental

Multiple options on the main road:
- Lessons: $20-30/2 hours
- Board rental: $10-15/day
- Longboards to shortboards available

## Daily Routine

- **5:30 AM:** Dawn patrol at Main Point
- **Morning:** Breakfast at a cafe
- **Midday:** Rest, yoga, beach
- **4:00 PM:** Afternoon session
- **Evening:** Sunset dinner, beach bars

## Where to Stay

| Budget | Option | Price |
|--------|--------|-------|
| Low | Beach huts, hostels | $10-20 |
| Mid | A-Bay guest houses | $30-50 |
| High | Boutique surf lodges | $80+ |

## Tips

1. Reef booties useful for rocky entries
2. Sunscreen and rashguard essential
3. Chill vibes—respect the lineup
4. Stay 2+ weeks to explore all breaks
5. Rent a tuk-tuk for break-hopping
    `,
    heroImage: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-15',
    lastUpdated: '2025-12-22',
    category: 'adventure',
    tags: ['surfing', 'Arugam Bay', 'waves', 'surf guide', 'east coast'],
    readingTime: 7,
    featured: false,
  },
  {
    slug: 'galle-fort-walking-tour',
    title: 'Self-Guided Walking Tour of Galle Fort',
    shortDescription: 'Explore the cobblestone streets of this UNESCO World Heritage fort at your own pace.',
    longContent: `
# Self-Guided Galle Fort Walking Tour

Wander through 400 years of colonial history in this beautifully preserved Dutch fort.

## Getting Started

**Start point:** Main Gate (by the cricket stadium)
**Duration:** 2-3 hours with stops
**Best time:** Early morning or late afternoon

## The Route

### 1. Main Gate & Ramparts

Enter through the imposing main gate and climb the ramparts. Walk along the walls for panoramic views of the Indian Ocean.

### 2. Clock Tower

The 1883 tower is a Galle Fort landmark. Great photo spot.

### 3. Dutch Reformed Church

Built in 1755, this whitewashed church features original colonial tombstones and a hauntingly beautiful interior.

### 4. Groote Kerk (Great Church)

Another important Dutch-era church with interesting gravestone inscriptions.

### 5. Historical Mansion Museum

A beautifully restored Dutch mansion showing colonial-era life.

### 6. Lighthouse Point

Walk along the southern ramparts to the iconic lighthouse. Best sunset spot!

### 7. National Maritime Museum

Learn about Sri Lanka's seafaring history and underwater archaeology.

### 8. Boutique Shopping Street

Pedlar Street and Church Street are lined with:
- Local designer boutiques
- Jewelry shops
- Art galleries
- Antique stores
- Bookshops

### 9. Cafe Culture

End your walk with refreshments:
- **Fortaleza:** Great coffee, rooftop views
- **Pedlar's Inn Café:** Historic building
- **Fort Printers:** Stylish boutique hotel cafe

## Highlights

- **Architecture:** Mix of Dutch, Portuguese, and British styles
- **Sunset on ramparts:** Magical golden hour
- **Cafes and boutiques:** Charming and unique
- **Living town:** Real people live and work here

## Tips

- Wear comfortable walking shoes
- Bring water and sun protection
- Many shops close 1-4 PM
- Best photos at sunrise/sunset
- Budget 3+ hours to explore properly
    `,
    heroImage: 'https://images.unsplash.com/photo-1586183189334-24023e26b6e9?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-10',
    lastUpdated: '2025-12-18',
    category: 'guides',
    tags: ['Galle', 'walking tour', 'colonial', 'UNESCO', 'architecture'],
    readingTime: 6,
    featured: false,
  },
  {
    slug: 'solo-female-travel-sri-lanka',
    title: 'Solo Female Travel in Sri Lanka: Tips & Safety Advice',
    shortDescription: 'Essential advice for women traveling alone in Sri Lanka—what to expect and how to stay safe.',
    longContent: `
# Solo Female Travel in Sri Lanka

Sri Lanka is increasingly popular with solo female travelers. Here's what you need to know.

## Is Sri Lanka Safe for Solo Women?

**Overall: Yes, with standard precautions.**

Sri Lanka is generally a safe destination. Most solo female travelers have wonderful experiences and encounter genuine hospitality.

## What to Expect

### Positive
- Helpful locals who look out for you
- Other solo travelers to connect with
- Easy independent travel
- Affordable private rooms
- Welcoming attitude to tourists

### Challenges
- Unwanted attention (staring, comments)
- Occasional marriage proposals
- Fewer solo female locals visible
- Conservative areas outside tourist zones

## Safety Tips

### Transport
- Use PickMe app for safe tuk-tuks
- Sit near other women on trains/buses
- Book reputable drivers for tours
- Trust your instincts

### Accommodation
- Book guest houses with good women's reviews
- Private rooms are affordable
- Check locks work before accepting room
- Let someone know your plans

### Clothing
- Cover shoulders and knees in non-beach areas
- Dress more conservatively in villages
- Sarong is useful cover-up
- Swimsuit only at beach/pool

### Social
- Firm but polite to persistent men
- "I'm married" works as a deflector
- Don't feel obligated to engage
- Trust your gut feelings

## Best Destinations for Solo Women

1. **Galle Fort:** Safe, tourist-friendly
2. **Ella:** Backpacker hub, easy to meet people
3. **Unawatuna:** Beach town, popular with solos
4. **Kandy:** Cultural, good infrastructure
5. **Arugam Bay:** Surf vibes, welcoming community

## Meeting Other Travelers

- Hostels and guesthouses common areas
- Surf schools
- Group cooking classes
- Organized day tours
- Travel Facebook groups

## Emergency Contacts

- Tourist Police: 011-242-1052
- Women's Helpline: 1938
- Embassy (know yours)

## Final Thoughts

Don't let fear stop you—Sri Lanka rewards solo exploration. Thousands of women travel safely here every year. Take sensible precautions, and you'll have an incredible adventure.
    `,
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    author: 'Visit Sri Lanka Team',
    publishedDate: '2025-12-05',
    lastUpdated: '2026-01-08',
    category: 'guides',
    tags: ['solo travel', 'female travel', 'safety', 'women', 'tips'],
    readingTime: 8,
    featured: true,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
}
