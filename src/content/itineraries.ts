// Itinerary content data for Visit Sri Lanka

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  destinations: string[]; // slugs
  activities: string[];
  accommodation: string;
  meals: string[];
}

export interface Itinerary {
  slug: string;
  title: string;
  shortDescription: string;
  longContent: string;
  heroImage: string;
  duration: number; // days
  type: 'highlights' | 'cultural' | 'adventure' | 'beach' | 'wildlife' | 'luxury' | 'budget';
  tags: string[];
  highlights: string[];
  inclusions: string[];
  startingPrice: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  groupSize: string;
  days: ItineraryDay[];
}

export const itineraryTypes = {
  highlights: { name: 'Highlights', icon: '✨' },
  cultural: { name: 'Cultural', icon: '🏛️' },
  adventure: { name: 'Adventure', icon: '🏔️' },
  beach: { name: 'Beach & Relaxation', icon: '🏖️' },
  wildlife: { name: 'Wildlife Safari', icon: '🐘' },
  luxury: { name: 'Luxury', icon: '💎' },
  budget: { name: 'Budget', icon: '💰' },
} as const;

export const itineraries: Itinerary[] = [
  {
    slug: '5-day-highlights',
    title: '5-Day Sri Lanka Highlights',
    shortDescription: 'Perfect introduction to Sri Lanka covering the must-see Cultural Triangle and hill country.',
    longContent: `
# 5-Day Sri Lanka Highlights Tour

The perfect introduction to Sri Lanka for first-time visitors or those with limited time. This carefully crafted itinerary covers the island's most iconic destinations—from ancient ruins to misty tea plantations.

## Tour Overview

This 5-day journey takes you from the ancient wonders of the Cultural Triangle through the scenic hill country, ending at one of Sri Lanka's most charming destinations.

## What Makes This Tour Special

- Expert local guides at each major site
- Carefully selected accommodations balancing comfort and character
- Private air-conditioned transport throughout
- Flexible scheduling with time for photography and exploration
- Authentic local dining experiences

## Ideal For

- First-time visitors to Sri Lanka
- Those with limited vacation time
- Travelers who want a taste of everything Sri Lanka offers
- Photography enthusiasts
    `,
    heroImage: 'https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop',
    duration: 5,
    type: 'highlights',
    tags: ['first-time', 'culture', 'nature', 'photography'],
    highlights: ['Sigiriya Rock climb', 'Dambulla Cave Temple', 'Kandy Temple of the Tooth', 'Scenic train ride', 'Tea plantation visit'],
    inclusions: ['Private transport', 'English-speaking driver', 'Accommodation (4 nights)', 'Breakfast daily', 'Entrance fees'],
    startingPrice: '$450 USD',
    difficulty: 'moderate',
    groupSize: '2-8 people',
    days: [
      {
        day: 1,
        title: 'Arrival & Cultural Triangle',
        description: 'Arrive at Colombo airport and transfer to the Cultural Triangle. En route, stop at the Pinnawala Elephant Orphanage (optional). Evening at leisure.',
        destinations: ['sigiriya'],
        activities: ['Airport pickup', 'Scenic drive', 'Elephant orphanage (optional)'],
        accommodation: 'Hotel near Sigiriya',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Sigiriya & Dambulla',
        description: 'Early morning climb of Sigiriya Rock Fortress (UNESCO). Afternoon visit to Dambulla Cave Temple with its impressive Buddha statues and frescoes.',
        destinations: ['sigiriya'],
        activities: ['Sigiriya Rock climb', 'Dambulla Cave Temple', 'Village walk'],
        accommodation: 'Hotel near Sigiriya',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 3,
        title: 'Kandy - Cultural Capital',
        description: 'Drive to Kandy via a spice garden. Visit the Temple of the Tooth Relic and enjoy a cultural dance performance in the evening.',
        destinations: ['kandy'],
        activities: ['Spice garden visit', 'Temple of the Tooth', 'Kandyan dance show'],
        accommodation: 'Hotel in Kandy',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 4,
        title: 'Train to Hill Country',
        description: 'Morning at Peradeniya Botanical Gardens. Take the scenic train to Nuwara Eliya or Ella (one of the world\'s most beautiful train journeys). Evening tea factory visit.',
        destinations: ['nuwara-eliya', 'ella'],
        activities: ['Botanical gardens', 'Scenic train ride', 'Tea factory tour'],
        accommodation: 'Hotel in hill country',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 5,
        title: 'Hill Country Exploration & Departure',
        description: 'Morning hike to Little Adam\'s Peak or Nine Arch Bridge. Transfer to Colombo airport for departure (or extend your trip to the beaches).',
        destinations: ['ella'],
        activities: ['Hiking', 'Photography', 'Airport transfer'],
        accommodation: 'None (end of tour)',
        meals: ['Breakfast'],
      },
    ],
  },
  {
    slug: '7-day-cultural-heritage',
    title: '7-Day Cultural Heritage Journey',
    shortDescription: 'Deep dive into Sri Lanka\'s Buddhist heritage, ancient kingdoms, and colonial history.',
    longContent: `
# 7-Day Cultural Heritage Journey

Immerse yourself in Sri Lanka's 2,500-year history on this comprehensive cultural tour. From ancient Buddhist capitals to colonial forts, this journey reveals the island's remarkable heritage.

## Tour Overview

This carefully paced 7-day itinerary explores Sri Lanka's UNESCO World Heritage Sites and cultural treasures, with expert guides bringing history to life.

## Key Experiences

- Explore three ancient capitals (Anuradhapura, Polonnaruwa, Kandy)
- Climb the iconic Sigiriya Rock Fortress
- Visit sacred Buddhist temples and shrines
- Walk the cobblestone streets of colonial Galle Fort
- Witness traditional ceremonies and dances

## Ideal For

- History and archaeology enthusiasts
- Buddhist pilgrimage travelers
- Architecture lovers
- Cultural immersion seekers
    `,
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52707b?q=80&w=2070&auto=format&fit=crop',
    duration: 7,
    type: 'cultural',
    tags: ['UNESCO', 'history', 'Buddhism', 'temples', 'archaeology'],
    highlights: ['Three ancient capitals', 'Sigiriya Rock', 'Temple of the Tooth', 'Galle Fort', 'Buddhist heritage'],
    inclusions: ['Private transport', 'Expert local guides', 'Accommodation (6 nights)', 'Daily breakfast', 'All entrance fees', 'Cultural performances'],
    startingPrice: '$750 USD',
    difficulty: 'moderate',
    groupSize: '2-6 people',
    days: [
      {
        day: 1,
        title: 'Arrival in Negombo',
        description: 'Arrive and transfer to Negombo. Evening visit to Dutch Fort area and beach. Briefing dinner.',
        destinations: [],
        activities: ['Airport transfer', 'Negombo exploration', 'Welcome dinner'],
        accommodation: 'Beach hotel in Negombo',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Anuradhapura Sacred City',
        description: 'Full day exploring the ancient capital. Visit Sri Maha Bodhi, Ruwanwelisaya, and Jetavanaramaya stupas.',
        destinations: ['anuradhapura'],
        activities: ['Sacred Bodhi Tree', 'Ancient stupas', 'Isurumuniya temple'],
        accommodation: 'Heritage hotel in Anuradhapura',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 3,
        title: 'Polonnaruwa Medieval Capital',
        description: 'Explore the medieval capital by bicycle. Visit the Gal Vihara Buddha statues and Royal Palace complex.',
        destinations: ['polonnaruwa'],
        activities: ['Bicycle tour', 'Gal Vihara', 'Royal Palace', 'Quadrangle'],
        accommodation: 'Hotel near Cultural Triangle',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 4,
        title: 'Sigiriya & Dambulla',
        description: 'Morning climb of Sigiriya Rock. Afternoon explore Dambulla Cave Temple with its ancient murals.',
        destinations: ['sigiriya'],
        activities: ['Sigiriya climb', 'Dambulla caves', 'Village experience'],
        accommodation: 'Boutique hotel near Sigiriya',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 5,
        title: 'Kandy - Sacred City',
        description: 'Drive to Kandy. Visit the Temple of the Tooth, Kandy Lake, and evening cultural dance performance.',
        destinations: ['kandy'],
        activities: ['Temple of the Tooth', 'City walk', 'Cultural show'],
        accommodation: 'Colonial-era hotel in Kandy',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 6,
        title: 'Train to Galle',
        description: 'Scenic coastal train to Galle. Afternoon exploring the UNESCO-listed Dutch Fort.',
        destinations: ['galle'],
        activities: ['Coastal train journey', 'Fort walk', 'Sunset on ramparts'],
        accommodation: 'Boutique hotel in Galle Fort',
        meals: ['Breakfast'],
      },
      {
        day: 7,
        title: 'Galle & Departure',
        description: 'Morning exploring Galle\'s museums and boutiques. Transfer to Colombo airport.',
        destinations: ['galle'],
        activities: ['Maritime Museum', 'Shopping', 'Airport transfer'],
        accommodation: 'None (end of tour)',
        meals: ['Breakfast'],
      },
    ],
  },
  {
    slug: '10-day-ultimate-sri-lanka',
    title: '10-Day Ultimate Sri Lanka',
    shortDescription: 'The complete Sri Lanka experience: culture, wildlife, beaches, and adventure.',
    longContent: `
# 10-Day Ultimate Sri Lanka Experience

This comprehensive 10-day journey covers all of Sri Lanka's highlights—ancient temples, misty mountains, wildlife safaris, and tropical beaches. The ultimate introduction to the Pearl of the Indian Ocean.

## Tour Overview

From the ancient Cultural Triangle to the southern beaches, experience the incredible diversity that makes Sri Lanka a world-class destination.

## Highlights

- UNESCO World Heritage sites
- Leopard safari at Yala National Park
- Scenic train through tea country
- Whale watching (seasonal)
- Beach relaxation
- Authentic local experiences

## Ideal For

- Travelers wanting a complete Sri Lanka overview
- Active travelers who enjoy variety
- Couples and families
- Photography enthusiasts
    `,
    heroImage: 'https://images.unsplash.com/photo-1586183189334-24023e26b6e9?q=80&w=2070&auto=format&fit=crop',
    duration: 10,
    type: 'highlights',
    tags: ['comprehensive', 'wildlife', 'culture', 'beach', 'adventure'],
    highlights: ['Sigiriya & Cultural Triangle', 'Leopard safari at Yala', 'Scenic train ride', 'Whale watching', 'Beach time', 'Ceylon tea experience'],
    inclusions: ['Private transport', 'Experienced driver-guide', '9 nights accommodation', 'Daily breakfast', 'All entrance fees', 'Yala safari', 'Train tickets'],
    startingPrice: '$1,200 USD',
    difficulty: 'moderate',
    groupSize: '2-8 people',
    days: [
      { day: 1, title: 'Arrival & Negombo', description: 'Airport pickup, Negombo beach and Dutch canals.', destinations: [], activities: ['Transfer', 'Beach walk'], accommodation: 'Negombo hotel', meals: ['Dinner'] },
      { day: 2, title: 'Sigiriya Rock Fortress', description: 'Drive to Sigiriya, afternoon climb of the rock.', destinations: ['sigiriya'], activities: ['Sigiriya climb', 'Village walk'], accommodation: 'Sigiriya hotel', meals: ['Breakfast', 'Dinner'] },
      { day: 3, title: 'Polonnaruwa & Safari', description: 'Morning at Polonnaruwa, afternoon Minneriya elephant safari.', destinations: ['polonnaruwa'], activities: ['Polonnaruwa by bike', 'Elephant safari'], accommodation: 'Sigiriya hotel', meals: ['Breakfast', 'Dinner'] },
      { day: 4, title: 'Kandy', description: 'Drive to Kandy via Dambulla. Temple of the Tooth, evening dance show.', destinations: ['kandy'], activities: ['Dambulla caves', 'Temple of Tooth', 'Dance show'], accommodation: 'Kandy hotel', meals: ['Breakfast', 'Dinner'] },
      { day: 5, title: 'Train to Ella', description: 'Scenic train journey through tea country. Afternoon at leisure.', destinations: ['ella'], activities: ['Train journey', 'Tea factory visit'], accommodation: 'Ella guesthouse', meals: ['Breakfast'] },
      { day: 6, title: 'Ella Exploration', description: 'Nine Arch Bridge at sunrise, Little Adam\'s Peak hike.', destinations: ['ella'], activities: ['Nine Arch Bridge', 'Hiking', 'Ravana Falls'], accommodation: 'Ella guesthouse', meals: ['Breakfast'] },
      { day: 7, title: 'Yala National Park', description: 'Drive to Yala, afternoon leopard safari.', destinations: ['yala-national-park'], activities: ['Safari', 'Wildlife spotting'], accommodation: 'Yala lodge', meals: ['Breakfast', 'Dinner'] },
      { day: 8, title: 'Morning Safari & Mirissa', description: 'Early safari, drive to Mirissa beach.', destinations: ['mirissa'], activities: ['Morning safari', 'Beach relaxation'], accommodation: 'Beach hotel', meals: ['Breakfast'] },
      { day: 9, title: 'Whale Watching & Galle', description: 'Morning whale watching (seasonal), afternoon Galle Fort.', destinations: ['galle', 'mirissa'], activities: ['Whale watching', 'Galle Fort walk'], accommodation: 'Galle Fort hotel', meals: ['Breakfast'] },
      { day: 10, title: 'Departure', description: 'Morning at leisure, transfer to Colombo airport.', destinations: ['galle'], activities: ['Shopping', 'Airport transfer'], accommodation: 'End of tour', meals: ['Breakfast'] },
    ],
  },
  {
    slug: 'budget-backpacker',
    title: '14-Day Budget Backpacker Trail',
    shortDescription: 'Maximum Sri Lanka on a minimum budget—hostels, trains, and authentic local experiences.',
    longContent: `
# 14-Day Budget Backpacker Trail

Experience the real Sri Lanka without breaking the bank. This budget-conscious itinerary maximizes experiences while minimizing costs through smart accommodation choices, local transport, and authentic dining.

## Tour Overview

This self-guided route takes in major highlights and hidden gems, using Sri Lanka's affordable train network and local guesthouses.

## Budget-Saving Tips

- Travel by train (book 2nd class observation)
- Stay in guesthouses and hostels
- Eat at local "rice & curry" restaurants
- Skip expensive tours—explore independently
- Share tuk-tuks with fellow travelers

## Estimated Budget

$30-50 USD per day including accommodation, food, transport, and activities.
    `,
    heroImage: 'https://images.unsplash.com/photo-1590123573398-04e31805df3b?q=80&w=2070&auto=format&fit=crop',
    duration: 14,
    type: 'budget',
    tags: ['budget', 'backpacker', 'independent', 'trains', 'hostels'],
    highlights: ['Train journeys', 'Budget temples visits', 'Local food experiences', 'Beach time', 'Hiking', 'Surfing'],
    inclusions: ['Suggested guesthouse list', 'Transport guide', 'Daily budget breakdown', 'Local tips'],
    startingPrice: '$30/day USD',
    difficulty: 'moderate',
    groupSize: 'Solo or small groups',
    days: [
      { day: 1, title: 'Colombo', description: 'Explore Fort district, Gangaramaya Temple, street food.', destinations: [], activities: ['City walk', 'Temple visit', 'Street food'], accommodation: 'Hostel in Colombo', meals: [] },
      { day: 2, title: 'Train to Kandy', description: 'Morning train to Kandy, Temple of the Tooth, night market.', destinations: ['kandy'], activities: ['Temple visit', 'City walk'], accommodation: 'Guesthouse', meals: [] },
      { day: 3, title: 'Kandy', description: 'Botanical Gardens, local cooking class, cultural show (free entry).', destinations: ['kandy'], activities: ['Gardens', 'Cooking class'], accommodation: 'Guesthouse', meals: [] },
      { day: 4, title: 'Bus to Dambulla/Sigiriya', description: 'Dambulla Cave Temple (cheap entry), sunset at Pidurangala Rock.', destinations: ['sigiriya'], activities: ['Cave temple', 'Pidurangala hike'], accommodation: 'Budget hotel', meals: [] },
      { day: 5, title: 'Sigiriya Area', description: 'Village walk, paddy fields, optional Sigiriya climb.', destinations: ['sigiriya'], activities: ['Village experience', 'Cycling'], accommodation: 'Budget hotel', meals: [] },
      { day: 6, title: 'Polonnaruwa', description: 'Rent a bicycle, explore ancient ruins all day.', destinations: ['polonnaruwa'], activities: ['Archaeological site'], accommodation: 'Guesthouse', meals: [] },
      { day: 7, title: 'Train to Ella', description: 'Epic train journey through tea country.', destinations: ['ella'], activities: ['Scenic train'], accommodation: 'Hostel', meals: [] },
      { day: 8, title: 'Ella', description: 'Nine Arch Bridge sunrise, Little Adam\'s Peak hike.', destinations: ['ella'], activities: ['Hiking', 'Photography'], accommodation: 'Hostel', meals: [] },
      { day: 9, title: 'Ella', description: 'Ella Rock hike, waterfalls, cafe culture.', destinations: ['ella'], activities: ['Hiking', 'Ravana Falls'], accommodation: 'Hostel', meals: [] },
      { day: 10, title: 'Bus to Arugam Bay', description: 'Long bus journey to the east coast surf town.', destinations: ['arugam-bay'], activities: ['Travel', 'Beach'], accommodation: 'Beach hut', meals: [] },
      { day: 11, title: 'Arugam Bay', description: 'Surf lessons, beach, lagoon safari (budget option).', destinations: ['arugam-bay'], activities: ['Surfing', 'Beach'], accommodation: 'Beach hut', meals: [] },
      { day: 12, title: 'Bus to South Coast', description: 'Travel to Mirissa via east-south route.', destinations: ['mirissa'], activities: ['Travel', 'Beach'], accommodation: 'Hostel', meals: [] },
      { day: 13, title: 'Mirissa & Galle', description: 'Beach morning, afternoon in Galle Fort (free entry).', destinations: ['mirissa', 'galle'], activities: ['Beach', 'Fort walk'], accommodation: 'Hostel in Galle', meals: [] },
      { day: 14, title: 'Departure', description: 'Train or bus to Colombo airport.', destinations: [], activities: ['Transfer'], accommodation: 'End', meals: [] },
    ],
  },
  {
    slug: 'luxury-wellness-retreat',
    title: '8-Day Luxury Wellness Retreat',
    shortDescription: 'Five-star accommodations, private experiences, spa treatments, and Ayurvedic wellness.',
    longContent: `
# 8-Day Luxury Wellness Retreat

Indulge in Sri Lanka's finest with this curated luxury experience. From boutique heritage hotels to world-class wellness retreats, this tour offers the pinnacle of comfort and relaxation.

## Tour Overview

Experience Sri Lanka in style with private guides, chauffeur-driven vehicles, and handpicked luxury accommodations. This wellness-focused itinerary includes Ayurvedic treatments, yoga, and mindful experiences.

## Luxury Elements

- 5-star boutique hotels and resorts
- Private expert guides
- Spa and Ayurveda treatments included
- Gourmet dining experiences
- Personalized itinerary adjustments
- Luxury vehicle with refreshments

## Wellness Focus

- Daily yoga sessions (optional)
- Ayurvedic consultation
- Spa treatments at each destination
- Healthy gourmet cuisine
- Meditation experiences
    `,
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
    duration: 8,
    type: 'luxury',
    tags: ['luxury', 'wellness', 'spa', 'ayurveda', 'boutique hotels'],
    highlights: ['5-star accommodations', 'Ayurvedic spa treatments', 'Private experiences', 'Gourmet dining', 'Yoga and meditation'],
    inclusions: ['Luxury transport', 'Private guides', '7 nights 5-star hotels', 'All meals', 'Spa treatments', 'All activities', 'Domestic flights where applicable'],
    startingPrice: '$3,500 USD',
    difficulty: 'easy',
    groupSize: '2-4 people',
    days: [
      { day: 1, title: 'Arrival - Luxury Colombo', description: 'VIP airport arrival, transfer to 5-star hotel, welcome spa treatment.', destinations: [], activities: ['VIP arrival', 'Spa treatment'], accommodation: 'Shangri-La or equivalent', meals: ['Dinner'] },
      { day: 2, title: 'Sigiriya - Heritage Luxury', description: 'Private helicopter or luxury transfer to Sigiriya. Private guided sunrise tour.', destinations: ['sigiriya'], activities: ['Private Sigiriya tour', 'Ayurveda consultation'], accommodation: 'Water Garden Sigiriya', meals: ['All meals'] },
      { day: 3, title: 'Cultural Triangle', description: 'Private Polonnaruwa tour, afternoon spa and pool.', destinations: ['polonnaruwa'], activities: ['Private tour', 'Spa'], accommodation: 'Water Garden Sigiriya', meals: ['All meals'] },
      { day: 4, title: 'Kandy - Temple & Wellness', description: 'Private Temple of Tooth visit, evening at luxury wellness resort.', destinations: ['kandy'], activities: ['Temple visit', 'Wellness check-in'], accommodation: 'Kandy House', meals: ['All meals'] },
      { day: 5, title: 'Hill Country Wellness', description: 'Scenic drive to tea country. Full day Ayurvedic treatments.', destinations: ['nuwara-eliya'], activities: ['Ayurveda treatments', 'Yoga'], accommodation: 'Ceylon Tea Trails', meals: ['All meals'] },
      { day: 6, title: 'Tea Trails Experience', description: 'Private tea estate tour, spa, afternoon tea ceremony.', destinations: ['nuwara-eliya'], activities: ['Tea experience', 'Spa', 'Nature walk'], accommodation: 'Ceylon Tea Trails', meals: ['All meals'] },
      { day: 7, title: 'Beach Luxury - Galle', description: 'Transfer to exclusive beach resort. Sunset spa treatment.', destinations: ['galle'], activities: ['Beach', 'Fine dining', 'Spa'], accommodation: 'Amangalla or equivalent', meals: ['All meals'] },
      { day: 8, title: 'Departure', description: 'Morning yoga, leisurely breakfast, VIP airport transfer.', destinations: [], activities: ['Yoga', 'VIP departure'], accommodation: 'End', meals: ['Breakfast'] },
    ],
  },
  {
    slug: 'surf-adventure',
    title: '10-Day Surf & Adventure Tour',
    shortDescription: 'Chase waves and thrills across Sri Lanka\'s best surf breaks and adventure sports.',
    longContent: `
# 10-Day Surf & Adventure Tour

Ride the waves at Sri Lanka's legendary surf breaks and experience the island's adventure side. From beginner-friendly beach breaks to world-class point breaks, this tour is designed for wave hunters.

## Tour Overview

This adventure-focused itinerary covers the best surf spots on both coasts (depending on season), plus hiking, wildlife, and water sports.

## Surf Spots Covered

- Arugam Bay (East Coast, April-September)
- Weligama (South Coast, November-April)
- Hiriketiya (South Coast, year-round)
- Secret spots with local guides

## Adventure Activities

- Surfing (lessons available)
- White water rafting
- Hiking
- Kitesurfing
- Snorkeling
- Wildlife safari
    `,
    heroImage: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=2070&auto=format&fit=crop',
    duration: 10,
    type: 'adventure',
    tags: ['surfing', 'adventure', 'active', 'beach', 'water sports'],
    highlights: ['Multiple surf breaks', 'Surf lessons', 'White water rafting', 'Wildlife safari', 'Beach camping (optional)'],
    inclusions: ['Transport', 'Surf-friendly accommodation', 'Board rental', 'Lessons (optional)', 'Rafting trip', 'Safari'],
    startingPrice: '$900 USD',
    difficulty: 'challenging',
    groupSize: '4-10 people',
    days: [
      { day: 1, title: 'Arrival - Surf Camp', description: 'Arrive and transfer to Weligama/Arugam Bay surf camp.', destinations: ['arugam-bay'], activities: ['Transfer', 'Beach check'], accommodation: 'Surf camp', meals: ['Dinner'] },
      { day: 2, title: 'Surf Day 1', description: 'Morning surf session, technique lessons. Afternoon relaxed session.', destinations: ['arugam-bay'], activities: ['2x surf sessions'], accommodation: 'Surf camp', meals: ['Breakfast'] },
      { day: 3, title: 'Surf Day 2', description: 'Explore different breaks with local guide.', destinations: ['arugam-bay'], activities: ['Surf exploration'], accommodation: 'Surf camp', meals: ['Breakfast'] },
      { day: 4, title: 'Wildlife & Surf', description: 'Morning lagoon safari, afternoon surf.', destinations: ['arugam-bay'], activities: ['Safari', 'Surf'], accommodation: 'Surf camp', meals: ['Breakfast'] },
      { day: 5, title: 'Hill Country Adventure', description: 'Drive to Ella for hiking and rafting.', destinations: ['ella'], activities: ['Travel', 'Evening chill'], accommodation: 'Hostel', meals: ['Breakfast'] },
      { day: 6, title: 'Hiking & Rafting', description: 'Morning hike, afternoon white water rafting.', destinations: ['ella'], activities: ['Hiking', 'Rafting'], accommodation: 'Hostel', meals: ['Breakfast'] },
      { day: 7, title: 'South Coast', description: 'Travel to Hiriketiya for uncrowded surf.', destinations: ['mirissa'], activities: ['Travel', 'Evening surf'], accommodation: 'Beach hut', meals: ['Breakfast'] },
      { day: 8, title: 'Hiriketiya Sessions', description: 'All-day surf at this beautiful bay.', destinations: ['mirissa'], activities: ['Surfing'], accommodation: 'Beach hut', meals: ['Breakfast'] },
      { day: 9, title: 'Mirissa & Weligama', description: 'Morning surf, afternoon whale watching (seasonal).', destinations: ['mirissa'], activities: ['Surf', 'Whale watching'], accommodation: 'Beach hotel', meals: ['Breakfast'] },
      { day: 10, title: 'Final Surf & Departure', description: 'Dawn patrol surf session, transfer to airport.', destinations: [], activities: ['Final surf', 'Transfer'], accommodation: 'End', meals: ['Breakfast'] },
    ],
  },
];

export function getItineraryBySlug(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}

export function getItinerariesByType(type: Itinerary['type']): Itinerary[] {
  return itineraries.filter((i) => i.type === type);
}

export function getItinerariesByDuration(minDays: number, maxDays: number): Itinerary[] {
  return itineraries.filter((i) => i.duration >= minDays && i.duration <= maxDays);
}
