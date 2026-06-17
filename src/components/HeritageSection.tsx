import { heritageData } from '../data/mockData';
import { Reveal } from './Reveal';

export default function HeritageSection() {
  const stats = [
    { value: '500+', label: 'Years of History' },
    { value: '1999', label: 'UNESCO Heritage Site' },
  ];

  return (
    <Reveal as="section" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-gutter">
        <div className="md:w-1/2 space-y-6">
          <span className="text-tertiary font-label uppercase tracking-widest">
            {heritageData.subtitle}
          </span>
          <h2 className="font-headline text-headline md:text-[40px] text-on-surface leading-tight">
            {heritageData.title}
          </h2>
          <p className="text-on-surface-variant font-body leading-relaxed max-w-xl">
            {heritageData.description}
          </p>
        </div>
        <div className="md:w-1/2 flex gap-gutter">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 bg-surface-container-low rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="text-[48px] font-headline text-tertiary leading-none transition-transform group-hover:scale-110">
                {stat.value}
              </span>
              <span className="text-sm font-label text-on-surface-variant mt-2 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
