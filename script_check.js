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

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // We only want to process tool subpages, so we check if there's a pill shape.
    // The main tools page (app/tools/page.tsx) has a slightly different structure,
    // let's skip it at first or handle differently.

    // Let's match the typical tool header structure:
    // <div className="text-center max-w-3xl mx-auto mb-16">
    //     <span ...> Category </span>
    //     <h1 ...> Title </h1>
    //     <p ...> Description </p>
    // </div>
    const headerRegex = /<div className="text-center max-w-[^"]+ mx-auto mb-[^"]+">\s*<span className="[^"]+">(.*?)<\/span>\s*<h1 className="[^"]+">\s*(.*?)\s*<\/h1>\s*<p className="[^"]+">\s*(.*?)\s*<\/p>\s*<\/div>/s;

    const match = content.match(headerRegex);
    if (!match) {
        // Might be slightly different or already processed, try another regex or skip
        console.log(`No match for tool header in ${filePath}`);
        return;
    }

    const [fullMatch, category, title, description] = match;

    // Clean up title and description
    const cleanTitle = title.replace(/<br\s*\/?>/gi, '').trim();
    const cleanDesc = description.replace(/<[^>]+>/g, '').trim();

    // 1. Add metadata
    // Wait, components are marked "use client"; which means we can't export metadata from them directly in Next.js App Router.
    // Next.js App router: `metadata` only works in Server Components. If the page is `"use client"`, we can't export metadata from it.
    // We have to split it or use a separate layout.tsx / page.tsx structure. 
    // Or we can remove "use client" if it's not needed at the top level, but it usually is.
    // Let's check how many have "use client" on top.
}

walkDir(toolsDir, filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const isClient = content.includes('"use client"');
    console.log(`${filePath} - isClient: ${isClient}`);
});
