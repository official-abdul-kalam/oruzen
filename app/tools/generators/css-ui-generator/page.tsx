"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { Copy, Check, SlidersHorizontal, Layers, Droplets } from "lucide-react";

export default function CSSUIGeneratorTool() {
    const [blur, setBlur] = useState(16);
    const [transparency, setTransparency] = useState(20);
    const [borderAlpha, setBorderAlpha] = useState(30);
    const [bgHex, setBgHex] = useState("#2563eb"); // Blue

    const [copied, setCopied] = useState(false);

    // Convert hex to rgb string for rgba usage
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : "255, 255, 255";
    };

    const cssCode = `/* Glassmorphism CSS */
.glass-panel {
    background: rgba(${hexToRgb(bgHex)}, ${transparency / 100});
    backdrop-filter: blur(${blur}px);
    -webkit-backdrop-filter: blur(${blur}px);
    border: 1px solid rgba(255, 255, 255, ${borderAlpha / 100});
    border-radius: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col relative overflow-hidden">
            {/* Background decoration for the "glass" to sit on */}
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-500/40 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 w-full flex-grow flex flex-col">
                <Navbar />

                <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-blue-400 font-bold tracking-wider text-sm uppercase bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4 inline-block">
                            UI Design
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            Premium Glassmorphism Generator
                        </h1>
                        <p className="text-lg text-slate-400">
                            Create stunning, modern glass UIs in seconds. Tweak the blur, transparency, and borders to get the perfect CSS code.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Interactive Preview Panel */}
                        <div className="lg:col-span-7 flex items-center justify-center min-h-[500px] relative p-8">
                            {/* The Glass Element */}
                            <div
                                className="w-full max-w-md h-[400px] rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] p-8 flex flex-col justify-between transition-all duration-100"
                                style={{
                                    background: `rgba(${hexToRgb(bgHex)}, ${transparency / 100})`,
                                    backdropFilter: `blur(${blur}px)`,
                                    WebkitBackdropFilter: `blur(${blur}px)`,
                                    border: `1px solid rgba(255, 255, 255, ${borderAlpha / 100})`
                                }}
                            >
                                <div className="space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                                        <Layers size={28} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-wide">Glassmorphism</h3>
                                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                                        This is a live preview of your generated CSS. Adjust the sliders on the right to see the effect change in real-time. Designed to blend perfectly with colorful backgrounds.
                                    </p>
                                </div>

                                <div className="w-full h-12 bg-white/10 border border-white/20 rounded-xl mt-4 flex items-center px-4 hover:bg-white/20 transition-colors cursor-pointer">
                                    <span className="text-white/60 text-sm font-semibold">Hover me!</span>
                                </div>
                            </div>
                        </div>

                        {/* Controls & Code Sidebar */}
                        <div className="lg:col-span-5 bg-[#1e293b]/80 backdrop-blur-xl p-8 rounded-[32px] border border-slate-700/50 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <SlidersHorizontal className="text-blue-400" />
                                Parameters
                            </h3>

                            <div className=" अंतरिक्षy-8 space-y-8">
                                {/* Blur */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                            <Droplets size={16} className="text-blue-400" /> Blur Intensity
                                        </label>
                                        <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                                            {blur}px
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="0" max="40" step="1"
                                        value={blur} onChange={(e) => setBlur(Number(e.target.value))}
                                        className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>

                                {/* Transparency */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                            <Layers size={16} className="text-blue-400" /> Tint Opacity
                                        </label>
                                        <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                                            {transparency}%
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" step="1"
                                        value={transparency} onChange={(e) => setTransparency(Number(e.target.value))}
                                        className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>

                                {/* Border Edge */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Edge Shine (Border)</label>
                                        <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                                            {borderAlpha}%
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" step="1"
                                        value={borderAlpha} onChange={(e) => setBorderAlpha(Number(e.target.value))}
                                        className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>

                                {/* Tint Color */}
                                <div>
                                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">Base Tint Color</label>
                                    <div className="flex gap-4">
                                        {['#ffffff', '#000000', '#2563eb', '#db2777', '#16a34a'].map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setBgHex(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${bgHex === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                        <input
                                            type="color"
                                            value={bgHex}
                                            onChange={(e) => setBgHex(e.target.value)}
                                            className="w-10 h-10 rounded-full cursor-pointer ml-auto border-0 p-0 overflow-hidden"
                                        />
                                    </div>
                                </div>

                                {/* CSS Output Code Block */}
                                <div className="mt-10 pt-8 border-t border-slate-700/50">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Generated CSS</h4>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 text-xs font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                            {copied ? 'COPIED!' : 'COPY CODE'}
                                        </button>
                                    </div>
                                    <pre className="w-full p-4 bg-[#0B1121] rounded-2xl text-sm font-mono text-blue-300 overflow-x-auto border border-slate-800 shadow-inner">
                                        <code>{cssCode}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <Footer />
            </div>
        </main>
    );
}
