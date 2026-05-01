import Link from 'next/link';

interface ToolCard {
  title?: string;
  description?: string;
  url?: string;
  cta_label?: string;
  badge_1?: string;
  badge_2?: string;
  badge_3?: string;
  status?: string;
  open_in_new_tab?: boolean;
}

interface ToolCardsSectionData {
  tool_cards?: ToolCard[];
  acf_fc_layout?: string;
}

const cardBarGradients = [
  'linear-gradient(90deg, #030CF4, #5CFFD3)',
  'linear-gradient(90deg, #5CFFD3, #BD27F6)',
  'linear-gradient(90deg, #8E38F8, #030CF4)',
];

function badgeList(card: ToolCard) {
  return [card.badge_1, card.badge_2, card.badge_3].filter(Boolean);
}

export default function DifferentTools({ data = {} }: { data?: ToolCardsSectionData }) {
  const cards = Array.isArray(data.tool_cards) ? data.tool_cards : [];

  return (
    <section>
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const badges = badgeList(card);
            const barGradient = cardBarGradients[index % cardBarGradients.length];
            const hasUrl = Boolean(card.url);

            return (
              <article
                key={`${card.title || 'tool'}-${index}`}
                className="group rounded-[14px] border border-[color:var(--border-strong)] bg-[color:var(--card)] p-7 shadow-[0_30px_80px_rgba(17,24,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_36px_100px_rgba(17,24,39,0.12)]"
              >
                <div className="mb-5 h-[2px] w-full rounded-full" style={{ backgroundImage: barGradient }} />
                <h3
                  className="mb-4 text-[20px] font-semibold leading-[1.25] text-[color:var(--foreground)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {card.title || 'Tool'}
                </h3>
                <p className="mt-4 min-h-24 text-base leading-6 text-[color:var(--muted)]">
                  {card.description || 'Tool description coming soon.'}
                </p>
                {badges.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-[color:var(--border-strong)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-8 flex items-center justify-between gap-4">
                  {hasUrl ? (
                    <Link
                      href={card.url!}
                      target={card.open_in_new_tab ? '_blank' : undefined}
                      rel={card.open_in_new_tab ? 'noreferrer' : undefined}
                      className="inline-flex items-center text-base font-semibold text-[color:var(--accent)] transition hover:text-[color:var(--foreground)]"
                    >
                      {card.cta_label || 'Open tool'} <span className="ml-1.5">→</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {card.status === 'coming_soon' && (
                    <span className="rounded-full bg-[color:var(--surface-strong)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                      Coming soon
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
