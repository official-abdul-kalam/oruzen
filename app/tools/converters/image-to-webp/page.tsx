"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileImage, Settings2, Download, RefreshCw, CheckCircle2 } from "lucide-react";

interface ProcessedImage {
    original: File;
    compressed: Blob | null;
    originalUrl: string;
    compressedUrl: string | null;
    status: 'pending' | 'processing' | 'done' | 'error';
    compressionRatio: number;
}

export default function ImageCompressorTool() {
    const [images, setImages] = useState<ProcessedImage[]>([]);
    const [quality, setQuality] = useState(0.8);
    const [maxWidth, setMaxWidth] = useState(1920);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            original: file,
            compressed: null,
            originalUrl: URL.createObjectURL(file),
            compressedUrl: null,
            status: 'pending' as const,
            compressionRatio: 0
        }));

        setImages(prev => [...prev, ...newImages]);

        // Process each image
        for (let i = 0; i < newImages.length; i++) {
            const img = newImages[i];

            setImages(prev => prev.map((p, idx) =>
                p.originalUrl === img.originalUrl ? { ...p, status: 'processing' } : p
            ));

            try {
                const options = {
                    maxSizeMB: 5,
                    maxWidthOrHeight: maxWidth,
                    useWebWorker: true,
                    fileType: "image/webp",
                    initialQuality: quality
                };

                const compressedFile = await imageCompression(img.original, options);

                setImages(prev => prev.map((p) => {
                    if (p.originalUrl === img.originalUrl) {
                        return {
                            ...p,
                            compressed: compressedFile,
                            compressedUrl: URL.createObjectURL(compressedFile),
                            status: 'done',
                            compressionRatio: Math.round((1 - (compressedFile.size / img.original.size)) * 100)
                        };
                    }
                    return p;
                }));

            } catch (error) {
                console.error("Compression error:", error);
                setImages(prev => prev.map(p =>
                    p.originalUrl === img.originalUrl ? { ...p, status: 'error' } : p
                ));
            }
        }
    }, [quality, maxWidth]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        }
    });

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownloadAll = () => {
        images.forEach(img => {
            if (img.status === 'done' && img.compressedUrl) {
                const link = document.createElement('a');
                link.href = img.compressedUrl;
                link.download = `optimized-${img.original.name.split('.')[0]}.webp`;
                link.click();
            }
        });
    };

    const clearAll = () => {
        images.forEach(img => {
            URL.revokeObjectURL(img.originalUrl);
            if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
        });
        setImages([]);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Converters
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Image to WebP Compressor
                    </h1>
                    <p className="text-lg text-slate-500">
                        Compress PNG and JPG images to next-gen WebP format.
                        Files are processed entirely in your browser—100% private and secure.
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
                                <UploadCloud size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                {isDragActive ? "Drop images here" : "Drag & drop images here"}
                            </h3>
                            <p className="text-slate-500">
                                or click to browse files (JPG, PNG, WebP)
                            </p>
                        </div>

                        {/* Image List */}
                        <AnimatePresence>
                            {images.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
                                >
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <span className="font-bold text-slate-700">{images.length} Images</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={clearAll}
                                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors"
                                            >
                                                Clear All
                                            </button>
                                            <button
                                                onClick={handleDownloadAll}
                                                className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors flex items-center gap-2"
                                            >
                                                <Download size={16} /> Download All
                                            </button>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                                    <img src={img.originalUrl} alt="Preview" className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-grow min-w-0">
                                                    <p className="text-sm font-bold text-slate-800 truncate mb-1">
                                                        {img.original.name}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                                                        <span>{formatSize(img.original.size)}</span>
                                                        <span>→</span>
                                                        <span className={img.compressed ? "text-green-600" : ""}>
                                                            {img.compressed ? formatSize(img.compressed.size) : '...'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 flex items-center gap-4">
                                                    {img.status === 'processing' && (
                                                        <RefreshCw size={20} className="text-blue-500 animate-spin" />
                                                    )}
                                                    {img.status === 'done' && (
                                                        <>
                                                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                                -{img.compressionRatio}%
                                                            </div>
                                                            <a
                                                                href={img.compressedUrl!}
                                                                download={`optimized-${img.original.name.split('.')[0]}.webp`}
                                                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white transition-colors"
                                                            >
                                                                <Download size={18} />
                                                            </a>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20 sticky top-32">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <Settings2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Compression Settings</h3>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Quality</label>
                                    <span className="text-sm font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                                        {Math.round(quality * 100)}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-xs font-medium text-slate-400 mt-2 mt-2">
                                    <span>Smallest File</span>
                                    <span>Best Quality</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 block">Max Width (px)</label>
                                <select
                                    value={maxWidth}
                                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option value={1920}>1920px (1080p HD)</option>
                                    <option value={1280}>1280px (720p HD)</option>
                                    <option value={800}>800px (Web Optimized)</option>
                                    <option value={400}>400px (Thumbnail)</option>
                                </select>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-green-500" /> Pro Tip
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    Convert your hero images and large product shots to WebP to drastically increase page load speeds and boost your SEO scores.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
