import { howToExploreData } from '../data/mockData';

export default function HowToExplore() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-primary font-label uppercase tracking-widest mb-4 block">
            {howToExploreData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {howToExploreData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {howToExploreData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howToExploreData.steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group reveal-on-scroll"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector line */}
              {index < howToExploreData.steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-outline/20 -z-10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-outline/40"></div>
                </div>
              )}

              <div className="bg-surface-container-low rounded-3xl p-8 h-full hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container/30 flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-2xl text-primary">
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-[48px] font-headline font-bold text-outline/20 leading-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-headline text-xl text-on-surface mb-3">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
