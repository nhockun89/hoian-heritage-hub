const alleywaySecrets = [
  {
    title: 'The Tailor Alley',
    description:
      'Behind the main street, a narrow lane where three generations of tailors work by hand. Bring a photo of any garment and they will recreate it overnight in silk or linen.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
  },
  {
    title: 'The Coffee Oracle',
    description:
      'A 90-year-old woman reads fortunes in coffee grounds at a hidden courtyard cafe. Locals have consulted her for generations before major life decisions.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&h=400&fit=crop',
  },
  {
    title: 'The Paper Ancestor',
    description:
      'Behind a yellow wall on Tran Phu Street, an artisan still hand-crafts paper offerings for ancestor worship using mulberry bark and natural pigments.',
    image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&h=400&fit=crop',
  },
];

const moonFestivalMoments = [
  {
    title: 'Lantern Release',
    description: 'Write a wish on a paper lantern and set it afloat on the Thu Bon River alongside thousands of others.',
    icon: 'lightbulb',
  },
  {
    title: 'Bai Choi Performance',
    description: 'Watch traditional singing bingo under the full moon, a UNESCO-recognized heritage art form.',
    icon: 'music_note',
  },
  {
    title: 'Midnight Market',
    description: 'Stalls stay open until 2 AM selling handmade crafts, street food, and traditional medicine.',
    icon: 'storefront',
  },
];

export default function LocalLifePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[795px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1400&h=900&fit=crop"
            alt="Hoi An local life"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop pb-hero-pad-sm md:pb-hero-pad-lg w-full">
          <span className="font-label text-label text-on-primary-fixed-variant bg-primary-fixed px-3 py-1 rounded-full w-fit mb-4 inline-block">
            ANCIENT ECHOES
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface max-w-3xl mb-6">
            The Living Soul of Hoi An
          </h2>
          <p className="text-on-surface-variant text-body md:text-lg max-w-xl leading-relaxed">
            Beyond the postcard views lies a town that wakes at dawn, rests at midday, and comes alive when the lanterns glow. This is the Hoi An that locals know.
          </p>
        </div>
      </section>

      {/* Alleyway Secrets */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-warm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline text-headline text-on-surface">Alleyway Secrets</h3>
              <p className="font-body text-on-surface-variant mt-2">
                Hidden stories tucked behind the ancient yellow walls.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {alleywaySecrets.map((secret) => (
              <div
                key={secret.title}
                className="group bg-surface-container rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={secret.image}
                    alt={secret.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-headline text-xl text-on-surface mb-3">{secret.title}</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {secret.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Moon Festival */}
      <section className="relative py-section-gap overflow-hidden bg-on-surface text-surface">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1543097692-fa13c6cd85c7?w=1400&h=900&fit=crop"
            alt="Lantern festival"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-label text-label text-primary-fixed mb-4 inline-block">
              MONTHLY MAGIC
            </span>
            <h3 className="font-headline text-headline text-surface mb-4">
              The Full Moon Lantern Festival
            </h3>
            <p className="font-body text-surface/70 max-w-2xl mx-auto leading-relaxed">
              On the 14th day of every lunar month, Hoi An turns off its electricity and lets thousands of silk lanterns light the streets. Motorbikes are banned. The town breathes as it did centuries ago.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {moonFestivalMoments.map((moment) => (
              <div
                key={moment.title}
                className="bg-surface/10 backdrop-blur-sm rounded-3xl p-8 border border-surface/20 hover:bg-surface/20 transition-colors duration-300"
              >
                <span className="material-symbols-outlined text-primary-fixed text-4xl mb-6">
                  {moment.icon}
                </span>
                <h4 className="font-headline text-xl text-surface mb-3">{moment.title}</h4>
                <p className="font-body text-sm text-surface/70 leading-relaxed">
                  {moment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Living Heritage */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col items-center text-center bg-surface-cream">
        <div className="max-w-3xl">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">volunteer_activism</span>
          <h3 className="font-headline text-headline text-on-surface mb-4">
            Support Living Heritage
          </h3>
          <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
            Every interaction with a local craftsperson, every meal at a family restaurant, every night in a heritage homestay directly supports the community that keeps Hoi An alive. Choose local. Choose heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
              Find Local Guides
            </button>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
              Community Fund
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
