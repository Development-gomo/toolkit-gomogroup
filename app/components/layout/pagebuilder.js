//components/layout/pagebuilder.jsx
import HeroSection from '@/app/components/section/herosection';
import DifferentTools from '@/app/components/section/DifferentTools';
import ToolsIntro from '@/app/components/section/toolsintro';

export default function PageBuilder({ blocks }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, index) => {
       const layout = block.acf_fc_layout || block.layout;
        switch (layout) {
          case 'hero_section': return <HeroSection key={index} data={block} />;
          case 'tools_section': return <ToolsIntro key={index} data={block} />;
          case 'tool_cards_section': return <DifferentTools key={index} data={block} />;
          default: return null;
        }
      })}
    </>
  );
}
