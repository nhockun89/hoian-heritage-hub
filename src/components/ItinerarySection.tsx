import { useState } from 'react';
import { itineraryData } from '../data/mockData';

export default function ItinerarySection() {
  const [activeDay, setActiveDay] = useState(0);
  const day = itineraryData.days[activeDay];

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <span className="text-primary font-label uppercase tracking-widest mb-4 block">
            {itineraryData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {itineraryData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {itineraryData.description}
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-3 mb-12 reveal-on-scroll">
          {itineraryData.days.map((d, index) => (
            <button
              key={d.label}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeDay === index
                  ? 'bg-tertiary text-white shadow-md'
                  : 'bg-white text-on-surface-variant hover:bg-white/80'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-outline/20"></div>

            {day.timeline.map((item, index) => (
              <div
                key={`${activeDay}-${index}`}
                className="relative flex gap-6 mb-8 last:mb-0 reveal-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon circle */}
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-tertiary-container/30 text-tertiary">
                      {item.time}
                    </span>
                    <h3 className="font-headline text-lg text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
