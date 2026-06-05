import { localSecretsData } from '../data/mockData';

export default function LocalSecretsSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-secondary font-label uppercase tracking-widest mb-4 block">
            {localSecretsData.subtitle}
          </span>
          <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">
            {localSecretsData.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {localSecretsData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {localSecretsData.secrets.map((secret, index) => (
            <div
              key={secret.title}
              className="group bg-surface-container-low rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl text-secondary group-hover:text-white transition-colors">
                  {secret.icon}
                </span>
              </div>
              <h3 className="font-headline text-xl text-on-surface mb-3">
                {secret.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                {secret.description}
              </p>
              <div className="pt-4 border-t border-outline/10">
                <span className="text-xs font-label uppercase tracking-wider text-secondary">
                  {secret.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
