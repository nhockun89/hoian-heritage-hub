import HeroSection from './HeroSection';
import CategoryShortcuts from './CategoryShortcuts';
import HeritageSection from './HeritageSection';
import ThisMonthSection from './ThisMonthSection';
import DiscoverSection from './DiscoverSection';
import HowToExplore from './HowToExplore';
import ItinerarySection from './ItinerarySection';
import ExperiencesDirectory from './ExperiencesDirectory';
import LocalSecretsSection from './LocalSecretsSection';
import FeaturedSection from './FeaturedSection';
import FoodSection from './FoodSection';
import PhotoGallerySection from './PhotoGallerySection';
import NewsletterSection from './NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShortcuts />
      <HeritageSection />
      <ThisMonthSection />
      <DiscoverSection />
      <HowToExplore />
      <ItinerarySection />
      <ExperiencesDirectory />
      <LocalSecretsSection />
      <FeaturedSection variant="bridge" />
      <FeaturedSection variant="green" />
      <FoodSection />
      <PhotoGallerySection />
      <NewsletterSection />
    </>
  );
}
