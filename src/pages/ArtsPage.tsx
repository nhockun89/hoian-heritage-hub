const craftVillages = [
  {
    name: 'Kim Bong Carpentry',
    tag: 'WOODWORKING LEGACY',
    description:
      'For over 600 years, the craftsmen of Kim Bong have shaped wood into everything from riverboats to intricate furniture. Watch masters at work and try your hand at traditional joinery.',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=800&fit=crop',
  },
  {
    name: 'Thanh Ha Pottery',
    tag: 'EARTH & FIRE',
    description:
      'Spin clay on a wheel that has turned for 500 years. The village supplies terracotta tiles to the Ancient Town and creates pottery using ancestral techniques.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop',
  },
  {
    name: 'Silk Lantern Making',
    tag: 'LIGHT & COLOR',
    description:
      'Create your own silk lantern in the style that has illuminated Hoi An for centuries. Choose from dozens of fabrics and learn the art of bamboo framing.',
    image: 'https://images.unsplash.com/photo-1543097692-fa13c6cd85c7?w=600&h=800&fit=crop',
  },
  {
    name: 'Tra Que Herb Art',
    tag: 'NATURAL DYES',
    description:
      'Learn to create natural dyes from local plants and print traditional patterns on organic cotton using wooden blocks carved with heritage motifs.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop',
  },
];

const modernExpressions = [
  {
    title: 'Reimagining Heritage',
    text: 'Young designers are blending ancient Cham motifs with contemporary fashion, creating a new visual language that honors the past while embracing the future.',
    stat: '40+',
    statLabel: 'Young Designers',
  },
  {
    title: 'Digital Preservation',
    text: 'Local artists use 3D scanning and VR to document fading crafts, ensuring that traditional techniques survive for generations to come.',
    stat: '12',
    statLabel: 'VR Exhibitions',
  },
];

export default function ArtsPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[751px] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=1400&h=900&fit=crop"
            alt="Hoi An arts and crafts"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop pb-hero-pad-sm md:pb-hero-pad-lg w-full">
          <span className="font-label text-label text-on-primary-fixed-variant bg-primary-fixed px-3 py-1 rounded-full w-fit mb-4 inline-block">
            CREATIVE SPIRIT
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface max-w-3xl mb-6">
            Where Ancient Hands Shape Modern Dreams
          </h2>
          <p className="text-on-surface-variant text-body md:text-lg max-w-xl leading-relaxed">
            In Hoi An, craft is not a relic. It is a living conversation between generations, where every carve, spin, and stitch carries the weight of history.
          </p>
        </div>
      </section>

      {/* Craft Villages - Horizontal Scroll */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-headline text-on-surface">Craft Villages</h3>
            <p className="font-body text-on-surface-variant mt-2">
              Four living workshops where tradition is passed from hand to hand.
            </p>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-gutter pb-8 hide-scrollbar">
          {craftVillages.map((village) => (
            <div key={village.name} className="flex-none w-72 md:w-80 group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container relative">
                <img
                  src={village.image}
                  alt={village.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-label text-label mb-1 opacity-90">{village.tag}</p>
                  <h4 className="font-headline text-2xl">{village.name}</h4>
                </div>
              </div>
              <p className="mt-4 font-body text-sm text-on-surface-variant leading-relaxed">
                {village.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Expressions */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low py-24 rounded-[40px] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-headline text-headline text-on-surface mb-12">Modern Expressions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {modernExpressions.map((expr) => (
              <div
                key={expr.title}
                className="bg-surface-container rounded-3xl p-8 md:p-12 border border-outline-variant/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-headline text-2xl text-on-surface">{expr.title}</h4>
                  <div className="text-right">
                    <p className="font-display-lg-mobile text-primary">{expr.stat}</p>
                    <p className="font-label text-label text-on-surface-variant">{expr.statLabel}</p>
                  </div>
                </div>
                <p className="font-body text-on-surface-variant leading-relaxed">{expr.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Artisan Guild */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop mb-24">
        <div className="bg-primary-container rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?w=1200&h=600&fit=crop"
              alt="Artisan workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-on-primary-container text-5xl mb-6">palette</span>
            <h3 className="font-headline text-headline text-on-primary-container mb-4">
              Join the Artisan Guild
            </h3>
            <p className="font-body text-on-primary-container/80 mb-8 leading-relaxed">
              Spend a day learning from master craftsmen. Take home not just a souvenir, but a skill that connects you to 500 years of heritage.
            </p>
            <button className="bg-on-primary-container text-primary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
              Book a Workshop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
