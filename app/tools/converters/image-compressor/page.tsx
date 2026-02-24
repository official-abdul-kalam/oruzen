"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { ArrowRight, Download, FileImage, Settings2, ShieldCheck, Zap } from "lucide-react";

export default function ImageCompressorTool() {
    // Media State
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const [compressedUrl, setCompressedUrl] = useState<string>("");

    // Processing State
    const [isCompressing, setIsCompressing] = useState<boolean>(false);

    // Settings State
    const [maxSizeMB, setMaxSizeMB] = useState<number>(0.1); // default 100KB = 0.1MB
    const [useWebWorker, setUseWebWorker] = useState<boolean>(true);


    // --- File Upload ---
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setOriginalFile(file);
            setOriginalUrl(URL.createObjectURL(file));
            setCompressedFile(null); // reset
            setCompressedUrl("");

            // Auto-compress on drop
            await handleCompress(file, maxSizeMB);
        }
    }, [maxSizeMB]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    // --- Compression Logic ---
    const handleCompress = async (fileToCompress: File | null = originalFile, targetSizeMB: number = maxSizeMB) => {
        if (!fileToCompress) return;

        setIsCompressing(true);

        try {
            const options = {
                maxSizeMB: targetSizeMB,
                useWebWorker: useWebWorker,
                autoReverseMime: true, // Output file matches the input file extension (e.g., png -> png)
            };

            const compressedBlob = await imageCompression(fileToCompress, options);

            // Convert Blob to File to keep the original name and type
            const newFile = new File([compressedBlob], fileToCompress.name, {
                type: fileToCompress.type,
            });

            setCompressedFile(newFile);
            setCompressedUrl(URL.createObjectURL(newFile));

        } catch (error) {
            console.error("Error compressing image:", error);
            alert("Failed to compress image. It might be too large or an unsupported format.");
        } finally {
            setIsCompressing(false);
        }
    };


    // --- Format Bytes Utility ---
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };


    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden text-slate-800">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-amber-400/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-orange-400/20 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto flex-grow w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-amber-600 font-bold tracking-wider text-sm uppercase bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 mb-4 inline-flex items-center gap-2">
                        <Zap size={16} /> Optimization Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Lossless Image Compressor
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Compress PNGs and JPEGs without losing quality. Set a target file size (e.g., under 100KB) and compress instantly within your browser.
                    </p>
                </div>

                {!originalFile ? (
                    /* UPLOAD STATE */
                    <div
                        {...getRootProps()}
                        className={`bg-white border-2 border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-xl max-w-3xl mx-auto ${isDragActive ? "border-amber-500 bg-amber-50/50 shadow-amber-500/20 scale-102" : "border-slate-300 hover:border-amber-400 hover:bg-slate-50 hover:shadow-2xl"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 dropdown-shadow">
                            <FileImage size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">
                            {isDragActive ? "Drop to Compress!" : "Upload an Image"}
                        </h3>
                        <p className="text-slate-500 mb-8 max-w-md">Drag and drop your image here, or click to select from your device. PNG stays PNG, JPG stays JPG.</p>

                        <div className="flex gap-4">
                            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1"><ShieldCheck size={14} /> 100% Private</span>
                            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1"><Zap size={14} /> Ultra Fast</span>
                        </div>
                    </div>
                ) : (
                    /* WORKSPACE STATE */
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden flex flex-col">

                        {/* SETTINGS BAR */}
                        <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Settings2 className="text-amber-500" />
                                <h3 className="font-bold text-slate-700">Compression Target</h3>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <span className="text-sm font-bold text-slate-500">Max Size:</span>
                                {/* Common Sizes Tokens */}
                                <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                    {[
                                        { label: "100KB", val: 0.1 },
                                        { label: "500KB", val: 0.5 },
                                        { label: "1MB", val: 1.0 },
                                    ].map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => {
                                                setMaxSizeMB(preset.val);
                                                handleCompress(originalFile, preset.val);
                                            }}
                                            disabled={isCompressing}
                                            className={`px-4 py-2 text-sm font-bold transition-colors ${maxSizeMB === preset.val
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'text-slate-600 hover:bg-slate-50 disabled:opacity-50'
                                                }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* COMPARISON PANELS */}
                        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">

                            {/* ORIGINAL SIDE */}
                            <div className="flex-1 p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">Original</h4>
                                        <p className="text-sm text-slate-500">{originalFile.name}</p>
                                    </div>
                                    <div className="bg-slate-100 px-4 py-2 rounded-xl text-slate-700 font-bold border border-slate-200">
                                        {formatBytes(originalFile.size)}
                                    </div>
                                </div>

                                <div className="bg-slate-100/50 flex-grow rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
                                    <img src={originalUrl} alt="Original" className="max-w-full max-h-[400px] object-contain drop-shadow-md rounded-lg" />
                                </div>
                            </div>

                            {/* COMPRESSED SIDE */}
                            <div className="flex-1 p-8 flex flex-col relative">

                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                            Compressed <Zap size={18} className="text-amber-500 fill-amber-500" />
                                        </h4>
                                        <p className="text-sm text-amber-600 font-semibold tracking-wide">
                                            {compressedFile ? (
                                                `Saved ${((originalFile.size - compressedFile.size) / originalFile.size * 100).toFixed(0)}%`
                                            ) : (
                                                "Processing..."
                                            )}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl font-bold border transition-colors ${isCompressing ? "bg-slate-100 text-slate-400 border-slate-200 animate-pulse" : "bg-green-100 text-green-700 border-green-200 shadow-sm"
                                        }`}>
                                        {compressedFile ? formatBytes(compressedFile.size) : "---"}
                                    </div>
                                </div>

                                <div className="bg-slate-100 flex-grow rounded-2xl border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center p-4 min-h-[300px] relative">

                                    {isCompressing && (
                                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                            <span className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></span>
                                            <p className="text-amber-700 font-bold">Compressing Image...</p>
                                        </div>
                                    )}

                                    {compressedUrl && (
                                        <img src={compressedUrl} alt="Compressed" className="max-w-full max-h-[400px] object-contain drop-shadow-md rounded-lg" />
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* ACTIONS FOOTER */}
                        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                            <button
                                onClick={() => {
                                    setOriginalFile(null);
                                    setOriginalUrl("");
                                    setCompressedFile(null);
                                    setCompressedUrl("");
                                }}
                                disabled={isCompressing}
                                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                            >
                                Start Over
                            </button>

                            <a
                                href={compressedUrl || "#"}
                                download={compressedFile?.name || "optimized_image.png"}
                                className={`px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all ${isCompressing || !compressedFile ? 'opacity-50 pointer-events-none scale-95 grayscale' : 'hover:scale-105 active:scale-95'
                                    }`}
                            >
                                <Download size={20} /> Download Optimized Image
                            </a>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
