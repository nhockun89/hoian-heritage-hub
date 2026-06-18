const ecoEscapes = [
  {
    title: 'Cam Thanh Coconut Village',
    tag: 'BASKET BOAT EXPERIENCE',
    description:
      'Glide through water coconut forests in traditional round basket boats. Learn crab fishing from local fishermen and savor a home-cooked meal by the river.',
    duration: '3 Hours',
    price: 'From $25',
    image: 'https://images.unsplash.com/photo-1533230408706-271f3374f5d4?w=800&h=600&fit=crop',
  },
  {
    title: 'Tra Que Organic Village',
    tag: 'FARM-TO-TABLE',
    description:
      'Cycle through lush vegetable gardens, join farmers in planting herbs, and cook a traditional meal with ingredients picked moments before.',
    duration: 'Half Day',
    price: 'From $35',
    image: 'https://images.unsplash.com/photo-1595855709915-70004b66f08f?w=800&h=600&fit=crop',
  },
  {
    title: 'Cham Islands Biosphere',
    tag: 'MARINE RESERVE',
    description:
      'Snorkel in crystal-clear waters among coral reefs and tropical fish. A UNESCO-recognized biosphere reserve just a boat ride away.',
    duration: 'Full Day',
    price: 'From $55',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
  },
];

const natureTips = [
  {
    icon: 'wb_sunny',
    title: 'Best Time to Visit',
    text: 'February to May offers the most pleasant weather, warm days, cool evenings, and minimal rainfall for outdoor exploration.',
  },
  {
    icon: 'directions_bike',
    title: 'Eco-Friendly Transport',
    text: 'Rent a bicycle to explore the countryside. The flat terrain and scenic rice paddies make cycling the ideal way to see Hoi An.',
  },
  {
    icon: 'water_drop',
    title: 'Respect the Waterways',
    text: 'The Thu Bon River is the lifeline of Hoi An. Support tours that prioritize river conservation and avoid single-use plastics.',
  },
];

export default function NaturePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[795px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=900&fit=crop"
            alt="Hoi An nature"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <span className="font-label text-label text-secondary-fixed bg-secondary px-3 py-1 rounded-full mb-6 inline-block">
            ECO-ESCAPE
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Eco-Escapes: Cam Thanh
          </h2>
          <p className="text-on-surface-variant text-body md:text-lg max-w-2xl mx-auto leading-relaxed">
            Where the Thu Bon River meets ancient coconut forests. Discover the wild heart of Hoi An beyond the lantern-lit streets.
          </p>
        </div>
      </section>

      {/* Eco Escapes Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="font-headline text-headline text-on-surface">The Basket Boat Ballet</h3>
            <p className="font-body text-on-surface-variant mt-2">
              Nature experiences that connect you to the land and water.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {ecoEscapes.map((escape) => (
            <div
              key={escape.title}
              className="group bg-surface-container rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={escape.image}
                  alt={escape.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="font-label text-label text-secondary mb-2 block">{escape.tag}</span>
                <h4 className="font-headline text-xl text-on-surface mb-3">{escape.title}</h4>
                <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
                  {escape.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                  <span className="font-body text-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {escape.duration}
                  </span>
                  <span className="font-label text-label text-primary">{escape.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Palm Harmony Tips */}
      <section className="bg-surface-dim/30 py-section-gap relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <h3 className="font-headline text-headline text-on-surface mb-12 text-center">Palm Harmony</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {natureTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-6">{tip.icon}</span>
                <h4 className="font-headline text-xl text-on-surface mb-3">{tip.title}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-headline text-headline text-on-surface mb-6">
            Ready to Explore the Wild Side?
          </h3>
          <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
            Book a guided eco-tour with local experts who know every hidden path, secret lagoon, and the best time to see fireflies dance along the riverbanks.
          </p>
          <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
            Book an Eco-Tour
          </button>
        </div>
      </section>
    </div>
  );
}
