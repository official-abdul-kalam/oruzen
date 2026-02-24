"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Download, Eraser, PenTool, Circle } from "lucide-react";

export default function SignatureMakerTool() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Tools
    const [color, setColor] = useState("#0f172a"); // Default Navy
    const [lineWidth, setLineWidth] = useState(3);

    // Preset Colors
    const colors = [
        { name: "Navy", hex: "#0f172a" },
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#2563eb" },
        { name: "Red", hex: "#dc2626" },
        { name: "Green", hex: "#16a34a" },
    ];

    // Initialize Canvas
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                // Save current image data
                const ctx = canvas.getContext('2d');
                const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

                // Set actual internal dimensions to match display dimensions
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;

                // Re-apply properties and image data
                if (ctx) {
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    if (imgData) ctx.putImageData(imgData, 0, 0);
                }
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // Drawing Logic
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        draw(e);
        // Prevent scrolling on touch devices while drawing
        if (e.type === 'touchstart') document.body.style.overflow = 'hidden';
    };

    const stopDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.beginPath(); // Reset path so next line isn't connected
        }
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Get correct coordinates whether mouse or touch
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    // Actions
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const downloadSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Export as transparent PNG
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `digital_signature_${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-500 font-bold tracking-wider text-sm uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 mb-4 inline-flex items-center gap-2">
                        <PenTool size={16} /> Business Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Free Digital Signature Maker
                    </h1>
                    <p className="text-lg text-slate-500">
                        Draw your e-signature below and download it instantly as a transparent PNG. 100% private, works entirely in your browser.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Main Workspace */}
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">

                        {/* Toolbar */}
                        <div className="p-4 md:px-8 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-4">

                            <div className="flex items-center gap-6">
                                {/* Color Picker */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Color</span>
                                    {colors.map((c) => (
                                        <button
                                            key={c.hex}
                                            onClick={() => setColor(c.hex)}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c.hex ? 'border-white scale-110 shadow-md ring-2 ring-purple-500' : 'border-transparent hover:scale-105 shadow-sm'}`}
                                            style={{ backgroundColor: c.hex }}
                                            title={c.name}
                                        ></button>
                                    ))}
                                </div>

                                <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

                                {/* Pen Thickness */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thickness</span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={lineWidth}
                                        onChange={(e) => setLineWidth(Number(e.target.value))}
                                        className="w-24 accent-purple-500"
                                    />
                                    <div
                                        className="bg-slate-300 rounded-full"
                                        style={{ width: lineWidth + 2, height: lineWidth + 2, backgroundColor: color }}
                                    ></div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={clearCanvas}
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                                >
                                    <Eraser size={16} /> Clear
                                </button>
                                <button
                                    onClick={downloadSignature}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
                                >
                                    <Download size={16} /> Save PNG
                                </button>
                            </div>

                        </div>

                        {/* Canvas Area */}
                        <div
                            ref={containerRef}
                            className="w-full h-[400px] sm:h-[500px] relative bg-slate-50/50 cursor-crosshair touch-none"
                            style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        >
                            {/* Signature Base Line */}
                            <div className="absolute bottom-16 left-12 right-12 h-px bg-slate-300 pointer-events-none"></div>
                            <div className="absolute bottom-12 left-12 text-slate-300 text-2xl opacity-50 pointer-events-none select-none">
                                <span className="font-serif italic text-4xl">X</span>
                            </div>

                            <canvas
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseOut={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                                onTouchCancel={stopDrawing}
                                className="block w-full h-full absolute inset-0 z-10"
                            />
                        </div>

                    </div>

                    <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                        <Circle size={8} fill="currentColor" className="text-green-500" />
                        Everything happens on your device. We do not store your signature.
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
