const heritageSites = [
  {
    name: 'Japanese Covered Bridge',
    tag: 'ICONIC LANDMARK',
    description:
      'Built in the 1590s by Japanese merchants, this wooden bridge spans a quiet canal and houses a small temple dedicated to the god of weather. Its pagoda-style roof has become the symbol of Hoi An.',
    era: '16th Century',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=800&fit=crop',
  },
  {
    name: 'Phuc Kien Assembly Hall',
    tag: 'CHINESE HERITAGE',
    description:
      'Built by Fujian Chinese immigrants in 1697, this elaborate temple complex features intricate woodcarvings, ceramic mosaics, and a grand courtyard dedicated to the sea goddess Thien Hau.',
    era: '17th Century',
    image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&h=800&fit=crop',
  },
  {
    name: 'Tan Ky Old House',
    tag: 'MERCHANT HOME',
    description:
      'Seven generations of the Le family have preserved this 200-year-old merchant house. Its architecture blends Japanese, Chinese, and Vietnamese styles, with mother-of-pearl inlays and carved wooden beams.',
    era: '18th Century',
    image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=600&h=800&fit=crop',
  },
  {
    name: 'Quan Cong Temple',
    tag: 'SPIRITUAL SITE',
    description:
      'Dedicated to the revered Chinese general Quan Cong, this crimson temple features imposing statues, elaborate incense coils, and a courtyard that fills with smoke and prayers at dawn.',
    era: '17th Century',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&h=800&fit=crop',
  },
];

const heritageStories = [
  {
    title: 'The Silk Road Connection',
    text: 'For centuries, Hoi An was Southeast Asia\'s busiest port. Ships from Japan, China, Portugal, and the Netherlands anchored here, trading silk, spices, and ceramics. The town\'s architecture still tells these stories.',
    stat: '200+',
    statLabel: 'Historic Buildings',
  },
  {
    title: 'UNESCO World Heritage',
    text: 'In 1999, Hoi An Ancient Town was designated a UNESCO World Heritage Site for being an exceptionally well-preserved example of a Southeast Asian trading port dating from the 15th to 19th centuries.',
    stat: '1999',
    statLabel: 'UNESCO Listed',
  },
];

export default function HeritagePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[795px] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1400&h=900&fit=crop"
            alt="Hoi An heritage"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop pb-hero-pad-sm md:pb-hero-pad-lg w-full">
          <span className="font-label text-label text-on-primary-fixed-variant bg-primary-fixed px-3 py-1 rounded-full w-fit mb-4 inline-block">
            TIMELESS TREASURES
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface max-w-3xl mb-6">
            Where History Lives in Every Wall
          </h2>
          <p className="text-on-surface-variant text-body md:text-lg max-w-xl leading-relaxed">
            Hoi An Ancient Town is an open-air museum where Japanese merchant houses, Chinese assembly halls, and French colonial storefronts stand shoulder to shoulder, whispering stories of a glorious trading past.
          </p>
        </div>
      </section>

      {/* Heritage Sites Grid */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline text-headline text-on-surface">Sacred Sites</h3>
              <p className="font-body text-on-surface-variant mt-2">
                Four landmarks that define the soul of the Ancient Town.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {heritageSites.map((site) => (
              <div
                key={site.name}
                className="group bg-surface-container rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="font-label text-label text-primary">{site.era}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-label text-label text-tertiary mb-2 block">{site.tag}</span>
                  <h4 className="font-headline text-2xl text-on-surface mb-3">{site.name}</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {site.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Stories */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low py-24 rounded-[40px] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-headline text-headline text-on-surface mb-12">Layers of History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {heritageStories.map((story) => (
              <div
                key={story.title}
                className="bg-surface-container rounded-3xl p-8 md:p-12 border border-outline-variant/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-headline text-2xl text-on-surface">{story.title}</h4>
                  <div className="text-right">
                    <p className="font-display-lg-mobile text-primary">{story.stat}</p>
                    <p className="font-label text-label text-on-surface-variant">{story.statLabel}</p>
                  </div>
                </div>
                <p className="font-body text-on-surface-variant leading-relaxed">{story.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walking Tour CTA */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop mb-24">
        <div className="bg-primary-container rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=1200&h=600&fit=crop"
              alt="Heritage walking tour"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-on-primary-container text-5xl mb-6">
              map
            </span>
            <h3 className="font-headline text-headline text-on-primary-container mb-4">
              Walk Through Centuries
            </h3>
            <p className="font-body text-on-primary-container/80 mb-8 leading-relaxed">
              Join a guided heritage walk with local historians who know every carving, every secret doorway, and every story these ancient walls hold. Walks depart daily at 8 AM and 4 PM.
            </p>
            <button className="bg-on-primary-container text-primary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
              Book a Heritage Walk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
