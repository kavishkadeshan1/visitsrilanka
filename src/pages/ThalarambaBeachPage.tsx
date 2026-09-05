import { SEOHead } from '@/components/seo/SEOHead';
import DestinationDetail from '@/pages/DestinationDetail';
import { getDestinationBySlug } from '@/content/destinations';
import { generateDestinationSchema, generateFAQSchema } from '@/lib/seo';

export default function ThalarambaBeachPage() {
  const destination = getDestinationBySlug('thalaramba-beach');

  if (!destination) {
    return <DestinationDetail />;
  }

  const destinationSchema = generateDestinationSchema({
    name: 'Thalaramba Beach',
    description: destination.shortDescription,
    image: destination.heroImage,
    url: 'https://visitsrilanka.online/thalaramba-beach',
    coordinates: destination.coordinates,
    highlights: destination.highlights,
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'Where is Thalaramba Beach located?',
      answer: 'Thalaramba Beach is located on the southern coast of Sri Lanka, right next to Mirissa in the Matara district.',
    },
    {
      question: 'What is Thalaramba Beach famous for?',
      answer: 'Thalaramba Beach is renowned for its tranquil rock pools, golden sands, shallow coral reefs, and serene sunset views away from tourist crowds.',
    },
    {
      question: 'Is Thalaramba Beach safe for swimming?',
      answer: 'Yes, the natural coral reef barriers create calm, shallow pools that are ideal for swimming, wading, and relaxing.',
    },
    {
      question: 'What is the Google rating for Thalaramba Beach?',
      answer: 'Thalaramba Beach is highly rated by travelers with a 4.6/5 stars rating on Google.',
    },
  ]);

  return (
    <>
      <SEOHead
        title="Thalaramba Beach Guide 2026 | Secluded Paradise near Mirissa, Sri Lanka"
        description="Discover Thalaramba Beach in Sri Lanka (Rating 4.6★). Explore pristine rock pools, golden sands, coral reefs, sunset spots, travel tips, and luxury beach stays near Mirissa."
        keywords="Thalaramba Beach, Thalaramba Beach Sri Lanka, Thalaramba Mirissa, things to do in Thalaramba Beach, quiet beach Sri Lanka, South Coast Sri Lanka beaches"
        image={destination.heroImage}
        jsonLd={[destinationSchema, faqSchema]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Destinations', url: '/destinations' },
          { name: 'Thalaramba Beach', url: '/thalaramba-beach' },
        ]}
      />
      <DestinationDetail overrideSlug="thalaramba-beach" disableSEO={true} />
    </>
  );
}
