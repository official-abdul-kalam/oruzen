"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Images,
    Wand2,
    Search,
    Type,
    Code,
    Palette,
    Sparkles,
    QrCode,
    Shield,
    FileJson,
    Hash,
    FileImage,
    PenTool,
    Briefcase,
    Youtube,
    BookOpen,
    Landmark,
    Zap
} from "lucide-react";

// The new SEO-friendly architecture
const toolCategories = [
    {
        id: "converters",
        title: "Converters",
        desc: "Transform files and formats instantly.",
        icon: Images,
        href: "/tools/converters",
        tools: [
            { name: "Image to WebP", href: "/tools/converters/image-to-webp", icon: FileImage },
            { name: "SVG to PNG/JPEG", href: "/tools/converters/svg-to-png", icon: Images },
            { name: "Lossless Compressor", href: "/tools/converters/image-compressor", icon: Zap }
        ]
    },
    {
        id: "generators",
        title: "Generators",
        desc: "Create codes, UI, and secure passwords.",
        icon: Wand2,
        href: "/tools/generators",
        tools: [
            { name: "QR Code Generator", href: "/tools/generators/qr-code", icon: QrCode },
            { name: "Secure Password", href: "/tools/generators/password-generator", icon: Shield },
            { name: "CSS UI Generator", href: "/tools/generators/css-ui-generator", icon: Palette }
        ]
    },
    {
        id: "seo",
        title: "SEO Tools",
        desc: "Optimize your web presence effortlessly.",
        icon: Search,
        href: "/tools/seo",
        tools: [
            { name: "Meta Tag Generator", href: "/tools/seo/meta-tag-generator", icon: Search }
        ]
    },
    {
        id: "text",
        title: "Text & Writing",
        desc: "Analyze and manipulate text content.",
        icon: Type,
        href: "/tools/text",
        tools: [
            { name: "Word & Char Counter", href: "/tools/text/word-counter", icon: Hash },
            { name: "Text to Handwriting", href: "/tools/education/text-to-handwriting", icon: BookOpen }
        ]
    },
    {
        id: "business",
        title: "Business Utilities",
        desc: "Invoicing and professional tools.",
        icon: Briefcase,
        href: "/tools/business",
        tools: [
            { name: "Invoice PDF Generator", href: "/tools/business/invoice-generator", icon: Briefcase },
            { name: "Online Signature Maker", href: "/tools/business/signature-maker", icon: PenTool }
        ]
    },
    {
        id: "social",
        title: "Social Media",
        desc: "Tools for ultimate content creators.",
        icon: Youtube,
        href: "/tools/social",
        tools: [
            { name: "YouTube Thumbnail Downloader", href: "/tools/social/youtube-thumbnail-downloader", icon: Youtube },
            { name: "YouTube Video Downloader", href: "/tools/social/youtube-video-downloader", icon: Youtube }
        ]
    },
    {
        id: "developer",
        title: "Developer Utilities",
        desc: "Formatters and parsers for developers.",
        icon: Code,
        href: "/tools/developer",
        tools: [
            { name: "JSON Formatter", href: "/tools/developer/json-formatter", icon: FileJson }
        ]
    },
    {
        id: "finance",
        title: "Finance & Wealth",
        desc: "Interactive calculators for mutual funds and loans.",
        icon: Landmark,
        href: "/tools/finance",
        tools: [
            { name: "SIP & EMI Calculator", href: "/tools/finance/sip-emi-calculator", icon: Landmark }
        ]
    },
    {
        id: "utilities",
        title: "Daily Utilities",
        desc: "Essential everyday file manipulation tools.",
        icon: Briefcase,
        href: "/tools/utilities",
        tools: [
            { name: "PDF Merger", href: "/tools/utilities/pdf-merger", icon: Briefcase }
        ]
    },
    {
        id: "design",
        title: "Design",
        desc: "Color palettes and UI inspiration.",
        icon: Palette,
        href: "/tools/design",
        tools: [
            { name: "Color Extractor", href: "/tools/design/color-palette-extractor", icon: Palette }
        ]
    },
    {
        id: "ai",
        title: "AI Tools",
        desc: "Smart artificial intelligence utilities.",
        icon: Sparkles,
        href: "/tools/ai",
        tools: [
            { name: "Background Remover", href: "/tools/ai/background-remover", icon: Sparkles }
        ]
    }
];

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                        Oruzen Utility Ecosystem
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#0f172a] mt-6 mb-6 tracking-tight">
                        Powerful Free Web Tools
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        A premium collection of the most useful browser-based utilities.
                        No signups, no servers, fully secure.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {toolCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
                                    <category.icon size={26} strokeWidth={2} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{category.title}</h2>
                                    <p className="text-sm text-slate-500 font-medium">{category.tools.length} Tools</p>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                                {category.desc}
                            </p>

                            <div className="space-y-3 mt-auto">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Popular in this category</h3>
                                {category.tools.map((tool, tIdx) => (
                                    <Link
                                        key={tIdx}
                                        href={tool.href}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-colors group/tool"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover/tool:text-blue-500 shadow-sm border border-slate-100">
                                            <tool.icon size={16} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 group-hover/tool:text-blue-600">
                                            {tool.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
