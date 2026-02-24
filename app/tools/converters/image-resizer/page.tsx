"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Crop as CropIcon, Image as ImageIcon, Download, Settings2, Instagram, Facebook, Monitor, Smartphone, Youtube } from "lucide-react";


// Preset Aspect Ratios for Social Media
const PRESETS = [
    { name: "Freeform", aspect: undefined, icon: CropIcon },
    { name: "Square (1:1)", aspect: 1, icon: Instagram },
    { name: "Landscape (16:9)", aspect: 16 / 9, icon: Youtube },
    { name: "Portrait (4:5)", aspect: 4 / 5, icon: Smartphone },
    { name: "Cover (2.7:1)", aspect: 820 / 312, icon: Facebook },     // Facebook Cover
    { name: "Desktop (16:10)", aspect: 16 / 10, icon: Monitor }
];


export default function ImageResizerTool() {
    // Media State
    const [imgSrc, setImgSrc] = useState("");
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Crop State
    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 10,
        y: 10,
        width: 80,
        height: 80
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [aspect, setAspect] = useState<number | undefined>(undefined);

    // Dimensions State
    const [resizeWidth, setResizeWidth] = useState<number>(0);
    const [resizeHeight, setResizeHeight] = useState<number>(0);
    const [maintainRatio, setMaintainRatio] = useState<boolean>(true);


    // --- File Upload ---
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setCrop({ unit: '%', x: 10, y: 10, width: 80, height: 80 }); // Reset crop
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || '')
            );
            reader.readAsDataURL(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    // --- Image Load Handler ---
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setResizeWidth(width);
        setResizeHeight(height);

        // Define default crop covering the center area
        const initialAspect = aspect || (width / height);

        let initialWidth = width * 0.8;
        let initialHeight = initialWidth / initialAspect;

        if (initialHeight > height * 0.8) {
            initialHeight = height * 0.8;
            initialWidth = initialHeight * initialAspect;
        }

        const initialX = (width - initialWidth) / 2;
        const initialY = (height - initialHeight) / 2;

        setCrop({
            unit: 'px',
            width: initialWidth,
            height: initialHeight,
            x: initialX,
            y: initialY
        });
    };

    // --- Manual Dimension Change ---
    const handleWidthChange = (val: number) => {
        setResizeWidth(val);
        if (maintainRatio && imgRef.current) {
            const originalRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
            setResizeHeight(Math.round(val / originalRatio));
        }
    };

    const handleHeightChange = (val: number) => {
        setResizeHeight(val);
        if (maintainRatio && imgRef.current) {
            const originalRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
            setResizeWidth(Math.round(val * originalRatio));
        }
    };


    // --- Canvas Cropping Logic ---
    useEffect(() => {
        if (!completedCrop || !imgRef.current || !canvasRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = canvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * scaleX * pixelRatio;
        canvas.height = crop.height * scaleY * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

    }, [completedCrop]);


    // --- Download Function ---
    const downloadImage = () => {
        if (!canvasRef.current || !imgRef.current) return;

        const canvas = canvasRef.current;

        // Create an offscreen canvas to handle the final resize if width/height was changed manually
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = resizeWidth || canvas.width;
        offscreenCanvas.height = resizeHeight || canvas.height;
        const ctx = offscreenCanvas.getContext("2d");

        if (ctx) {
            ctx.imageSmoothingQuality = 'high';
            // Draw the cropped canvas onto the final dimension canvas
            ctx.drawImage(canvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
        }

        // Export and Download
        offscreenCanvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `Oruzen_Resized_${new Date().getTime()}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    };


    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden text-slate-800">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-400/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-fuchsia-400/20 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex-grow w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-purple-600 font-bold tracking-wider text-sm uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200 mb-4 inline-flex items-center gap-2">
                        <CropIcon size={16} /> Multimedia Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Smart Image Resizer
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Crop, resize, and optimize images for social media instantly. Zero server uploads, absolute privacy.
                    </p>
                </div>

                {!imgSrc ? (
                    /* INITIAL UPLOAD STATE */
                    <div
                        {...getRootProps()}
                        className={`bg-white border-2 border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-xl max-w-3xl mx-auto ${isDragActive ? "border-purple-500 bg-purple-50/50 shadow-purple-500/20 scale-102" : "border-slate-300 hover:border-purple-400 hover:bg-slate-50 hover:shadow-2xl"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 dropdown-shadow">
                            <ImageIcon size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">
                            {isDragActive ? "Drop to Edit!" : "Upload an Image"}
                        </h3>
                        <p className="text-slate-500 mb-8 max-w-md">Drag and drop your image here, or click to select from your device. Supports JPG, PNG, WEBP.</p>

                        <div className="flex gap-4">
                            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200">100% Private</span>
                            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200">Fast Browser Processing</span>
                        </div>
                    </div>
                ) : (
                    /* MAIN EDITOR WORKSPACE */
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row">

                        {/* LEFT: IMAGE PREVIEW & CROP AREA */}
                        <div className="lg:w-2/3 bg-slate-100 p-8 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 min-h-[500px]">
                            <div className="max-w-full max-h-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={aspect}
                                    className="max-h-[60vh] object-contain"
                                >
                                    <img
                                        ref={imgRef}
                                        alt="Crop me"
                                        src={imgSrc}
                                        onLoad={onImageLoad}
                                        className="max-w-full max-h-[60vh] w-auto h-auto object-contain pointer-events-none"
                                    />
                                </ReactCrop>
                            </div>
                        </div>

                        {/* RIGHT: CONTROLS & SETTINGS */}
                        <div className="lg:w-1/3 p-8 flex flex-col bg-white">

                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                                <Settings2 size={20} className="text-purple-600" /> Image Settings
                            </h3>

                            {/* 1. ASPECT RATIO PRESETS */}
                            <div className="mb-8">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Aspect Ratio</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {PRESETS.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => setAspect(preset.aspect)}
                                            className={`flex items-center gap-2 p-2 rounded-xl text-sm font-medium transition-colors border ${aspect === preset.aspect
                                                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            <preset.icon size={16} />
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. MANUAL RESIZE DIMENSIONS */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Final Dimensions (px)</label>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={maintainRatio}
                                            onChange={(e) => setMaintainRatio(e.target.checked)}
                                            className="rounded text-purple-600 focus:ring-purple-500"
                                        />
                                        Maintain Ratio
                                    </label>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1 relative">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-slate-400">Width</label>
                                        <input
                                            type="number"
                                            value={resizeWidth}
                                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                        />
                                    </div>
                                    <span className="text-slate-400 font-bold">×</span>
                                    <div className="flex-1 relative">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-slate-400">Height</label>
                                        <input
                                            type="number"
                                            value={resizeHeight}
                                            onChange={(e) => handleHeightChange(Number(e.target.value))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-3">
                                {/* Invisible Canvas for final crop processing */}
                                <canvas ref={canvasRef} style={{ display: "none" }} />

                                <button
                                    onClick={downloadImage}
                                    disabled={!completedCrop?.width || !completedCrop?.height}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-purple-500/25 transition-transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <Download size={20} />
                                    Download Image
                                </button>

                                <button
                                    onClick={() => setImgSrc("")}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-colors"
                                >
                                    Choose Another Image
                                </button>
                            </div>

                        </div>

                    </div>
                )}

            </section>

            <Footer />
        </main>
    );
}
