import Link from 'next/link';

function normalizeFooterLinks(links = []) {
  if (!Array.isArray(links)) return [];

  return links.filter((item) => item?.label && item?.url);
}

export default function Footer({ settings = {} }) {
  const footerText = settings.footer_text || '';
  const footerLinks = normalizeFooterLinks(settings.footer_links);
  const footerCopyright = settings.footer_copyright || '';

  return (
    <footer className="bg-[#0d1623] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 pb-12 text-center">
        {footerText && <p className="mx-auto text-center text-sm leading-7 text-white/70">{footerText}</p>}
        {footerLinks.length > 0 && (
          <nav className="mt-3 mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/85">
            {footerLinks.map((item, index) => (
              <Link
                key={`${item.label}-${index}`}
                href={item.url}
                target={item.open_in_new_tab ? '_blank' : undefined}
                rel={item.open_in_new_tab ? 'noreferrer' : undefined}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        {footerCopyright && <p className="mb-3 text-center text-sm text-white/55">{footerCopyright}</p>}
      </div>
    </footer>
  );
}
