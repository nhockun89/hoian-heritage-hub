import { useState } from 'react';
import { photoGalleryData } from '../data/mockData';

export default function PhotoGallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPhotos =
    activeCategory === 'All'
      ? photoGalleryData.photos
      : photoGalleryData.photos.filter((p) => p.category === activeCategory);

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <span className="text-tertiary font-label uppercase tracking-widest mb-4 block">
            {photoGalleryData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {photoGalleryData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {photoGalleryData.description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 reveal-on-scroll">
          {photoGalleryData.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-tertiary text-white shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={`${photo.caption}-${index}`}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden reveal-on-scroll"
              style={{ transitionDelay: `${(index % 4) * 100}ms` }}
            >
              <img
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={photo.src}
                alt={photo.caption}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
                <span className="block text-white/70 text-xs mt-1">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
