import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './themetoggle';

function normalizeMenu(menu = []) {
  if (!Array.isArray(menu)) return [];

  return menu.filter((item) => item?.menu_label && item?.menu_link);
}

export default function Header({ settings = {} }) {
  const menuItems = normalizeMenu(settings.menu);
  const logo = settings.header_logo;
  const logoLink = settings.header_logo_link || menuItems[0]?.menu_link || '/';

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border-soft)] bg-[color:var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-6 py-4">
        {logo?.url ? (
          <Link href={logoLink} className="transition hover:opacity-85" aria-label="GO MO Group home">
            <Image
              src={logo.url}
              alt={logo.alt || 'GO MO Group'}
              width={logo.width || 180}
              height={logo.height || 58}
              className="header-logo h-auto max-h-10 w-auto"
            />
          </Link>
        ) : (
          <div className="h-12 w-40" aria-hidden="true" />
        )}

        <div className="flex items-center gap-3 md:gap-5">
          <nav className="hide-home-mobile flex items-center gap-4 text-sm font-medium text-[color:var(--muted)]">
            {menuItems.map((item, index) => (
              <Link
                key={`${item.menu_label}-${index}`}
                href={item.menu_link}
                target={item.open_in_new_tab ? '_blank' : undefined}
                rel={item.open_in_new_tab ? 'noreferrer' : undefined}
                className="transition hover:text-[color:var(--foreground)]"
              >
                {item.menu_label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
