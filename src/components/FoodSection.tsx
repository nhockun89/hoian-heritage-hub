import { foodData } from '../data/mockData';

export default function FoodSection() {
  return (
    <section className="bg-[#faf9f5] py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
          <span className="text-tertiary font-label uppercase tracking-widest mb-4 block">
            {foodData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {foodData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {foodData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {foodData.items.map((item, index) => (
            <div
              key={item.name}
              className={`group cursor-pointer reveal-on-scroll ${
                index % 2 === 1 ? 'pt-8' : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square rounded-[24px] overflow-hidden mb-6 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <img
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                {/* Price badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-on-surface">{item.price}</span>
                </div>
                {index === 3 && (
                  <div className="absolute bottom-10 right-10 w-2 h-2 bg-primary-container rounded-full blur-sm opacity-60 lantern-pulse pointer-events-none"></div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary">
                  {item.cuisine}
                </span>
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {item.neighborhood}
                </span>
              </div>

              <h4 className="font-headline text-2xl text-on-surface mb-2 transition-colors group-hover:text-tertiary">
                {item.name}
              </h4>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-2">
                {item.description}
              </p>
              <p className="text-xs text-secondary mb-3">
                {item.location}
              </p>
              <span className="inline-flex items-center gap-1 text-tertiary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.cta}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
