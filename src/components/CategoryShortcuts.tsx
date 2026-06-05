import { categoryShortcuts } from '../data/mockData';

export default function CategoryShortcuts() {
  return (
    <section className="py-8 px-margin-mobile md:px-margin-desktop bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-7 gap-3">
          {categoryShortcuts.map((category) => (
            <a
              key={category.label}
              href="#"
              title={category.fullLabel}
              className="group flex items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${category.color}`}>
                <span className="material-symbols-outlined text-xl">{category.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-base">{category.label}</h4>
                <p className="text-xs text-on-surface-variant">{category.count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
