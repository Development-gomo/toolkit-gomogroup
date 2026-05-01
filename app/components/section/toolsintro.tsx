interface ToolsIntroSectionData {
  tools_section_label?: string;
  tools_section_heading?: string;
  tools_section_intro?: string;
  acf_fc_layout?: string;
}

export default function ToolsIntro({ data = {} }: { data?: ToolsIntroSectionData }) {
  const heading = data.tools_section_heading || '';

  return (
    <section>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="max-w-3xl">
          {heading && (
            <h2
              className="mb-4 text-[32px] font-semibold leading-[1.25] text-[color:var(--foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {heading}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
