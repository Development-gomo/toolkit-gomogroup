//app/page.tsx

import type { Metadata } from 'next';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import PageBuilder from './components/layout/pagebuilder.js';
import { getPageWithACF, getToolkitSettings } from '@/app/lib/wp';

interface BuilderBlock {
  acf_fc_layout?: string;
  [key: string]: unknown;
}

type ACFFields = Record<string, unknown>;

function buildHomepageModules(acf: ACFFields = {}) {
  const modules = Array.isArray(acf.website_modules) ? (acf.website_modules as BuilderBlock[]) : [];

  if (modules.length > 0) {
    return modules;
  }

  const fallbackModules: BuilderBlock[] = [];

  if (acf.eyebrow || acf.hero_heading || acf.hero_body) {
    fallbackModules.push({
      acf_fc_layout: 'hero_section',
      eyebrow: acf.eyebrow,
      hero_heading: acf.hero_heading,
      hero_body: acf.hero_body,
    });
  }

  if (acf.tools_section_label || acf.tools_section_heading || acf.tools_section_intro) {
    fallbackModules.push({
      acf_fc_layout: 'tools_section',
      tools_section_label: acf.tools_section_label,
      tools_section_heading: acf.tools_section_heading,
      tools_section_intro: acf.tools_section_intro,
    });
  }

  if (Array.isArray(acf.tool_cards) && acf.tool_cards.length > 0) {
    fallbackModules.push({
      acf_fc_layout: 'tool_cards_section',
      tool_cards: acf.tool_cards,
    });
  }

  return fallbackModules;
}

// ✅ SEO metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageWithACF('home');

  const title = data?.title || 'Tools | GO MO Group ';
  const description = data?.acf?.seo_description || 'The internal toolkit from GO MO Group.';
  const ogImage = data?.acf?.seo_image?.url || 'https://www.gomogroup.com/wp-content/uploads/2025/06/Pune-img.webp';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ Home page rendering
export default async function Home() {
  const [data, settings] = await Promise.all([getPageWithACF('home'), getToolkitSettings()]);

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="p-10 text-red-500 text-center">
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p>Unable to load home page content</p>
        </div>
      </main>
    );
  }

  const builder: BuilderBlock[] = [
    ...buildHomepageModules(data.acf || {}),
    ...(Array.isArray(data.acf?.fkab_builder) ? data.acf.fkab_builder : []),
  ];

  return (
    <>
      <Header settings={settings || {}} />
      <main className="pb-6">
        {builder.length === 0 ? (
          <div className="mx-auto max-w-4xl px-6 py-20 md:px-10">
            <div className="rounded-[2rem] border border-[color:var(--border-soft)] bg-[color:var(--card)] p-10 shadow-[0_30px_80px_rgba(17,24,39,0.08)]">
              <h2 className="font-serif text-3xl font-semibold text-[color:var(--foreground)]">No content modules found</h2>
              <p className="mt-4 text-lg leading-8 text-[color:var(--muted)]">
                Add the Home Page field group to the Home page and insert the flexible content layouts in this order:
                hero section, tools section, then tool cards section.
              </p>
            </div>
          </div>
        ) : (
          <PageBuilder blocks={builder} />
        )}
      </main>
      <Footer settings={settings || {}} />
    </>
  );
}
