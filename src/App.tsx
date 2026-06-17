import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CategoryShortcuts from './components/CategoryShortcuts';
import HeritageSection from './components/HeritageSection';
import ThisMonthSection from './components/ThisMonthSection';
import DiscoverSection from './components/DiscoverSection';
import HowToExplore from './components/HowToExplore';
import ItinerarySection from './components/ItinerarySection';
import ExperiencesDirectory from './components/ExperiencesDirectory';
import LocalSecretsSection from './components/LocalSecretsSection';
import FeaturedSection from './components/FeaturedSection';
import FoodSection from './components/FoodSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
