"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Type, FileText, CheckCircle2, Clock, Hash, Percent, Trash2, Copy, Check } from "lucide-react";

export default function WordCounterTool() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
    });
    const [keywords, setKeywords] = useState<{ word: string, count: number, percent: string }[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        analyzeText(text);
    }, [text]);

    const analyzeText = (t: string) => {
        // Basic Stats
        const words = t.match(/\b[-?(\w+)?]+\b/gi) || [];
        const characters = t.length;
        const charactersNoSpaces = t.replace(/\s+/g, '').length;
        const sentences = t.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = t.split(/\n\s*\n/).filter(Boolean).length;

        // Time (avg reading speed is 200 WPM, speaking is 130 WPM)
        const readingTime = Math.ceil(words.length / 200);
        const speakingTime = Math.ceil(words.length / 130);

        setStats({
            words: words.length,
            characters,
            charactersNoSpaces,
            sentences,
            paragraphs,
            readingTime,
            speakingTime
        });

        // Keyword Density
        if (words.length > 0) {
            const wordCounts: Record<string, number> = {};
            const stopWords = ['the', 'is', 'in', 'at', 'of', 'on', 'and', 'a', 'to', 'for', 'it', 'with', 'as', 'by', 'this', 'that'];

            words.forEach(w => {
                const lower = w.toLowerCase();
                if (!stopWords.includes(lower) && lower.length > 2) {
                    wordCounts[lower] = (wordCounts[lower] || 0) + 1;
                }
            });

            const sortedObj = Object.entries(wordCounts)
                .map(([word, count]) => ({
                    word,
                    count,
                    percent: ((count / words.length) * 100).toFixed(1)
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5); // Top 5

            setKeywords(sortedObj);
        } else {
            setKeywords([]);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear the editor?")) {
            setText("");
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Text & Writing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Word & Character Counter
                    </h1>
                    <p className="text-lg text-slate-500">
                        Analyze your text in real-time. perfect for essays, tweets, SEO content, and general writing metrics.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Main Editor */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Top Stats Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                                <span className="block text-4xl font-extrabold text-[#0f172a] mb-1">{stats.words}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Words</span>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                                <span className="block text-4xl font-extrabold text-blue-500 mb-1">{stats.characters}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Characters</span>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                                <span className="block text-4xl font-extrabold text-purple-500 mb-1">{stats.sentences}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sentences</span>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                                <span className="block text-4xl font-extrabold text-emerald-500 mb-1">{stats.paragraphs}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paragraphs</span>
                            </div>
                        </div>

                        {/* Text Area */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden flex flex-col h-[500px]">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div className="flex items-center gap-2">
                                    <Type size={18} className="text-slate-400" />
                                    <span className="font-bold text-slate-700">Text Editor</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="w-10 h-10 bg-white border border-slate-200 text-slate-500 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center font-bold"
                                        title="Copy Text"
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="w-10 h-10 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center font-bold"
                                        title="Clear Editor"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full flex-grow p-6 bg-transparent resize-none focus:outline-none text-slate-800 leading-relaxed text-lg placeholder:text-slate-300"
                                placeholder="Start typing or paste your document here..."
                            />
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-6 sticky top-32">

                        {/* Reading Time */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" /> Time Estimates
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <FileText size={18} className="text-slate-400" />
                                        <span className="font-bold text-slate-600">Reading Time</span>
                                    </div>
                                    <span className="font-bold text-[#0f172a]">~{stats.readingTime} min</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className="text-slate-400" />
                                        <span className="font-bold text-slate-600">Speaking Time</span>
                                    </div>
                                    <span className="font-bold text-[#0f172a]">~{stats.speakingTime} min</span>
                                </div>
                            </div>
                        </div>

                        {/* Density */}
                        <div className="bg-[#0f172a] p-8 rounded-3xl shadow-xl shadow-[#0f172a]/20 border border-slate-800">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Hash size={20} className="text-blue-400" /> Keyword Density
                            </h3>

                            {keywords.length > 0 ? (
                                <div className="space-y-4">
                                    {keywords.map((kw, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-bold text-slate-300 truncate pr-4">{kw.word}</span>
                                                <div className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg shrink-0">
                                                    {kw.count} <span className="text-slate-500 font-medium">({kw.percent}%)</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(Number(kw.percent) * 5, 100)}%` }} // Scaled visually
                                                    className="h-full bg-blue-500 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed">
                                    <Percent size={24} className="mx-auto mb-2 text-slate-500" />
                                    <p className="text-sm text-slate-400 font-medium">Add text to see keyword density.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
