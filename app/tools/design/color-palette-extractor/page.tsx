"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Palette, Copy, Check, X } from "lucide-react";
// @ts-ignore
import ColorThief from "colorthief";

interface ColorPalette {
    rgb: [number, number, number];
    hex: string;
}

export default function ColorExtractorTool() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dominantColor, setDominantColor] = useState<ColorPalette | null>(null);
    const [palette, setPalette] = useState<ColorPalette[]>([]);
    const [copiedHex, setCopiedHex] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    };

    const extractColors = (imgUrl: string) => {
        setLoading(true);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imgUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();

                // Dominant Color
                const domRgb = colorThief.getColor(img);
                setDominantColor({
                    rgb: domRgb as [number, number, number],
                    hex: rgbToHex(domRgb[0], domRgb[1], domRgb[2])
                });

                // Palette (8 colors)
                const paletteRgb = colorThief.getPalette(img, 8);
                const newPalette = paletteRgb.map((p: any) => ({
                    rgb: p as [number, number, number],
                    hex: rgbToHex(p[0], p[1], p[2])
                }));
                setPalette(newPalette);
            } catch (err) {
                console.error("Color extraction failed:", err);
            } finally {
                setLoading(false);
            }
        };
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            extractColors(url);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg'] },
        maxFiles: 1
    });

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        setTimeout(() => setCopiedHex(null), 2000);
    };

    const clearImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setDominantColor(null);
        setPalette([]);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative"
            style={dominantColor ? {
                // Subtle dynamic background based on image
                backgroundColor: `rgba(${dominantColor.rgb.join(',')}, 0.03)`
            } : {}}
        >
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Design Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Color Palette Extractor
                    </h1>
                    <p className="text-lg text-slate-500">
                        Upload any image to instantly extract its dominant color and a beautiful matching palette. Perfect for UI design inspiration.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Upload / Preview Area */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        {!imagePreview ? (
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-[32px] p-20 text-center transition-all cursor-pointer bg-white overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                                    }`}
                            >
                                <input {...getInputProps()} />
                                <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-100 shadow-inner">
                                    <Palette size={48} className="text-blue-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                    {isDragActive ? "Drop image here" : "Upload an image"}
                                </h3>
                                <p className="text-slate-500 font-medium">
                                    Drag & drop or click to browse
                                </p>
                            </div>
                        ) : (
                            <div className="relative group rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-2xl shadow-slate-200/50">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto max-h-[600px] object-cover"
                                />
                                <button
                                    onClick={clearImage}
                                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                    title="Remove Image"
                                >
                                    <X size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Extracted Colors */}
                    <div className="lg:col-span-6 bg-white rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/20 sticky top-32 min-h-[500px]">

                        {!imagePreview ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
                                <UploadCloud size={48} className="text-slate-300" />
                                <p className="text-lg font-bold text-slate-400">Upload an image to see magic</p>
                            </div>
                        ) : loading ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                                <p className="font-bold text-slate-500 animate-pulse">Analyzing pixels...</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-10"
                                >
                                    {/* Dominant Color */}
                                    {dominantColor && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Palette size={16} /> Dominant Color
                                            </h3>
                                            <div
                                                onClick={() => handleCopy(dominantColor.hex)}
                                                className="group relative h-40 w-full rounded-3xl cursor-pointer hover:-translate-y-1 transition-all shadow-lg flex items-end p-6"
                                                style={{ backgroundColor: dominantColor.hex }}
                                            >
                                                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">
                                                    <span className="font-bold text-slate-800 text-lg tracking-wide">{dominantColor.hex}</span>
                                                    {copiedHex === dominantColor.hex ? (
                                                        <Check size={18} className="text-green-500" />
                                                    ) : (
                                                        <Copy size={18} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Color Palette Grid */}
                                    {palette.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Palette size={16} /> Extracted Palette (8 Colors)
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {palette.map((color, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleCopy(color.hex)}
                                                        className="group cursor-pointer"
                                                    >
                                                        <div
                                                            className="h-24 w-full rounded-2xl mb-3 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all border border-black/5"
                                                            style={{ backgroundColor: color.hex }}
                                                        />
                                                        <div className="flex items-center justify-between px-1">
                                                            <span className="text-sm font-bold text-slate-600">{color.hex}</span>
                                                            {copiedHex === color.hex ? (
                                                                <Check size={14} className="text-green-500" />
                                                            ) : (
                                                                <Copy size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
