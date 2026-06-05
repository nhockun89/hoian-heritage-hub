import { useState } from 'react';
import { heroData } from '../data/mockData';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section className="relative h-screen w-full flex items-center justify-center pb-32 overflow-hidden mt-16">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover scale-110 animate-breath"
          src={heroData.imageUrl}
          alt="Hoi An Ancient Town"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-5xl mx-auto text-center">
        <span className="text-white/80 font-label uppercase tracking-[0.2em] mb-6 block text-sm reveal-on-scroll hero-stagger-1 is-visible">
          {heroData.subtitle}
        </span>
        <h1 className="font-headline text-display-lg-mobile lg:text-[64px] text-white mb-8 leading-tight md:text-4xl reveal-on-scroll hero-stagger-2 is-visible">
          {heroData.title}
        </h1>

        {/* Search Overlay */}
        <div className="reveal-on-scroll hero-stagger-3 is-visible mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 max-w-3xl mx-auto">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {heroData.searchCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-[#f4d03f] text-[#221b00]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Search Input */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white/60">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experiences, restaurants, heritage sites..."
                className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none text-base"
              />
              <button className="bg-[#f4d03f] text-[#221b00] px-6 py-2 rounded-full font-bold hover:bg-[#e7c433] transition-all btn-hover">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal-on-scroll hero-stagger-3 is-visible">
          <button onClick={(e) => e.preventDefault()} className="bg-[#f4d03f] text-[#221b00] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e7c433] transition-all duration-300 btn-hover shadow-lg">
            {heroData.ctaPrimary}
          </button>
          <button onClick={(e) => e.preventDefault()} className="bg-[#76d7c4] text-[#00201b] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#93f4e0] transition-all duration-300 btn-hover shadow-lg">
            {heroData.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}
