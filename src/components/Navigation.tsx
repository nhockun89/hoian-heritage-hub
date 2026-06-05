import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Heritage', full: 'Heritage Sites' },
    { label: 'Food', full: 'Food & Drink' },
    { label: 'Nature', full: 'Nature & Outdoors' },
    { label: 'Arts', full: 'Arts & Crafts' },
    { label: 'Activities', full: 'Activities & Experiences' },
    { label: 'Local Life', full: 'Local Life & Markets' },
    { label: 'Stays', full: 'Stays & Accommodation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-8 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm'
          : 'bg-[#faf9f5]/95 backdrop-blur-md py-6 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <span className="font-headline text-3xl font-bold text-[#815000] transition-colors group-hover:text-[#5a3a00]">
          Hoi An Heritage
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-12">
        {navLinks.map((link, index) => (
          <a
            key={link.label}
            href="#"
            title={link.full}
            className={`font-medium transition-all py-1 text-lg ${
              index === 0
                ? 'text-[#815000] border-b-2 border-[#815000]'
                : 'text-gray-600 hover:text-[#815000]'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#815000]/20 transition-all">
          <span className="material-symbols-outlined text-gray-400 text-sm mr-2">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-28 placeholder:text-gray-400 outline-none"
            placeholder="Search experien..."
            type="text"
          />
        </div>
        <button className="material-symbols-outlined text-[#815000] hover:text-[#5a3a00] transition-colors text-xl">
          person
        </button>
        <button className="bg-[#815000] text-white px-6 py-3 rounded-sm text-base font-semibold hover:bg-[#5a3a00] transition-all duration-300">
          Plan a Trip
        </button>
      </div>
    </header>
  );
}
