const curatedStays = [
  {
    name: 'The River House',
    tag: 'HERITAGE HOMESTAY',
    description:
      'A 200-year-old merchant house restored with original teak beams and courtyard garden. Wake to the sound of river boats and the scent of frangipani.',
    price: '$89',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=800&fit=crop',
  },
  {
    name: 'Lantern Lane Villa',
    tag: 'BOUTIQUE HOTEL',
    description:
      'Seven rooms, each themed after a different color of Hoi An silk lantern. Rooftop terrace with 360-degree views of the Ancient Town.',
    price: '$120',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop',
  },
  {
    name: 'Coconut Palm Retreat',
    tag: 'ECO-RESORT',
    description:
      'Sustainable bamboo bungalows set among water coconut groves. Solar-powered, farm-to-table dining, and direct river access for sunrise kayak trips.',
    price: '$65',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=800&fit=crop',
  },
  {
    name: 'The Old Merchant Loft',
    tag: 'DESIGN APARTMENT',
    description:
      'Minimalist loft in a converted French-colonial warehouse. Original brick walls, designer furniture, and a private balcony over the Japanese Covered Bridge.',
    price: '$95',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=800&fit=crop',
  },
];

const stayTypes = [
  {
    title: 'Riverfront Resorts',
    description: 'Wake up to misty river views and the sound of fishing boats. Perfect for couples seeking romance and tranquility.',
    icon: 'water',
  },
  {
    title: 'Ancient Town Villas',
    description: 'Sleep inside history in restored heritage homes with original architecture, courtyard gardens, and antique furnishings.',
    icon: 'account_balance',
  },
  {
    title: 'Countryside Homestays',
    description: 'Live with local families in Tra Que or Cam Thanh. Experience daily farm life and home-cooked meals by candlelight.',
    icon: 'nature_people',
  },
];

export default function StaysPage() {
  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-label text-label text-tertiary mb-4 inline-block">
            HERITAGE RETREATS
          </span>
          <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Curated Sanctuaries
          </h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Where you stay in Hoi An is part of the experience. From centuries-old merchant houses to riverside eco-retreats, each property tells a story.
          </p>
        </div>
      </section>

      {/* Featured Stays Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {curatedStays.map((stay) => (
              <div
                key={stay.name}
                className="group bg-surface-container rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-sm">star</span>
                    <span className="font-label text-label text-on-surface">{stay.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-label text-label text-tertiary mb-2 block">{stay.tag}</span>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-headline text-xl text-on-surface">{stay.name}</h4>
                    <span className="font-label text-label text-primary">{stay.price}/night</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
                    {stay.description}
                  </p>
                  <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-2px] transition-all duration-300 btn-hover">
                    Check Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Types */}
      <section className="w-full bg-surface-container py-24 flex flex-col items-center justify-center text-center px-margin-mobile">
        <div className="max-w-4xl">
          <h3 className="font-headline text-headline text-on-surface mb-4">Find Your Perfect Stay</h3>
          <p className="font-body text-on-surface-variant mb-12 max-w-xl mx-auto leading-relaxed">
            Whether you seek riverside tranquility, historical immersion, or rural authenticity, Hoi An has a bed that fits your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
            {stayTypes.map((type) => (
              <div
                key={type.title}
                className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-6">{type.icon}</span>
                <h4 className="font-headline text-xl text-on-surface mb-3">{type.title}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Booking CTA */}
      <section className="px-margin-mobile md:px-margin-desktop pb-24">
        <div className="bg-tertiary-container rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=600&fit=crop"
              alt="Luxury stay"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">
              bed
            </span>
            <h3 className="font-headline text-headline text-on-tertiary-container mb-4">
              Book with Confidence
            </h3>
            <p className="font-body text-on-tertiary-container/80 mb-8 leading-relaxed">
              Every property in our collection is personally visited and verified. We negotiate exclusive rates for our community and provide 24/7 local support during your stay.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-on-tertiary-container text-tertiary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover">
                Browse All Stays
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
