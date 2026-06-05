import { beforeYouGoData } from '../data/mockData';

export default function BeforeYouGoSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#f0f7f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-primary font-label uppercase tracking-widest mb-4 block">
            {beforeYouGoData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {beforeYouGoData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {beforeYouGoData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {beforeYouGoData.tips.map((tip, index) => (
            <div
              key={tip.title}
              className="group bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-container/30 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl text-primary">
                  {tip.icon}
                </span>
              </div>
              <h3 className="font-headline text-xl text-on-surface mb-3">
                {tip.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
