const fs = require('fs');
const path = require('path');

const toolsDir = 'c:/Users/abdul/Desktop/ORUZEN/oruzen/app/tools';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (f !== 'page.tsx' && fs.statSync(dirPath).isDirectory()) {
            walkDir(dirPath, callback);
        } else if (f === 'page.tsx') {
            callback(dirPath);
        }
    });
}

const headerRegex = /<div className="([^"]*)text-center([^"]*)">\s*<span className="[^"]+">(.*?)<\/span>\s*<h1 className="[^"]+">\s*(.*?)\s*<\/h1>\s*<p className="[^"]+">\s*(.*?)\s*<\/p>\s*<\/div>/s;

walkDir(toolsDir, filePath => {
    // Skip the main tools page
    if (path.normalize(filePath) === path.normalize(path.join(toolsDir, 'page.tsx'))) {
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Attempt match
    const match = content.match(headerRegex);
    if (!match) {
        console.log(`No match for tool header in ${filePath}`);
        return;
    }

    const [fullMatch, cls1, cls2, category, title, description] = match;

    // Clean up title and description for metadata
    const cleanTitle = title.replace(/<[^>]+>/g, '').trim();
    const cleanDesc = description.replace(/<[^>]+>/g, '').trim();

    // 1. Create layout.tsx for SEO
    const layoutPath = path.join(path.dirname(filePath), 'layout.tsx');
    const layoutContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '${cleanTitle.replace(/'/g, "\\'")} | Oruzen Tools',
    description: '${cleanDesc.replace(/'/g, "\\'")}',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
`;
    // Write layout.tsx
    fs.writeFileSync(layoutPath, layoutContent, 'utf8');
    console.log(`Created ${layoutPath}`);

    // 2. Replace the old UI header with the new premium minimal one
    const newHeader = `<div className="mb-10 pb-6 border-b border-slate-100">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
                        ${title.trim()}
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        ${description.trim()}
                    </p>
                </div>`;

    const newContent = content.replace(fullMatch, newHeader);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
});
