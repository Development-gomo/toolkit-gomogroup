interface HeroSectionData {
  eyebrow?: string;
  hero_heading?: string;
  hero_body?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  acf_fc_layout?: string;
}

export default function HeroSection({ data = {} }: { data?: HeroSectionData }) {
  const heading = data.hero_heading || data.title || '';
  const body = data.hero_body || data.description || '';

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 pb-12">
          <div
            className="mb-5 h-[3px] w-12 rounded-[2px]"
            style={{ background: 'linear-gradient(90deg, rgb(3, 12, 244), rgb(189, 39, 246))' }}
          />
          {heading && (
            <h1
              className="mb-4 text-[44px] font-semibold leading-[1.25] text-[color:var(--foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {heading}
            </h1>
          )}
          {body && (
            <div
              className="max-w-2xl text-[1.0625rem] leading-[1.5] text-[color:var(--muted)]"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
