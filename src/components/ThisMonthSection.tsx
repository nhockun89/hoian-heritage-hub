import { thisMonthData } from '../data/mockData';

export default function ThisMonthSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-tertiary font-label uppercase tracking-widest mb-4 block">
            {thisMonthData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {thisMonthData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {thisMonthData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {thisMonthData.items.map((item, index) => (
            <div
              key={item.title}
              className="group bg-surface-container-low rounded-3xl p-8 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.bgColor}`}>
                  <span className={`material-symbols-outlined text-2xl ${item.color}`}>{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-headline text-xl text-on-surface">{item.title}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white text-on-surface-variant">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
