import { discoverData } from '../data/mockData';
import { Reveal } from './Reveal';

export default function DiscoverSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="font-headline text-display-lg-mobile md:text-headline text-on-surface mb-4">
            {discoverData.title}
          </h2>
          <div className="w-16 h-0.5 bg-outline mx-auto transition-all duration-700 w-24"></div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {discoverData.categories.map((category, index) => (
            <Reveal
              key={category.title}
              delay={index * 100}
              className={`group bg-surface-container-low rounded-[16px] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                index === 0 ? 'md:col-span-3' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[21/9] md:aspect-[21/7]' : 'aspect-[4/5]'}`}>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  src={category.imageUrl}
                  alt={category.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${category.tagColor}`}>
                      {category.tag}
                    </div>
                    <span className="text-white/80 text-xs">{category.count} places</span>
                  </div>
                  <h3 className={`font-headline text-white mb-2 ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-3 max-w-2xl">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#f4d03f] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.cta}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
