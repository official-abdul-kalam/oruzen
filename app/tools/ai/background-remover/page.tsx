"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Image as ImageIcon, Download, Sparkles, X, RefreshCw, AlertCircle } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

export default function BackgroundRemoverTool() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading_model' | 'processing' | 'done' | 'error'>('idle');
    const [progress, setProgress] = useState(0);

    const processImage = async (file: File) => {
        try {
            setStatus('loading_model');
            setProgress(0);

            // Generate object URL for previewing the original immediately
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
            setOriginalFile(file);

            // Execute the WASM AI locally in the browser
            setStatus('processing');
            const imageBlob = await removeBackground(file, {
                progress: (key: string, current: number, total: number) => {
                    // Update progress (rough estimation mapping steps to 0-100)
                    if (total > 0) {
                        const pct = Math.round((current / total) * 100);
                        setProgress(Math.min(pct, 99)); // Keep at 99 until truly done
                    }
                }
            });

            // Convert raw blob into an object URL
            const processedUrl = URL.createObjectURL(imageBlob);
            setProcessedImage(processedUrl);
            setStatus('done');
            setProgress(100);

        } catch (error) {
            console.error("BG Removal Error:", error);
            setStatus('error');
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            processImage(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxFiles: 1,
        disabled: status === 'processing' || status === 'loading_model'
    });

    const handleDownload = () => {
        if (!processedImage || !originalFile) return;
        const link = document.createElement('a');
        link.download = `oruzen-transparent-${originalFile.name.split('.')[0]}.png`;
        link.href = processedImage;
        link.click();
    };

    const clearWorkspace = () => {
        if (originalImage) URL.revokeObjectURL(originalImage);
        if (processedImage) URL.revokeObjectURL(processedImage);
        setOriginalImage(null);
        setOriginalFile(null);
        setProcessedImage(null);
        setStatus('idle');
        setProgress(0);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 flex items-center gap-2 justify-center w-max mx-auto">
                        <Sparkles size={16} /> AI Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        AI Background Remover
                    </h1>
                    <p className="text-lg text-slate-500">
                        Remove backgrounds from images instantly. Powered by local, in-browser AI.
                        No data ever leaves your device—100% private.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">

                    {!originalImage ? (
                        /* Upload State */
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-[32px] p-20 text-center transition-all cursor-pointer bg-white shadow-xl shadow-slate-200/20 relative min-h-[400px] flex flex-col items-center justify-center ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/25">
                                <UploadCloud size={48} className="text-white" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-[#0f172a] mb-3">
                                {isDragActive ? "Drop image here" : "Upload an image"}
                            </h3>
                            <p className="text-slate-500 font-medium text-lg">
                                Drag & drop or click to browse (JPG, PNG, WebP)
                            </p>
                        </div>
                    ) : (
                        /* Workspace State */
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50 p-6 md:p-8">

                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <ImageIcon className="text-blue-500" /> Result
                                </h3>
                                <button
                                    onClick={clearWorkspace}
                                    className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 font-bold rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <X size={18} /> New Image
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 relative">
                                {/* Decorating the background for the transparent result */}

                                {/* Original Image */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Original</h4>
                                    <div className="relative rounded-[24px] overflow-hidden bg-slate-100 aspect-square md:aspect-[4/3] border border-slate-200">
                                        <img
                                            src={originalImage}
                                            alt="Original"
                                            className="w-full h-full object-contain p-4"
                                        />
                                    </div>
                                </div>

                                {/* Result Image */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Background Removed</h4>
                                    <div className="relative rounded-[24px] overflow-hidden aspect-square md:aspect-[4/3] border border-slate-200 bg-white"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, #f1f5f9 25%, transparent 25%, transparent 75%, #f1f5f9 75%, #f1f5f9), repeating-linear-gradient(45deg, #f1f5f9 25%, white 25%, white 75%, #f1f5f9 75%, #f1f5f9)',
                                            backgroundPosition: '0 0, 10px 10px',
                                            backgroundSize: '20px 20px'
                                        }}
                                    >

                                        {(status === 'loading_model' || status === 'processing') && (
                                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 z-20">
                                                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-6"></div>
                                                <h3 className="text-lg font-bold text-slate-800 mb-2">
                                                    {status === 'loading_model' ? 'Loading AI Model...' : 'Isolating Subject...'}
                                                </h3>
                                                <p className="text-sm text-slate-500 font-medium mb-4">This happens entirely on your device</p>

                                                {/* Progress Bar */}
                                                <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-blue-500"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {status === 'error' && (
                                            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-red-500 z-10 p-8 text-center">
                                                <AlertCircle size={48} className="mb-4" />
                                                <h3 className="text-xl font-bold mb-2">Processing Failed</h3>
                                                <p className="text-sm font-medium opacity-80">Make sure you are using a clear image. Try again with a different photo.</p>
                                            </div>
                                        )}

                                        {processedImage && (
                                            <motion.img
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                src={processedImage}
                                                alt="Processed"
                                                className="w-full h-full object-contain p-4 relative z-10 drop-shadow-2xl"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Download Action */}
                            <AnimatePresence>
                                {status === 'done' && processedImage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 flex justify-end"
                                    >
                                        <button
                                            onClick={handleDownload}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/25 flex items-center gap-3 transform hover:-translate-y-1"
                                        >
                                            <Download size={24} /> Download Transparent PNG
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
