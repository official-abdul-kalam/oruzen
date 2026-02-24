"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Type, RefreshCw, Sun, FileText, Settings, Droplets, PenTool } from "lucide-react";

export default function TextToHandwritingTool() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const downloadImgRef = useRef<HTMLImageElement>(null);

    // Default Content
    const [text, setText] = useState("Hello there! 👋\n\nThis is a real-time text to handwriting converter.\nIt looks exactly like physical notebook paper written with a blue ink pen.\n\nEnjoy converting your assignments to digital notes! ✨");

    // Styling State
    const [fontFamily, setFontFamily] = useState("'Caveat', cursive");
    const [inkColor, setInkColor] = useState("#2e3770"); // Realistic ballpoint blue
    const [fontSize, setFontSize] = useState(26);
    const [lineSpace, setLineSpace] = useState(38); // Match standard lined paper
    const [wordSpacing, setWordSpacing] = useState(4);

    // Paper Effects
    const [paperTexture, setPaperTexture] = useState("lined"); // 'plain', 'lined', 'grid', 'crumpled'
    const [cameraLighting, setCameraLighting] = useState(true);

    // Font Options
    const fonts = [
        { name: "Beautiful Cursive", family: "'Caveat', cursive" },
        { name: "Messy Student", family: "'Indie Flower', cursive" },
        { name: "Neat Print", family: "'Shadows Into Light', cursive" },
        { name: "Elegant Script", family: "'Dancing Script', cursive" }
    ];

    // Load Google Fonts dynamically
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Indie+Flower&family=Shadows+Into+Light&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Force a redraw after fonts load
        setTimeout(() => drawCanvas(), 1000);
        return () => { document.head.removeChild(link); };
    }, []);

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Realistic A4 Aspect Ratio Dimensions for high quality
        canvas.width = 1240;
        canvas.height = 1754;

        // 1. Draw Paper Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Paper Textures
        if (paperTexture === "lined") {
            ctx.fillStyle = "#f5f5f5";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Red margin line
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 100, 100, 0.5)";
            ctx.lineWidth = 2;
            ctx.moveTo(150, 0);
            ctx.lineTo(150, canvas.height);
            ctx.stroke();

            // Blue horizontal lines
            ctx.beginPath();
            ctx.strokeStyle = "rgba(100, 150, 255, 0.4)";
            ctx.lineWidth = 1;

            const startY = 150;
            const scaledLineSpace = lineSpace * 1.5; // Scale up for 1240x1754 res

            for (let y = startY; y < canvas.height; y += scaledLineSpace) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();
        } else if (paperTexture === "grid") {
            ctx.fillStyle = "#fafafa";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = "rgba(100, 150, 255, 0.2)";
            ctx.lineWidth = 1;
            const gridSpace = 40;
            for (let x = 0; x < canvas.width; x += gridSpace) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
            for (let y = 0; y < canvas.height; y += gridSpace) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
            ctx.stroke();
        }

        // 2. Draw Handwriting
        const scaledFontSize = fontSize * 1.5; // Scale up for high-res canvas
        const scaledLineSpace = lineSpace * 1.5;

        ctx.fillStyle = inkColor;
        // Make font look a bit blurry/realistic like ink bleeding
        ctx.filter = 'blur(0.3px)';
        ctx.font = `${scaledFontSize}px ${fontFamily}`;

        const lines = text.split('\n');
        let currentY = paperTexture === 'lined' ? 140 : 100; // Start at first line
        const startX = paperTexture === 'lined' ? 170 : 100;

        lines.forEach((line) => {
            const words = line.split(' ');
            let currentX = startX;

            words.forEach((word) => {
                // Slight randomness for realistic handwriting
                const randomYOffset = (Math.random() - 0.5) * 2;

                ctx.fillText(word, currentX, currentY + randomYOffset);

                const wordWidth = ctx.measureText(word).width;
                currentX += wordWidth + (wordSpacing * 3); // space between words

                // Basic Word Wrap logic (naive)
                if (currentX > canvas.width - 100) {
                    currentX = startX;
                    currentY += scaledLineSpace;
                }
            });
            currentY += scaledLineSpace;
        });

        // Reset filter
        ctx.filter = 'none';

        // 3. Add Camera Lighting / Vignette Effects
        if (cameraLighting) {
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, canvas.width / 4,
                canvas.width / 2, canvas.height / 2, canvas.width
            );

            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(200, 200, 190, 0.1)'); // Slight yellow tint from room light
            gradient.addColorStop(1, 'rgba(50, 50, 40, 0.35)');     // Dark vignette shadow

            ctx.fillStyle = gradient;
            // Use multiply to overlay shadow without losing ink color
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Top glare
            const glare = ctx.createLinearGradient(0, 0, canvas.width, 0);
            glare.addColorStop(0, 'rgba(255,255,255,0.2)');
            glare.addColorStop(0.2, 'rgba(255,255,255,0)');
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = glare;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'source-over'; // Reset
        }

    }, [text, fontFamily, inkColor, fontSize, lineSpace, wordSpacing, paperTexture, cameraLighting]);

    // Redraw whenever state changes
    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    // Export Logic
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `handwritten_notes_${new Date().getTime()}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 0.9);
        link.click();
    };

    return (
        <main className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden text-slate-200">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10 flex flex-col">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="text-amber-400 font-bold tracking-wider text-sm uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 mb-4 inline-flex items-center gap-2">
                        <Type size={16} /> Education Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Realistic Text to Handwriting
                    </h1>
                    <p className="text-lg text-slate-400">
                        Convert digital text into ultra-realistic handwritten notes. Perfect for assignments. 100% free and private.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 flex-grow">

                    {/* Controls Panel */}
                    <div className="lg:w-1/3 bg-[#1e293b]/50 backdrop-blur-xl p-6 rounded-[32px] border border-slate-700/50 shadow-2xl space-y-8 h-max sticky top-32 overflow-y-auto max-h-[85vh] custom-scrollbar">

                        {/* Text Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 border-b border-slate-700 pb-2">
                                <FileText size={16} className="text-blue-400" /> Note Content
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-48 p-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono"
                                placeholder="Type your text here..."
                            />
                        </div>

                        {/* Handwriting Style */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 border-b border-slate-700 pb-2">
                                <PenTool size={16} className="text-amber-400" /> Pen & Handwriting
                            </label>

                            <div className="grid grid-cols-2 gap-2">
                                {fonts.map(font => (
                                    <button
                                        key={font.name}
                                        onClick={() => setFontFamily(font.family)}
                                        className={`p-3 rounded-xl border text-sm text-left transition-all ${fontFamily === font.family ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                                    >
                                        {font.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 items-center mt-4">
                                <div className="flex-grow space-y-2">
                                    <div className="flex justify-between text-xs text-slate-400 font-bold">
                                        <span>Font Size</span> <span>{fontSize}px</span>
                                    </div>
                                    <input type="range" min="16" max="40" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-amber-500" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs text-slate-400 font-bold">Ink Color</div>
                                    <input type="color" value={inkColor} onChange={(e) => setInkColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-slate-800 border-none p-1" />
                                </div>
                            </div>
                        </div>

                        {/* Paper & Effects */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 border-b border-slate-700 pb-2">
                                <Droplets size={16} className="text-teal-400" /> Paper & Realism
                            </label>

                            <select
                                value={paperTexture}
                                onChange={(e) => setPaperTexture(e.target.value)}
                                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-teal-500"
                            >
                                <option value="lined">Standard Lined Paper</option>
                                <option value="plain">Plain White Paper</option>
                                <option value="grid">Math Grid Paper</option>
                            </select>

                            <button
                                onClick={() => setCameraLighting(!cameraLighting)}
                                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${cameraLighting ? 'bg-teal-500/20 border-teal-500/50 text-teal-300 font-bold' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                            >
                                <span className="flex items-center gap-2"><Sun size={18} /> Camera Lighting Shadows</span>
                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${cameraLighting ? 'bg-teal-500' : 'bg-slate-700'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${cameraLighting ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="pt-4">
                            <button
                                onClick={handleDownload}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                            >
                                <Download size={18} /> Download Realistic JPG
                            </button>
                        </div>

                    </div>

                    {/* Canvas Preview Area */}
                    <div className="lg:w-2/3 bg-slate-900/50 border border-slate-800 rounded-[32px] p-4 sm:p-8 flex items-center justify-center overflow-hidden">

                        <div className="relative w-full max-w-2xl mx-auto shadow-2xl transition-transform hover:scale-[1.02]">
                            {/* We use a hidden actual canvas for high-res drawing, and display it via CSS scaling */}
                            <canvas
                                ref={canvasRef}
                                className="w-full h-auto bg-white rounded-md shadow-2xl"
                                style={{ aspectRatio: '1240 / 1754' }}
                            />

                            {/* Watermark/Proof tag */}
                            <div className="absolute -bottom-10 right-0 text-slate-500 text-sm font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Client-side rendering active
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
