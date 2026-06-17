import { featuredData } from '../data/mockData';
import { Reveal } from './Reveal';

interface FeaturedProps {
  readonly variant: 'bridge' | 'green';
}

export default function FeaturedSection({ variant }: FeaturedProps) {
  const data = featuredData.find((d) => d.variant === variant);
  if (!data) return null;

  if (variant === 'green') {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-cool">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <Reveal className="lg:col-span-5">
              <span className="text-secondary font-label uppercase tracking-widest mb-6 block">
                {data.subtitle}
              </span>
              <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-8 leading-tight">
                {data.title}
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed font-body">
                {data.description}
              </p>
              <button className="group flex items-center gap-4 text-secondary font-bold text-lg hover:text-on-secondary-container transition-colors">
                <span className="border-b-2 border-transparent group-hover:border-secondary transition-all">
                  {data.cta}
                </span>
                <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </button>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {data.images?.map((img, index) => (
                <Reveal
                  key={index}
                  className={index === 0 ? 'pt-12' : ''}
                  delay={index === 1 ? 150 : 0}
                >
                  <img
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-[32px] shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                    src={img}
                    alt={`Nature ${index + 1}`}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-section-gap overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-in-out group">
              <img
                className="w-full h-[600px] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                src={data.imageUrl}
                alt={data.title}
              />
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-container rounded-full blur-md opacity-0 lantern-pulse group-hover:opacity-60 pointer-events-none"></div>
              </div>
            </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="text-primary font-label uppercase tracking-widest mb-6 block">
              {data.subtitle}
            </span>
            <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-8 leading-tight">
              {data.title}
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed font-body">
              {data.description}
            </p>
            <div className="space-y-6">
              {data.features?.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <span className="material-symbols-outlined text-primary p-3 bg-white rounded-2xl shadow-sm transition-all group-hover:bg-primary group-hover:text-white">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-on-surface">{feature.title}</h4>
                    <p className="text-on-surface-variant">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
