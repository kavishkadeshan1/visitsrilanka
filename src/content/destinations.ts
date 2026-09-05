// Destination content data for Visit Sri Lanka

export interface Destination {
  slug: string;
  title: string;
  shortDescription: string;
  longContent: string;
  heroImage: string;
  galleryImages: string[];
  tags: string[];
  region: 'south-coast' | 'cultural-triangle' | 'hill-country' | 'east-coast' | 'west-coast' | 'north';
  recommendedDays: number;
  highlights: string[];
  bestTimeToVisit: string;
  coordinates: { lat: number; lng: number };
}

export const regions = {
  'south-coast': { name: 'South Coast', description: 'Golden beaches, whale watching, and coastal charm' },
  'cultural-triangle': { name: 'Cultural Triangle', description: 'Ancient cities, temples, and UNESCO heritage' },
  'hill-country': { name: 'Hill Country', description: 'Tea plantations, misty mountains, and scenic trains' },
  'east-coast': { name: 'East Coast', description: 'Pristine beaches, surfing, and untouched beauty' },
  'west-coast': { name: 'West Coast', description: 'Beach resorts, diving spots, and sunset views' },
  'north': { name: 'Northern Province', description: 'Ancient temples, islands, and emerging tourism' },
} as const;

export const destinations: Destination[] = [
  {
    slug: 'thalaramba-beach',
    title: 'Thalaramba Beach',
    shortDescription: 'A serene and secluded beach featuring shallow rock pools, golden sands, and stunning sunsets away from the crowds.',
    longContent: `
# Thalaramba Beach

Tucked away on the southern coast of Sri Lanka, just a stone's throw from the bustling Mirissa, lies the tranquil and pristine Thalaramba Beach. Known for its secluded vibe, this hidden gem is perfect for travelers looking to escape the crowds and enjoy nature at its finest.

## What to Expect

Unlike the more commercial beaches nearby, Thalaramba offers a peaceful retreat. The natural coral reef barrier creates calm, shallow rock pools that are ideal for swimming, wading, and relaxing, making it very safe for families and children.

## Key Highlights

### Natural Rock Pools
The calm, crystal-clear waters trapped by the reef are perfect for a refreshing dip without the worry of strong currents.

### Breathtaking Sunsets
With its west-facing orientation, Thalaramba provides some of the most spectacular sunset views on the southern coast.

### Peaceful Atmosphere
Enjoy a quiet walk along the golden sands, listen to the gentle sound of the waves, and experience true relaxation away from the tourist hubs.

## Practical Tips

- **Getting There:** Just a short tuk-tuk ride from Mirissa or Matara.
- **Best Time to Visit:** The dry season from November to April offers the best beach weather.
- **Facilities:** It remains relatively untouched, so bring your own snacks, water, and snorkeling gear.
    `,
    heroImage: 'https://thesurfatlas.com/wp-content/uploads/2025/10/Walking-towards-Thalaramba-Beach.jpg',
    galleryImages: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmN_M6lpAzXtSyBuHlAEY9LfiP1fTZmcIE26saS7upqQ_jt_NPCaWBwkJ86xp60kNWBrLk-vQPS50D7wmgCOSLY8xJ1G8DvMfNnYluP87tD097ADrX7mZ7vXmSlXjrXIQBjS9ftlpJD6dyHm=s3056-w3056-h1396-rw',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmP7X5vcm7fneoSOd-w5PTJ3rVia5YLB4zPeRcan7AJzCgvAX3_YzEDg99XbKrJ7faa5AAftSLuJg5ZJHc8ex5nDvD5JtPRaMuPymdEYWM86LmDQzPglFCy1_b2Uaz-a9DhIcCpePKK4FB-X=s3056-w3056-h1396-rw',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmMpg3j1Kd8Fmoi-cZEqyQp__jNxxjn0xwwKIJPHYzxdAT_aTTG6TGec5IgLS9LM0IZ3iwFS8MZNcFhbiae7NFZZmVdJeBgfuPrl4UXeCaeFx7gSbhKmsp1WhsJV7mR5IfK8FIJ_=s3056-w3056-h1396-rw',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmNnBa6ugNYuQMUGCQIZIhNe7T-S-NdlqcNgxp3GtQI1jHQadY0bmLVwk1Rhlc8FINfkE5ypVYcxuH7onRfxVklHBz5wr5k5BnBQ-JlGwJk41jhMYdn7_hDMmsCrNwiDuAzTZoWoEQ=s3056-w3056-h1396-rw'
    ],
    tags: ['beach', 'nature', 'relaxation', 'sunset', 'hidden gem'],
    region: 'south-coast',
    recommendedDays: 1,
    highlights: ['Natural rock pools', 'Secluded golden sands', 'Sunset views', 'Safe swimming'],
    bestTimeToVisit: 'November to April (dry season)',
    coordinates: { lat: 5.942, lng: 80.468 },
  },
  {
    slug: 'sigiriya',
    title: 'Sigiriya Rock Fortress',
    shortDescription: 'Ancient rock fortress rising 200m above the jungle, featuring stunning frescoes and landscaped gardens.',
    longContent: `
# Sigiriya Rock Fortress

Sigiriya, also known as Lion Rock, is one of Sri Lanka's most iconic landmarks and a UNESCO World Heritage Site. This ancient rock fortress rises dramatically 200 meters above the surrounding jungle, offering visitors a glimpse into the island's rich history and architectural genius.

## History

Built in the 5th century AD by King Kashyapa, Sigiriya served as both a royal palace and a fortress. The king chose this massive rock as his capital, transforming it into an elaborate complex complete with gardens, pools, and the famous frescoes of the Sigiriya Maidens.

## What to See

### The Mirror Wall
A polished wall that once reflected images, now covered with ancient graffiti dating back to the 8th century.

### Sigiriya Frescoes
Beautiful paintings of celestial maidens, considered masterpieces of ancient art. About 19 of the original 500 frescoes remain visible today.

### Lion's Paw Entrance
The massive lion paws carved in stone mark the final ascent to the summit, remnants of a giant lion sculpture that once guarded the palace.

### Summit Gardens
At the top, explore the ruins of the ancient palace with its throne, cisterns, and gardens, while enjoying 360-degree views of the countryside.

## Practical Tips

- Start early (open from 7 AM) to avoid the heat and crowds
- The climb takes about 1.5-2 hours with stops
- Bring plenty of water and wear comfortable shoes
- Beware of aggressive monkeys and wasps near the summit
- The site is partially accessible but involves significant climbing

## Nearby Attractions

- Pidurangala Rock (alternative viewpoint of Sigiriya)
- Dambulla Cave Temple (30 minutes away)
- Minneriya National Park (elephant gathering spot)
    `,
    heroImage: 'https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1588598198321-2e67b72c7e85?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
    tags: ['UNESCO', 'history', 'hiking', 'photography', 'ancient ruins'],
    region: 'cultural-triangle',
    recommendedDays: 1,
    highlights: ['Ancient rock fortress', 'Sigiriya Frescoes', 'Panoramic views', 'Lion paw entrance'],
    bestTimeToVisit: 'January to April (dry season)',
    coordinates: { lat: 7.957, lng: 80.7603 },
  },
  {
    slug: 'galle',
    title: 'Galle Fort',
    shortDescription: 'A UNESCO-listed Dutch colonial fort with cobblestone streets, boutique shops, and ocean views.',
    longContent: `
# Galle Fort

Galle Fort is a stunning example of colonial architecture, blending Portuguese, Dutch, and British influences within its ancient walls. This UNESCO World Heritage Site is not just a historical monument but a living, breathing town filled with boutique hotels, cafes, art galleries, and charming streets.

## History

Originally built by the Portuguese in 1588, the fort was extensively fortified by the Dutch in the 17th century. It served as an important trading post and remains one of the best-preserved sea forts in South Asia.

## What to See

### The Ramparts
Walk along the historic walls at sunset for spectacular views of the Indian Ocean. The lighthouse at the southeastern tip offers iconic photo opportunities.

### Dutch Reformed Church
Built in 1755, this beautiful church features colonial-era tombstones and period architecture.

### National Maritime Museum
Learn about Sri Lanka's maritime history, seafaring traditions, and the underwater archaeology of the region.

### Boutique Shopping
Explore unique shops selling local crafts, jewelry, antiques, and contemporary Sri Lankan fashion.

## Dining & Accommodation

Galle Fort offers some of Sri Lanka's finest dining experiences, from rooftop restaurants to intimate cafes. Boutique hotels within the fort walls provide a unique stay in heritage buildings.

## Practical Tips

- The fort is best explored on foot
- Visit early morning or late afternoon for photography
- Many shops close for siesta (1-4 PM)
- The annual Galle Literary Festival (January) is a major cultural event
    `,
    heroImage: 'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
    tags: ['UNESCO', 'colonial', 'beach', 'shopping', 'architecture'],
    region: 'south-coast',
    recommendedDays: 2,
    highlights: ['Dutch colonial architecture', 'Sunset rampart walk', 'Boutique shopping', 'Cafe culture'],
    bestTimeToVisit: 'November to April (dry season)',
    coordinates: { lat: 6.0367, lng: 80.217 },
  },
  {
    slug: 'ella',
    title: 'Ella',
    shortDescription: 'A charming hill town with epic hiking trails, the famous Nine Arch Bridge, and stunning valley views.',
    longContent: `
# Ella

Nestled in the heart of Sri Lanka's hill country, Ella is a paradise for hikers, photographers, and anyone seeking cooler temperatures and breathtaking scenery. This small town has become one of the island's most popular destinations, known for its laid-back atmosphere and stunning natural beauty.

## What to See & Do

### Little Adam's Peak
A relatively easy 45-minute hike offering panoramic views of the Ella Gap and surrounding tea plantations. Perfect for sunrise or sunset.

### Ella Rock
A more challenging 4-hour round trip hike through tea estates and forest to reach spectacular viewpoints over the valley.

### Nine Arch Bridge
This iconic British-era railway bridge is an engineering marvel set against lush jungle. Watch trains pass across the arches for incredible photos.

### Ravana Falls
A beautiful 25-meter waterfall just outside town, named after the legendary king from the Ramayana epic.

### Train Journey to Ella
The scenic train ride from Kandy to Ella is considered one of the most beautiful train journeys in the world.

## Tea Country

Visit working tea factories to learn about Ceylon tea production and sample fresh brews surrounded by endless green plantations.

## Practical Tips

- Book train tickets well in advance (especially 2nd class observation)
- Best weather: January to March
- Bring layers—evenings can be cool
- The town is small and walkable
- Many cafes offer free WiFi and excellent coffee
    `,
    heroImage: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=2128&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1588598198321-2e67b72c7e85?w=800&q=80',
      'https://images.unsplash.com/photo-1546708761-fa44c1534f19?w=800&q=80',
    ],
    tags: ['hiking', 'nature', 'trains', 'photography', 'tea plantations'],
    region: 'hill-country',
    recommendedDays: 3,
    highlights: ['Nine Arch Bridge', 'Little Adam\'s Peak', 'Scenic train journey', 'Tea plantations'],
    bestTimeToVisit: 'January to March (least rainfall)',
    coordinates: { lat: 6.8667, lng: 81.0466 },
  },
  {
    slug: 'kandy',
    title: 'Kandy',
    shortDescription: 'The cultural capital of Sri Lanka, home to the sacred Temple of the Tooth Relic.',
    longContent: `
# Kandy

Kandy, the last royal capital of Sri Lanka, is a city steeped in history, religion, and natural beauty. Set around a picturesque lake and surrounded by lush hills, this UNESCO World Heritage city is the cultural heart of the island.

## What to See

### Temple of the Sacred Tooth Relic
Sri Lanka's most important Buddhist temple, housing a tooth relic of the Buddha. The temple complex features stunning architecture, a museum, and daily puja ceremonies.

### Kandy Lake
A serene artificial lake in the heart of the city, perfect for evening strolls. The Ulpange (island) in the center once housed the king's harem.

### Royal Botanical Gardens, Peradeniya
One of the finest botanical gardens in Asia, featuring a stunning orchid house, spice garden, and the famous Avenue of Royal Palms.

### Kandy Cultural Show
Evening performances showcase traditional Kandyan dance, fire walking, and drum performances.

## Esala Perahera

The Kandy Esala Perahera (July/August) is one of Asia's most spectacular festivals, featuring elaborately decorated elephants, traditional dancers, and the sacred tooth relic.

## Practical Tips

- Dress modestly when visiting the Temple (covered shoulders and knees)
- The Cultural Show starts at 5 PM daily
- Train journeys to/from Kandy offer beautiful scenery
- Book festival accommodation months in advance
    `,
    heroImage: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
    ],
    tags: ['UNESCO', 'temples', 'culture', 'festivals', 'history'],
    region: 'hill-country',
    recommendedDays: 2,
    highlights: ['Temple of the Tooth', 'Esala Perahera festival', 'Botanical Gardens', 'Kandyan dance'],
    bestTimeToVisit: 'July-August for Esala Perahera',
    coordinates: { lat: 7.2906, lng: 80.6337 },
  },
  {
    slug: 'mirissa',
    title: 'Mirissa',
    shortDescription: 'A palm-fringed beach paradise and the best whale watching destination in Sri Lanka.',
    longContent: `
# Mirissa

Mirissa is the quintessential Sri Lankan beach destination—a crescent of golden sand lined with coconut palms, where you can watch whales in the morning and sunsets from beachfront bars in the evening.

## Beach Life

Mirissa Beach offers the perfect blend of relaxation and activity. The main beach is great for swimming, while the rocky headland (Parrot Rock) provides excellent snorkeling opportunities.

## Whale Watching

From November to April, Mirissa is the top spot in South Asia for whale watching. Blue whales, sperm whales, and dolphins are regularly spotted just a few kilometers offshore.

### Tips for Whale Watching
- Book with a reputable operator committed to responsible practices
- Tours depart early (6 AM) and last 4-5 hours
- Take seasickness medication if needed
- Sightings aren't guaranteed but success rates are high

## Secret Beach & Coconut Tree Hill

### Secret Beach
A hidden cove accessible by a short walk, perfect for a quieter experience.

### Coconut Tree Hill
An Instagram-famous cluster of palm trees on a cliff, offering stunning sunset views.

## Dining & Nightlife

Mirissa has a vibrant beach bar scene and excellent seafood restaurants. Don't miss fresh catch grilled right on the beach.

## Practical Tips

- Peak season: November to April
- Avoid visiting on poya (full moon) days when alcohol sales are restricted
- Budget accommodations line the beach; boutique hotels are on the hillside
    `,
    heroImage: 'https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=1974&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    ],
    tags: ['beach', 'whale watching', 'surfing', 'nightlife', 'relaxation'],
    region: 'south-coast',
    recommendedDays: 3,
    highlights: ['Blue whale watching', 'Palm-fringed beaches', 'Coconut Tree Hill', 'Beach nightlife'],
    bestTimeToVisit: 'November to April (whale season)',
    coordinates: { lat: 5.9485, lng: 80.4718 },
  },
  {
    slug: 'yala-national-park',
    title: 'Yala National Park',
    shortDescription: 'Sri Lanka\'s premier wildlife park, boasting the highest leopard density in the world.',
    longContent: `
# Yala National Park

Yala is Sri Lanka's most visited national park and for good reason—it offers some of the best wildlife viewing in Asia. The park is renowned for having the highest density of leopards in the world.

## Wildlife

### Leopards
Yala's star attraction. The park's open terrain makes leopard sightings more common here than almost anywhere else in the world.

### Elephants
Large herds, especially around the water holes during dry season (May-September).

### Other Wildlife
- Sloth bears
- Crocodiles
- Wild boar
- Spotted deer
- Over 200 bird species

## Safari Experience

### Best Time
Early morning (5:30 AM) and late afternoon (3 PM) safaris offer the best wildlife viewing and photography light.

### Zones
Block 1 is the most wildlife-rich but also the busiest. Blocks 2-5 offer quieter experiences.

## Practical Tips

- Book jeep safaris through reputable operators
- The park closes during September (dry season break)
- Bring binoculars and a telephoto lens
- Wear neutral colors and bring sun protection
- Full-day safaris maximize your chances of leopard sightings
    `,
    heroImage: 'https://images.unsplash.com/photo-1603789764099-52b21a871336?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    tags: ['wildlife', 'safari', 'leopards', 'elephants', 'nature'],
    region: 'south-coast',
    recommendedDays: 2,
    highlights: ['Leopard spotting', 'Elephant herds', 'Bird watching', 'Scenic landscapes'],
    bestTimeToVisit: 'February to July (dry season)',
    coordinates: { lat: 6.3796, lng: 81.5188 },
  },
  {
    slug: 'nuwara-eliya',
    title: 'Nuwara Eliya',
    shortDescription: 'The "Little England" of Sri Lanka, a cool hill station surrounded by tea plantations.',
    longContent: `
# Nuwara Eliya

Known as "Little England," Nuwara Eliya is a charming hill station that feels transplanted from the British countryside. At 1,868 meters elevation, it offers a cool escape from the tropical heat and some of Sri Lanka's finest tea country.

## Colonial Heritage

### Architecture
Tudor-style buildings, a colonial-era post office, and the Grand Hotel evoke the town's British past.

### Golf Course
One of Asia's oldest golf courses, offering a unique highland golfing experience.

### Victoria Park
English-style gardens perfect for a leisurely stroll.

## Tea Country

The surrounding hills are covered in emerald tea plantations. Visit working factories like:
- Pedro Tea Estate
- Blue Field Tea Gardens
- Mackwoods Labookellie

## Scenic Attractions

### Horton Plains National Park
A UNESCO World Heritage Site featuring World's End, a 880-meter cliff with stunning views, and Baker's Falls.

### Gregory Lake
A scenic lake offering boating, jet skiing, and lakeside walks.

### Hakgala Botanical Gardens
Beautiful gardens specializing in temperate plants.

## Practical Tips

- Pack warm layers—temperatures can drop to 10°C at night
- April is festive with the Sinhala New Year celebrations
- Horton Plains should be visited early (before the mist rolls in around 10 AM)
    `,
    heroImage: 'https://images.unsplash.com/photo-1544451822-38e32b887c08?q=80&w=1974&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1588598198321-2e67b72c7e85?w=800&q=80',
    ],
    tags: ['tea plantations', 'hill station', 'colonial', 'nature', 'cool climate'],
    region: 'hill-country',
    recommendedDays: 2,
    highlights: ['Tea factory tours', 'Horton Plains', 'Colonial architecture', 'Cool climate'],
    bestTimeToVisit: 'January to April',
    coordinates: { lat: 6.9497, lng: 80.7891 },
  },
  {
    slug: 'trincomalee',
    title: 'Trincomalee',
    shortDescription: 'Pristine east coast beaches, ancient Hindu temples, and world-class diving.',
    longContent: `
# Trincomalee

Trincomalee on Sri Lanka's east coast offers a completely different beach experience from the south—less developed, more pristine, and with its own unique cultural heritage.

## Beaches

### Nilaveli Beach
A 4-kilometer stretch of powdery white sand, often deserted. Perfect for those seeking solitude.

### Uppuveli Beach
Closer to town with more facilities but still beautifully unspoiled.

### Pigeon Island
A marine national park with excellent snorkeling among coral reefs and blacktip reef sharks.

## Temples & Heritage

### Koneswaram Temple
A sacred Hindu temple perched dramatically on Swami Rock, with stunning ocean views and a mythological history dating back thousands of years.

### Fort Frederick
A Dutch fort containing the temple grounds, offering panoramic views.

### Hot Springs at Kanniya
Seven natural hot springs with reputed healing properties.

## Whale Watching

From March to August, blue whales can be spotted off Trincomalee—an alternative season to the south coast.

## Practical Tips

- Best season: April to September (east coast dry season)
- More budget-friendly than south coast beaches
- Rent a scooter to explore the area
- Modest dress required at temples
    `,
    heroImage: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/71/d9/68.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    ],
    tags: ['beach', 'diving', 'temples', 'snorkeling', 'off-beat'],
    region: 'east-coast',
    recommendedDays: 3,
    highlights: ['Pigeon Island snorkeling', 'Koneswaram Temple', 'Pristine beaches', 'Whale watching'],
    bestTimeToVisit: 'April to September (east coast season)',
    coordinates: { lat: 8.5874, lng: 81.2152 },
  },
  {
    slug: 'anuradhapura',
    title: 'Anuradhapura',
    shortDescription: 'The first ancient capital of Sri Lanka, a UNESCO site with 2,500 years of Buddhist history.',
    longContent: `
# Anuradhapura

Anuradhapura was Sri Lanka's first great capital, flourishing for over 1,300 years from the 4th century BC. This UNESCO World Heritage Site contains some of the country's most sacred Buddhist monuments and impressive ancient ruins.

## Sacred Sites

### Sri Maha Bodhi
The oldest historically authenticated tree in the world, grown from a cutting of the original Bodhi Tree under which Buddha attained enlightenment.

### Ruwanwelisaya Dagoba
A massive white stupa built in 140 BC, one of Buddhism's most sacred sites.

### Jetavanaramaya
Once the third tallest structure in the ancient world, this enormous brick stupa is an engineering marvel.

### Thuparamaya
The oldest dagoba in Sri Lanka, believed to contain the Buddha's collarbone.

## Ancient Engineering

### Abhayagiri Monastery
Ruins of a massive monastic complex that once housed 5,000 monks.

### Twin Ponds (Kuttam Pokuna)
Beautifully engineered ancient bathing pools with sophisticated water filtration systems.

### Isurumuniya Temple
Famous for the "Isurumuniya Lovers" carving, a romantic stone relief.

## Practical Tips

- Rent a bicycle to explore the spread-out ruins
- Dress modestly (white clothing preferred at sacred sites)
- Remove shoes and hats at temples
- Best explored over two days
- Sunrise visits to major stupas are magical
    `,
    heroImage: 'https://www.tourslanka.com/wp-content/uploads/2018/05/anuradhapura-1.jpg.webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1586613835341-35636c4c4c1a?w=800&q=80',
    ],
    tags: ['UNESCO', 'ancient ruins', 'Buddhism', 'history', 'temples'],
    region: 'cultural-triangle',
    recommendedDays: 2,
    highlights: ['Sri Maha Bodhi tree', 'Ancient dagobas', 'Sacred Buddhist sites', 'Archaeological ruins'],
    bestTimeToVisit: 'May to September',
    coordinates: { lat: 8.3114, lng: 80.4037 },
  },
  {
    slug: 'polonnaruwa',
    title: 'Polonnaruwa',
    shortDescription: 'Medieval capital featuring remarkably preserved ruins and the iconic Gal Vihara Buddha statues.',
    longContent: `
# Polonnaruwa

Polonnaruwa served as Sri Lanka's capital from the 11th to 13th centuries and is considered one of the best-planned archaeological sites in the country. Its compact layout makes it easier to explore than Anuradhapura.

## Must-See Sites

### Gal Vihara
Four magnificent Buddha statues carved from a single granite rock face—the pinnacle of Sinhalese rock carving artistry.

### Royal Palace Complex
Ruins of King Parakramabahu's palace, council chambers, and royal baths.

### Quadrangle
A compact enclosure containing some of the site's most impressive monuments, including the distinctive Vatadage.

### Rankoth Vehera
The largest dagoba in Polonnaruwa, modeled on Anuradhapura's great stupas.

## Engineering Marvels

### Parakrama Samudra
An enormous ancient reservoir (sea of Parakrama) still in use today for irrigation.

### Potgul Vihara
Ancient library ruins with remarkable acoustics.

## Practical Tips

- Bicycle is the best way to explore (available for rent)
- The site is more compact than Anuradhapura
- Visit early morning or late afternoon for best light
- Allow 3-4 hours for a thorough visit
- Combine with Minneriya or Kaudulla safari for elephant viewing
    `,
    heroImage: 'https://admin.myceylonadventures.com/uploads/polonnaruwa_ruin_city_cycle_tour_featured_fbf96a616a.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
    tags: ['UNESCO', 'ancient ruins', 'Buddhism', 'history', 'archaeology'],
    region: 'cultural-triangle',
    recommendedDays: 1,
    highlights: ['Gal Vihara Buddha statues', 'Royal Palace ruins', 'Ancient Quadrangle', 'Bicycle exploration'],
    bestTimeToVisit: 'May to September',
    coordinates: { lat: 7.9403, lng: 81.0188 },
  },
  {
    slug: 'arugam-bay',
    title: 'Arugam Bay',
    shortDescription: 'World-renowned surf destination with laid-back vibes and uncrowded point breaks.',
    longContent: `
# Arugam Bay

Arugam Bay is a legendary surf destination and one of the best right-hand point breaks in the world. This laid-back beach town on the east coast attracts surfers, yogis, and travelers seeking an alternative to the more developed south.

## Surfing

### Main Point
The famous right-hand point break, best from April to September. Works best at mid to high tide.

### Other Breaks
- Baby Point: Perfect for beginners
- Peanut Farm: Less crowded option
- Elephant Rock: Challenging reef break
- Okanda: Remote and uncrowded

### Surf Schools
Multiple surf schools offer lessons for all levels, with equipment rental widely available.

## Beyond Surfing

### Beaches
Long stretches of golden sand, much quieter than the south coast.

### Lagoon Safari
Kayak through the Pottuvil Lagoon to spot elephants, crocodiles, and abundant birdlife.

### Kumana National Park
A birding paradise just south of town, also home to elephants and crocodiles.

### Yoga & Wellness
Many guesthouses offer yoga classes and wellness retreats.

## Practical Tips

- Surf season: April to September
- Off-season (October-March) is very quiet—many businesses close
- Budget-friendly destination
- Nightlife centers around beach bars
- Rent a tuk-tuk or scooter to explore surrounding breaks
    `,
    heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    tags: ['surfing', 'beach', 'backpacker', 'yoga', 'wildlife'],
    region: 'east-coast',
    recommendedDays: 4,
    highlights: ['World-class surfing', 'Laid-back atmosphere', 'Lagoon safari', 'Yoga retreats'],
    bestTimeToVisit: 'April to September (surf season)',
    coordinates: { lat: 6.8437, lng: 81.8338 },
  },
  {
    slug: 'udawalawe',
    title: 'Udawalawe National Park',
    shortDescription: 'The best place in Sri Lanka to see wild elephants, with guaranteed sightings year-round.',
    longContent: `
# Udawalawe National Park

If seeing wild elephants is on your Sri Lanka bucket list, Udawalawe is the place to go. This national park offers virtually guaranteed elephant sightings year-round, with herds often numbering in the hundreds.

## Wildlife

### Elephants
Home to 600-700 wild elephants. Unlike Yala, sightings here are almost certain, and you'll often see large herds with calves.

### Other Animals
- Water buffalo
- Spotted deer
- Wild boar
- Crocodiles
- Jackals
- Over 200 bird species including eagles and serpent eagles

## Elephant Transit Home

Adjacent to the park, this facility rehabilitates orphaned elephant calves for release back into the wild. Feeding times (9 AM, 12 PM, 3 PM, 6 PM) allow visitors to watch the baby elephants being bottle-fed.

## Safari Experience

- Half-day safaris are usually sufficient
- Morning safaris (6 AM) offer better light and cooler temperatures
- The park is less crowded than Yala
- Budget-friendly option compared to other parks

## Practical Tips

- Located between the south coast and hill country—easy to include in an itinerary
- Open year-round (unlike Yala)
- Multiple park entrances available
- Combine with a visit to the Elephant Transit Home
- Excellent value for wildlife viewing
    `,
    heroImage: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/20/e8/11.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    ],
    tags: ['wildlife', 'elephants', 'safari', 'nature', 'family-friendly'],
    region: 'south-coast',
    recommendedDays: 1,
    highlights: ['Guaranteed elephant sightings', 'Elephant Transit Home', 'Affordable safaris', 'Bird watching'],
    bestTimeToVisit: 'Year-round (best: May to September)',
    coordinates: { lat: 6.4742, lng: 80.8987 },
  },
  {
    slug: 'thalaramba-beach',
    title: 'Thalaramba Beach',
    shortDescription: 'A serene, palm-fringed coastal gem near Mirissa with natural rock pools, turquoise waters, and peaceful sunsets.',
    longContent: `
# Thalaramba Beach, Mirissa

Thalaramba Beach is a tranquil, secluded paradise located along Sri Lanka's famed southern coast, just minutes away from Mirissa. Surrounded by lush coconut palms and gentle coral reefs, Thalaramba offers an intimate coastal retreat away from the busy main tourist strips.

## Why Visit Thalaramba Beach?

Unlike the more crowded beaches nearby, Thalaramba Beach retains an authentic, undisturbed atmosphere. Its natural reef barriers form shallow, crystal-clear rock pools where visitors can safely swim, snorkel, and relax under the tropical sun.

### Natural Coral & Rock Pools
The calm, shallow reef pools make Thalaramba an ideal spot for wading, swimming, and exploring vibrant marine life in crystal-clear water.

### Unspoiled Coconut Groves & Palms
Golden sands fringed by towering coconut trees offer perfect shade and a photogenic backdrop for sunset walks.

### Serenity Away from Crowds
Enjoy a quiet ocean view, gentle waves, and peaceful beachside boutique stays without noisy crowds.

## Best Things to Do at Thalaramba Beach

- **Swim in the Coral Pools**: Enjoy calm ocean waters shielded by natural reef barriers.
- **Sunset Photography**: Capture breathtaking golden hours over the Indian Ocean.
- **Snorkeling**: Discover colorful fish and sea life in the clear reef shallows.
- **Beachside Relaxation**: Unwind at charming boutique resorts and cozy beach cafes.

## Nearby Attractions

- **Mirissa Beach & Coconut Tree Hill** (5 mins)
- **Secret Beach Mirissa** (7 mins)
- **Polhena Beach & Turtle Bay** (12 mins)
- **Galle Fort** (35 mins)

## Best Time to Visit

The best time to visit Thalaramba Beach is from **November to April**, when the southern coast experiences sunny days, warm sea temperatures, and calm swimming conditions.
    `,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    ],
    tags: ['beach', 'secluded', 'rock pools', 'swimming', 'sunset', 'south coast', 'mirissa'],
    region: 'south-coast',
    recommendedDays: 1,
    highlights: ['Natural coral rock pools', 'Pristine golden sands', 'Tranquil sunset views', 'Close to Mirissa'],
    bestTimeToVisit: 'November to April',
    coordinates: { lat: 5.9402, lng: 80.4705 },
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByRegion(region: Destination['region']): Destination[] {
  return destinations.filter((d) => d.region === region);
}

export function getDestinationsByTag(tag: string): Destination[] {
  return destinations.filter((d) => d.tags.includes(tag.toLowerCase()));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  destinations.forEach((d) => d.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
