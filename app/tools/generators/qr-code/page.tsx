"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Download, Link as LinkIcon, Palette, Image as ImageIcon, Copy, Check } from "lucide-react";
import html2canvas from "html2canvas";

export default function QRCodeGeneratorTool() {
    const [url, setUrl] = useState("https://oruzen.com");
    const [fgColor, setFgColor] = useState("#0f172a");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [logoIncluded, setLogoIncluded] = useState(false);
    const [copied, setCopied] = useState(false);

    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = async (format: 'png' | 'svg') => {
        if (!qrRef.current) return;

        if (format === 'png') {
            const canvas = await html2canvas(qrRef.current, { backgroundColor: null });
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `oruzen-qr-code.png`;
            link.href = dataUrl;
            link.click();
        } else {
            // For SVG download, we need to extract the SVG element
            const svgData = new XMLSerializer().serializeToString(qrRef.current.querySelector('svg') as SVGElement);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `oruzen-qr-code.svg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="mb-12">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Generators
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Advanced QR Code Generator
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        Create custom, high-resolution QR codes for your links, text, or WiFi.
                        Totally free, private, and runs directly in your browser.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Controls Configurator */}
                    <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20">
                        <div className="space-y-8">

                            {/* URL Input */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                    <LinkIcon size={16} className="text-blue-500" /> Target URL or Text
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full h-14 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-lg"
                                        placeholder="https://example.com"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="absolute right-3 p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Copy URL"
                                    >
                                        {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                        <Palette size={16} className="text-blue-500" /> Foreground Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="w-14 h-14 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1"
                                        />
                                        <input
                                            type="text"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="flex-1 h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 uppercase font-mono"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                        <Palette size={16} className="text-blue-500" /> Background Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-14 h-14 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1"
                                        />
                                        <input
                                            type="text"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="flex-1 h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 uppercase font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Logos */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
                                    <ImageIcon size={16} className="text-blue-500" /> Add Center Icon
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setLogoIncluded(false)}
                                        className={`px-6 py-3 rounded-xl border font-semibold transition-all ${!logoIncluded
                                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        None
                                    </button>
                                    <button
                                        onClick={() => setLogoIncluded(true)}
                                        className={`px-6 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-semibold ${logoIncluded
                                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md"></div>
                                        Oruzen Logo
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Preview & Download */}
                    <div className="lg:col-span-4 bg-[#0f172a] rounded-3xl p-8 sticky top-32 text-center shadow-2xl flex flex-col items-center border border-slate-800">
                        <h3 className="text-white font-bold mb-8 text-xl">Live Preview</h3>

                        {/* QR Code Canvas */}
                        <div
                            ref={qrRef}
                            className="bg-white p-6 rounded-3xl shadow-2xl flex items-center justify-center mb-10 overflow-hidden"
                            style={{ backgroundColor: bgColor }}
                        >
                            <QRCodeSVG
                                value={url || 'https://oruzen.com'}
                                size={220}
                                bgColor="transparent"
                                fgColor={fgColor}
                                level="H"
                                marginSize={0}
                                imageSettings={logoIncluded ? {
                                    src: "/logo.png",
                                    x: undefined,
                                    y: undefined,
                                    height: 48,
                                    width: 48,
                                    excavate: true,
                                } : undefined}
                            />
                        </div>

                        {/* Download Buttons */}
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <button
                                onClick={() => handleDownload('png')}
                                className="flex items-center justify-center gap-2 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                            >
                                <Download size={18} /> PNG
                            </button>
                            <button
                                onClick={() => handleDownload('svg')}
                                className="flex items-center justify-center gap-2 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors backdrop-blur-md"
                            >
                                <Download size={18} /> SVG
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
