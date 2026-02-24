"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { Copy, Check, Search, Globe, Twitter, Image as ImageIcon, Code } from "lucide-react";

export default function MetaTagGeneratorTool() {
    const [title, setTitle] = useState("Awesome Next.js SaaS Template");
    const [description, setDescription] = useState("Build your next unicorn startup with this high-performance, SEO-optimized SaaS template built on Next.js 14 and Tailwind CSS.");
    const [keywords, setKeywords] = useState("saas, template, nextjs, react, tailwind");
    const [author, setAuthor] = useState("Oruzen");
    const [imageUrl, setImageUrl] = useState("https://example.com/og-image.jpg");

    // Limits
    const titleLimit = 60;
    const descLimit = 160;

    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourwebsite.com/">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourwebsite.com/">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        SEO Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Meta Tag Generator
                    </h1>
                    <p className="text-lg text-slate-500">
                        Create perfectly optimized meta tags for Google Search, Facebook (Open Graph), and Twitter cards. Boost your click-through rates.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Form Builder */}
                    <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20">
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Site Title</label>
                                    <span className={`text-xs font-bold ${title.length > titleLimit ? 'text-red-500' : 'text-slate-400'}`}>
                                        {title.length} / {titleLimit}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold ${title.length > titleLimit ? 'border-red-300' : 'border-slate-200'}`}
                                    placeholder="e.g. Oruzen - Best Software"
                                />
                                {title.length > titleLimit && <p className="text-xs text-red-500 mt-2 font-medium">Google usually truncates titles over 60 characters.</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Description</label>
                                    <span className={`text-xs font-bold ${description.length > descLimit ? 'text-red-500' : 'text-slate-400'}`}>
                                        {description.length} / {descLimit}
                                    </span>
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className={`w-full p-4 bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none ${description.length > descLimit ? 'border-red-300' : 'border-slate-200'}`}
                                    placeholder="Briefly describe your page content..."
                                />
                                {description.length > descLimit && <p className="text-xs text-red-500 mt-2 font-medium">Keep descriptions under 160 characters for optimal display.</p>}
                            </div>

                            {/* Keywords & Author */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 block">Keywords (Comma Sep.)</label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                                        placeholder="tool, seo, web"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 block">Author</label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <ImageIcon size={16} className="text-blue-500" /> OG:Image URL
                                </label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-mono"
                                    placeholder="https://example.com/banner.jpg"
                                />
                                <p className="text-xs text-slate-400 mt-2 font-medium">Image displayed when sharing on Facebook, Twitter, LinkedIn, etc (1200x630px recommended).</p>
                            </div>
                        </div>
                    </div>

                    {/* Previews & Output */}
                    <div className="lg:col-span-6 space-y-8">

                        {/* Google Preview */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Search size={16} /> Google Search Preview
                            </h3>
                            <div className="max-w-xl">
                                <div className="text-sm text-[#4d5156] mb-1 flex items-center gap-2">
                                    <Globe size={14} /> https://yourwebsite.com
                                </div>
                                <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 line-clamp-1 break-all">
                                    {title || 'Page Title'}
                                </div>
                                <div className="text-sm text-[#4d5156] line-clamp-2 leading-snug">
                                    {description || 'Page description will appear here...'}
                                </div>
                            </div>
                        </div>

                        {/* Twitter Preview */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Twitter size={16} /> Twitter Card Preview
                            </h3>
                            <div className="max-w-[500px] border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:bg-slate-50 transition-colors">
                                <div className="h-60 bg-slate-100 flex items-center justify-center border-b border-slate-200 overflow-hidden relative">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="OG" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    ) : (
                                        <ImageIcon size={32} className="text-slate-300" />
                                    )}
                                </div>
                                <div className="p-4 bg-slate-50/50">
                                    <div className="text-sm text-slate-500 mb-1">yourwebsite.com</div>
                                    <div className="font-bold text-slate-800 line-clamp-1">{title || 'Page Title'}</div>
                                    <div className="text-sm text-slate-500 mt-1 line-clamp-2">{description || 'Page description will appear here...'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Code Output */}
                        <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Code size={16} /> Generated HTML
                                </h3>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy Tags'}
                                </button>
                            </div>
                            <pre className="text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                <code>{generateCode()}</code>
                            </pre>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
