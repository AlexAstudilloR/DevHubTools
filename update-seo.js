const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'app', '[locale]', 'tools');

const tools = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

tools.forEach(tool => {
  const pagePath = path.join(toolsDir, tool, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if it already has generateMetadata
    if (content.includes('generateMetadata')) return;

    // Remove static metadata
    content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};\n*/g, '');
    
    // Add import for constructMetadata and getTranslations
    if (!content.includes('constructMetadata')) {
      content = `import { constructMetadata } from "@/lib/seo";\nimport { getTranslations } from "next-intl/server";\n` + content;
    }

    // Add generateMetadata
    const generateMetadataCode = `\nexport async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('${tool}.name'),
    description: t('${tool}.description'),
    url: \`/tools/${tool}\`,
    locale
  });
}\n\n`;

    // Insert before default export
    content = content.replace(/export default function/, generateMetadataCode + 'export default function');

    fs.writeFileSync(pagePath, content);
    console.log(`Updated SEO for ${tool}`);
  }
});
