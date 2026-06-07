import { useState } from 'react';
import { newsletterData } from '../data/mockData';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[48px] bg-inverse-surface p-12 md:p-20 overflow-hidden text-center reveal-on-scroll">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary/20 blur-[100px] rounded-full -mr-48 -mt-48 animate-pulse-slow"></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -ml-48 -mb-48 animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-primary-fixed font-label uppercase tracking-widest mb-6 block">
              {newsletterData.subtitle}
            </span>
            <h2 className="font-headline text-display-lg-mobile md:text-5xl text-inverse-on-surface mb-8">
              {newsletterData.title}
            </h2>
            <p className="text-lg text-outline mb-10">
              {newsletterData.description}
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary-fixed outline-none transition-all"
                placeholder={newsletterData.placeholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-primary-container text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 btn-hover">
                {newsletterData.cta}
              </button>
            </form>
            <p className="mt-6 text-white/40 text-sm">{newsletterData.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
