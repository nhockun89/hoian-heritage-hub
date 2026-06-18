import { Link } from 'react-router-dom';

const mustTasteItems = [
  {
    tag: "THE WORLD'S BEST",
    title: 'Banh Mi Hoi An',
    location: 'Ba Le Well Area',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7594592?w=600&h=800&fit=crop',
  },
  {
    tag: 'HAND-CRAFTED ART',
    title: 'White Rose Dumplings',
    location: 'Hai Ba Trung St.',
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=800&fit=crop',
  },
  {
    tag: 'STREET CLASSIC',
    title: 'Com Ga Hoi An',
    location: 'Central Market',
    price: '$',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=800&fit=crop',
  },
  {
    tag: 'HERITAGE SOUL',
    title: 'Cao Lau Noodles',
    location: 'Old Town',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&h=800&fit=crop',
  },
];

const kitchenStories = [
  {
    tag: "THE VENDOR'S TALE",
    title: 'The Keeper of the Well',
    excerpt:
      'Meet Mrs. Thanh, who has been drawing water from the Ba Le Well for 40 years to ensure her Cao Lau remains true to its century-old recipe.',
    image: 'https://images.unsplash.com/photo-1594020293000-8b169298b9f2?w=800&h=600&fit=crop',
    span: 'md:col-span-8',
  },
  {
    tag: 'MARKET SECRETS',
    title: 'Under the Red Roofs',
    excerpt:
      "The Central Market is a living museum of taste. From savory 'Banh Xeo' to sweet 'Che', every corner holds a legacy.",
    image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800&h=600&fit=crop',
    span: 'md:col-span-8 md:flex-row-reverse',
  },
];

export default function FoodPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[707px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400&h=900&fit=crop"
            alt="Hoi An food scene"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-hero-pad-sm md:pb-hero-pad-lg px-margin-mobile md:px-margin-desktop">
          <span className="font-label text-label text-on-tertiary-fixed-variant bg-tertiary-fixed px-3 py-1 rounded-full w-fit mb-4">
            HERITAGE CUISINE
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface max-w-2xl">
            The Golden Secret of Cao Lau
          </h2>
          <p className="mt-6 text-on-surface-variant text-body md:text-lg max-w-xl font-body leading-relaxed">
            More than a dish, it is a piece of Hoi An&apos;s soul—crafted with water from the ancient Ba Le Well and wood ash from the Cham Islands.
          </p>
          <div className="mt-8">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
              Discover the Origin
            </button>
          </div>
        </div>
      </section>

      {/* Must-Taste Icons - Horizontal Scroll */}
      <section className="mt-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-headline text-on-surface">Must-Taste Icons</h3>
            <p className="font-body text-on-surface-variant mt-2">
              Essential flavors that define the Ancient Town&apos;s palate.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-gutter px-margin-mobile md:px-margin-desktop pb-8 hide-scrollbar">
          {mustTasteItems.map((item) => (
            <div key={item.title} className="flex-none w-72 md:w-96 group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-label text-label mb-1 opacity-90">{item.tag}</p>
                  <h4 className="font-headline text-2xl">{item.title}</h4>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-body text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {item.location}
                </span>
                <span className="font-label text-label text-primary">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen Stories - Bento Grid */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop mb-24">
        <h3 className="font-headline text-headline text-on-surface mb-12">Kitchen Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {kitchenStories.map((story, i) => (
            <div
              key={story.title}
              className={`${story.span} group bg-surface-container rounded-3xl overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-500`}
            >
              <div className="md:w-1/2 overflow-hidden h-64 md:h-auto">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className={`font-label text-label mb-4 ${i === 0 ? 'text-tertiary' : 'text-secondary'}`}>
                  {story.tag}
                </span>
                <h4 className="font-headline text-2xl text-on-surface mb-4">{story.title}</h4>
                <p className="font-body text-on-surface-variant mb-6 leading-relaxed">{story.excerpt}</p>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-primary font-label text-label font-bold group/link"
                >
                  READ FULL STORY
                  <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}

          {/* Mini Story Card */}
          <div className="md:col-span-4 bg-surface-container-high rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/20">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6">restaurant</span>
              <h4 className="font-headline text-xl text-on-surface mb-3">Market Morning Rituals</h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                A guide to navigating the Central Market at dawn, when the best herbs arrive from Tra Que Village.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container text-sm">schedule</span>
                </div>
                <div>
                  <p className="font-label text-xs font-bold text-on-surface">5:00 AM START</p>
                  <p className="font-body text-xs text-on-surface-variant">Best for Freshness</p>
                </div>
              </div>
            </div>
          </div>

          {/* Spice Card */}
          <div className="md:col-span-4 bg-tertiary-container text-on-tertiary-container rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <h4 className="font-headline text-2xl mb-4">Spice of Life</h4>
            <p className="font-body opacity-90 mb-8">
              Discover why Hoi An&apos;s chili jam is the secret ingredient you didn&apos;t know you needed.
            </p>
            <div className="w-full aspect-square rounded-full border-4 border-on-tertiary-container/20 p-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop"
                alt="Hoi An chili jam"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
