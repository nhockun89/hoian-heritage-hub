const experiences = [
  {
    title: 'My Son Sanctuary Morning Ritual',
    tag: 'SPIRITUAL JOURNEY',
    description:
      'Depart before dawn to witness the sunrise over the ancient Cham towers. Walk through mist-covered ruins with an archaeologist guide who brings the 4th-century kingdom to life.',
    duration: '5 Hours',
    group: 'Small Group',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
  },
  {
    title: 'Market-to-Table Workshop',
    tag: 'CULINARY IMMERSION',
    description:
      'Start at the Central Market at 6 AM to select ingredients with a local chef. Then cook five traditional dishes in an open-air kitchen overlooking the rice paddies.',
    duration: '4 Hours',
    group: 'Private',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  },
  {
    title: 'Emerald Path Cycle Tour',
    tag: 'ACTIVE EXPLORATION',
    description:
      'Pedal through emerald rice paddies, water coconut forests, and riverside villages. Stop for coconut water with locals and photograph water buffalo at sunset.',
    duration: '3 Hours',
    group: 'Self-Guided',
    image: 'https://images.unsplash.com/photo-1544191696-102d2c2b01f8?w=800&h=600&fit=crop',
  },
];

const dailyRhythms = [
  { time: '5:00 AM', activity: 'Fish Market Dawn', location: 'Thu Bon Riverside', icon: 'set_meal' },
  { time: '7:00 AM', activity: 'Morning Tea Ritual', location: 'Reaching Out Teahouse', icon: 'coffee' },
  { time: '10:00 AM', activity: 'Heritage Walking Tour', location: 'Japanese Covered Bridge', icon: 'account_balance' },
  { time: '2:00 PM', activity: 'Cooking Class', location: 'Tra Que Village', icon: 'restaurant' },
  { time: '5:00 PM', activity: 'Lantern Lighting', location: 'An Hoi Islet', icon: 'lightbulb' },
  { time: '8:00 PM', activity: 'Night Market Feast', location: 'Nguyen Hoang Street', icon: 'nightlife' },
];

export default function ActivitiesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[707px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1400&h=900&fit=crop"
            alt="Hoi An activities"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-3xl">
          <span className="font-label text-label text-on-secondary-fixed-variant bg-secondary-fixed px-3 py-1 rounded-full w-fit mb-4 inline-block">
            DAILY RHYTHMS
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Time-Honored Tours
          </h2>
          <p className="text-on-surface-variant text-body md:text-lg max-w-xl leading-relaxed">
            Every hour in Hoi An offers a new experience. From dawn fish markets to midnight lantern releases, follow the pulse of the Ancient Town.
          </p>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline text-headline text-on-surface">Signature Experiences</h3>
              <p className="font-body text-on-surface-variant mt-2">
                Curated journeys designed by locals who know every hidden corner.
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className={`group bg-surface-container rounded-3xl overflow-hidden flex flex-col ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } hover:shadow-xl transition-all duration-500`}
              >
                <div className="md:w-1/2 overflow-hidden h-64 md:h-auto">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="font-label text-label text-primary mb-3">{exp.tag}</span>
                  <h4 className="font-headline text-2xl text-on-surface mb-4">{exp.title}</h4>
                  <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <span className="font-body text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {exp.duration}
                    </span>
                    <span className="font-body text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {exp.group}
                    </span>
                  </div>
                  <button className="w-fit bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-2px] transition-all duration-300 btn-hover">
                    Book Experience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Rhythms Timeline */}
      <section className="mt-section-gap py-24 bg-surface-cool">
        <div className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <h3 className="font-headline text-headline text-on-surface mb-4 text-center">
            A Day in Hoi An
          </h3>
          <p className="font-body text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            Follow the natural rhythm of the town from first light to lantern glow.
          </p>
          <div className="space-y-0">
            {dailyRhythms.map((item) => (
              <div
                key={item.activity}
                className="flex items-start gap-6 py-6 border-b border-outline-variant/20 last:border-0"
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="font-label text-label text-primary">{item.time}</span>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline text-lg text-on-surface">{item.activity}</h4>
                  <p className="font-body text-sm text-on-surface-variant">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop mb-24">
        <div className="bg-surface-container-high rounded-3xl p-8 md:p-16 text-center">
          <h3 className="font-headline text-headline text-on-surface mb-4">
            Plan Your Perfect Day
          </h3>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Mix and match experiences to create your own itinerary. Our local guides will help you discover the hidden rhythms most travelers never see.
          </p>
          <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
            Build Your Itinerary
          </button>
        </div>
      </section>
    </div>
  );
}
