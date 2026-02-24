"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Image as ImageIcon, Download, Settings2, Code, FileCode2 } from "lucide-react";

interface SVGFile {
    file: File;
    name: string;
    content: string; // The raw SVG string
    url: string; // Object URL for preview
}

export default function SVGConverterTool() {
    const [svgs, setSvgs] = useState<SVGFile[]>([]);
    const [scale, setScale] = useState(2); // 2x scale for better PNG quality
    const [format, setFormat] = useState<'image/png' | 'image/jpeg'>('image/png');
    const [bgColor, setBgColor] = useState('#ffffff');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const newSvgs = await Promise.all(acceptedFiles.map(async (file) => {
            const text = await file.text();
            // Basic check if it's an SVG
            if (!text.includes('<svg')) return null;

            return {
                file,
                name: file.name,
                content: text,
                url: URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }))
            };
        }));

        const validSvgs = newSvgs.filter(Boolean) as SVGFile[];
        setSvgs(prev => [...prev, ...validSvgs]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/svg+xml': ['.svg']
        }
    });

    const handleDownload = async (svgFile: SVGFile) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create an Image object from the SVG
        const img = new window.Image();

        // We need to ensure the SVG has explicit width/height to draw cleanly
        let svgContent = svgFile.content;
        if (!svgContent.includes('width=') && !svgContent.includes('height=')) {
            // Very rudimentary fallback if dimensions are missing
            svgContent = svgContent.replace('<svg', '<svg width="512" height="512"');
        }

        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            // Set canvas size scaled up
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            // Fill background if JPEG or if PNG and transparent bg color is selected
            if (format === 'image/jpeg' || (format === 'image/png' && bgColor !== 'transparent')) {
                ctx.fillStyle = bgColor === 'transparent' ? '#ffffff' : bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (format === 'image/png' && bgColor === 'transparent') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            // Draw image scaled
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Export to PNG/JPEG
            const dataUrl = canvas.toDataURL(format, 1.0);
            const link = document.createElement('a');
            link.download = `${svgFile.name.replace('.svg', '')}.${format === 'image/png' ? 'png' : 'jpg'}`;
            link.href = dataUrl;
            link.click();
            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    const handleDownloadAll = () => {
        svgs.forEach(svg => handleDownload(svg));
    };

    const removeSvg = (urlToRemove: string) => {
        setSvgs(prev => prev.filter(s => s.url !== urlToRemove));
        URL.revokeObjectURL(urlToRemove);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            {/* Hidden canvas for drawing operations */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Converters
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        SVG to PNG/JPEG Converter
                    </h1>
                    <p className="text-lg text-slate-500">
                        Convert vector graphic SVG files into standard raster images flawlessly. Supports High-Res upscaling and background color handling.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Main Dropzone & List */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer bg-white overflow-hidden relative ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <FileCode2 size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                {isDragActive ? "Drop SVG files here" : "Drag & drop SVG files"}
                            </h3>
                            <p className="text-slate-500">
                                Multi-file selection supported
                            </p>
                        </div>

                        {/* File List */}
                        <AnimatePresence>
                            {svgs.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
                                >
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <span className="font-bold text-slate-700">{svgs.length} SVGs Added</span>
                                        <button
                                            onClick={handleDownloadAll}
                                            className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors flex items-center gap-2"
                                        >
                                            <Download size={16} /> Convert All
                                        </button>
                                    </div>

                                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto p-4 grid sm:grid-cols-2 gap-4">
                                        {svgs.map((svg, idx) => (
                                            <div key={idx} className="p-4 border border-slate-200 rounded-2xl flex flex-col gap-4 bg-slate-50 group hover:shadow-md transition-shadow relative">
                                                <button
                                                    onClick={() => removeSvg(svg.url)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-sm"
                                                >
                                                    &times;
                                                </button>

                                                {/* Checkerboard background for light SVGs */}
                                                <div className="h-32 rounded-xl flex items-center justify-center p-4 border border-slate-100" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f1f5f9 25%, transparent 25%, transparent 75%, #f1f5f9 75%, #f1f5f9), repeating-linear-gradient(45deg, #f1f5f9 25%, bg-white 25%, bg-white 75%, #f1f5f9 75%, #f1f5f9)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px', backgroundColor: 'white' }}>
                                                    <img src={svg.url} alt="SVG Preview" className="max-h-full max-w-full" />
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm font-bold text-slate-800 truncate pr-4">
                                                        {svg.name}
                                                    </p>
                                                    <button
                                                        onClick={() => handleDownload(svg)}
                                                        className="w-10 h-10 rounded-xl bg-blue-100 flex shrink-0 items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                                                        title="Download individual"
                                                    >
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20 sticky top-32">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <Settings2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Export Settings</h3>
                        </div>

                        <div className="space-y-8">
                            {/* Format */}
                            <div>
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 block">Output Format</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setFormat('image/png')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${format === 'image/png' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        PNG
                                    </button>
                                    <button
                                        onClick={() => setFormat('image/jpeg')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${format === 'image/jpeg' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        JPEG
                                    </button>
                                </div>
                            </div>

                            {/* Scale */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Upscale (High-Res)</label>
                                    <span className="text-sm font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                                        {scale}x
                                    </span>
                                </div>
                                <input
                                    type="range" min="1" max="10" step="1"
                                    value={scale} onChange={(e) => setScale(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <p className="text-xs text-slate-400 font-medium mt-2">
                                    Mutiplies the intrinsic width/height of the SVG before rendering to pixels. (e.g. 100px SVG at 5x = 500px Image)
                                </p>
                            </div>

                            {/* Background Color */}
                            <div className={`transition-opacity ${format === 'image/png' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 block">Background Color</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input
                                            type="radio"
                                            name="bg"
                                            checked={bgColor === 'transparent'}
                                            onChange={() => setBgColor('transparent')}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-bold text-slate-700">Transparent (PNG only)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input
                                            type="radio"
                                            name="bg"
                                            checked={bgColor === '#ffffff'}
                                            onChange={() => setBgColor('#ffffff')}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-bold text-slate-700">Solid White</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
