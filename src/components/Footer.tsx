import { footerData } from '../data/mockData';

interface FooterColumn {
  title: string;
  links?: readonly string[];
  items?: readonly { readonly icon: string; readonly text: string }[];
}

function hasLinks(column: FooterColumn): column is FooterColumn & { links: readonly string[] } {
  return 'links' in column && Array.isArray(column.links);
}

function hasItems(column: FooterColumn): column is FooterColumn & { items: readonly { readonly icon: string; readonly text: string }[] } {
  return 'items' in column && Array.isArray(column.items);
}

export default function Footer() {
  const columns = footerData.columns as unknown as FooterColumn[];

  return (
    <footer className="w-full rounded-t-[40px] mt-section-gap bg-surface-container-high">
      {/* Popular Tags Section */}
      <div className="px-margin-desktop py-12 border-b border-outline/10">
        <div className="max-w-7xl mx-auto">
          <h5 className="font-label uppercase tracking-widest text-on-surface-variant mb-4 text-sm">
            Popular Tags
          </h5>
          <div className="flex flex-wrap gap-2">
            {footerData.popularTags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="px-4 py-2 rounded-full bg-white text-sm text-on-surface-variant hover:text-tertiary hover:bg-tertiary-container/20 transition-all"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-16">
        <div className="md:col-span-1">
          <span className="font-headline text-headline text-tertiary mb-6 block">
            {footerData.brand}
          </span>
          <p className="font-body text-body text-on-surface-variant mb-8 max-w-xs">
            {footerData.copyright}
          </p>
          <div className="flex gap-4">
            {footerData.socialIcons.map((icon) => (
              <a
                key={icon}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-tertiary shadow-sm hover:scale-110 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="md:col-span-1">
            <h5 className="font-bold text-on-surface mb-6">{column.title}</h5>
            <ul className="space-y-4">
              {hasLinks(column)
                ? column.links.map((link) => (
                    <li key={link}>
                      <a
                        className="text-on-surface-variant hover:text-tertiary hover:translate-x-1 transition-all block"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))
                : hasItems(column)
                ? column.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-center gap-2 group text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">
                        {item.icon}
                      </span>
                      {item.text}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="px-margin-desktop py-6 border-t border-outline/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-on-surface-variant">
            Free support: <span className="font-medium text-on-surface">+84 235 123 456</span>  |  
            Email: <span className="font-medium text-on-surface">hello@hoianheritage.vn</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-on-surface-variant">Download our app:</span>
            <a href="#" className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-on-surface-variant">phone_iphone</span>
              <span className="text-sm font-medium text-on-surface">App Store</span>
            </a>
            <a href="#" className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-on-surface-variant">android</span>
              <span className="text-sm font-medium text-on-surface">Play Store</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
