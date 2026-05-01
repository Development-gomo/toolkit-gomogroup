// app/[slug]/page.tsx

import type { Metadata } from 'next';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import PageBuilder from '../components/layout/pagebuilder.js';
import { getPageWithACF, getToolkitSettings } from '@/app/lib/wp';

interface BuilderBlock {
  acf_fc_layout?: string;
  [key: string]: unknown;
}

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

function buildPageModules(acf = {}) {
  const modules = Array.isArray(acf.website_modules) ? acf.website_modules : [];

  if (modules.length > 0) {
    return modules;
  }

  const fallbackModules: BuilderBlock[] = [];

  if (acf.eyebrow || acf.hero_heading || acf.hero_body || acf.subtitle || acf.title || acf.description) {
    fallbackModules.push({
      acf_fc_layout: 'hero_section',
      eyebrow: acf.eyebrow,
      hero_heading: acf.hero_heading,
      hero_body: acf.hero_body,
      subtitle: acf.subtitle,
      title: acf.title,
      description: acf.description,
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

// ✅ SEO generation
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageWithACF(slug);
  
  const title = page?.title || 'Page Not Found | GO MO Group';
  const description = page?.acf?.seo_description || 'The internal toolkit from GO MO Group.';
  const ogImage = page?.acf?.seo_image?.url || 'https://www.gomogroup.com/wp-content/uploads/2025/06/Pune-img.webp';

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

export default async function DynamicPage({ params }: PageParams) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([getPageWithACF(slug), getToolkitSettings()]);

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-[80px] w-full bg-black"></div> 
          <div className="pt-40 font-bold text-9xl mb-5">404</div>
          <div className="pb-40 font-bold text-5xl text-[#133a5b]">Page not found</div>
        </div>
      </main>
    );
  }

  const builder: BuilderBlock[] = [
    ...buildPageModules(data.acf || {}),
    ...(Array.isArray(data.acf?.ca_builder) ? data.acf.ca_builder : []),
  ];

  return (
    <>
      <Header settings={settings || {}} />
      <main className="pages min-h-screen pb-6">
        {builder.length === 0 ? (
          <div className="mx-auto max-w-4xl px-6 py-20 md:px-10">
            <div className="rounded-[2rem] border border-[color:var(--border-soft)] bg-[color:var(--card)] p-10 shadow-[0_30px_80px_rgba(17,24,39,0.08)]">
              <h2 className="font-serif text-3xl font-semibold text-[color:var(--foreground)]">No content modules found</h2>
              <p className="mt-4 text-lg leading-8 text-[color:var(--muted)]">
                Add the Home Page field group to this page and insert the flexible content layouts in this order:
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
