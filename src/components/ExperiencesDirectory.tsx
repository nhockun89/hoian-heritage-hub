import { useState } from 'react';
import { experiencesData } from '../data/mockData';

export default function ExperiencesDirectory() {
  const [activeFilter, setActiveFilter] = useState('All');

  const displayedItems = experiencesData.items.slice(0, 8);

  const filteredItems =
    activeFilter === 'All'
      ? displayedItems
      : displayedItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#f0f7f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <span className="text-secondary font-label uppercase tracking-widest mb-4 block">
            {experiencesData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {experiencesData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {experiencesData.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12 reveal-on-scroll overflow-x-auto pb-2">
          {experiencesData.filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === filter.value
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-on-surface-variant hover:bg-white/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid - 2 rows max */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 reveal-on-scroll"
              style={{ transitionDelay: `${(index % 4) * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 text-xs font-bold text-on-surface">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    {item.duration}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-container-low text-secondary">
                    {item.category}
                  </span>
                  <span className="text-xs text-on-surface-variant">{item.price}</span>
                </div>

                <h3 className="font-headline text-lg text-on-surface mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
                  {item.howTo}
                </p>

                <button className="w-full bg-secondary/10 text-secondary px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-secondary hover:text-white transition-all btn-hover">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal-on-scroll">
          <button className="group inline-flex items-center gap-2 text-secondary font-bold text-lg hover:text-on-secondary-container transition-colors">
            <span className="border-b-2 border-transparent group-hover:border-secondary transition-all">
              View All Experiences
            </span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
