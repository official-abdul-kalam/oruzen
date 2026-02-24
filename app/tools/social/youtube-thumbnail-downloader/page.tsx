"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Youtube, AlertCircle, Image as ImageIcon, ChevronRight } from "lucide-react";

export default function YouTubeThumbnailDownloader() {
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Extract YouTube Video ID from various URL formats
    const extractVideoId = (input: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = input.match(regex);
        return match ? match[1] : null;
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);
        setVideoId(null);

        if (!url.trim()) {
            setError("Please enter a YouTube video URL.");
            return;
        }

        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
        } else {
            setError("Invalid YouTube URL. Please make sure it's a valid link.");
        }
    };

    const getThumbnailUrls = (id: string) => ({
        max: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,    // 1080p
        hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,         // 480p
        mq: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,         // 320p
        sd: `https://img.youtube.com/vi/${id}/sddefault.jpg`,         // 640p
    });

    const handleDownload = async (imgUrl: string, qualityName: string) => {
        try {
            // We use fetch to get the blob so we can force a precise filename download,
            // circumventing browser "open image in new tab" default behavior.
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `youtube_thumbnail_${videoId}_${qualityName}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            // Fallback: if CORS prevents fetching directly, just open in new tab
            window.open(imgUrl, "_blank");
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-red-500 font-bold tracking-wider text-sm uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-100 mb-4 inline-flex items-center gap-2">
                        <Youtube size={16} /> Social Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        YouTube Thumbnail Downloader
                    </h1>
                    <p className="text-lg text-slate-500">
                        Extract and download high-quality YouTube thumbnails instantly. Just paste the video URL below.
                    </p>
                </div>

                {/* Input Area */}
                <div className="max-w-2xl mx-auto mb-16">
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                            <Search size={24} />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste YouTube Link (e.g., https://youtube.com/watch?v=...)"
                            className="w-full h-20 pl-16 pr-40 bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-red-500 rounded-full text-lg font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-xl shadow-slate-200/50"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 bottom-3 px-8 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors flex items-center gap-2"
                        >
                            Extract <ChevronRight size={18} />
                        </button>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center justify-center gap-2 text-red-500 font-bold bg-red-50 p-4 rounded-2xl border border-red-100"
                            >
                                <AlertCircle size={20} /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Area */}
                <AnimatePresence>
                    {videoId && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            {/* Main HD Preview */}
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white p-4 rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50">
                                    <div className="flex justify-between items-center mb-6 px-4 pt-2">
                                        <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                                            <ImageIcon className="text-red-500" /> HD Thumbnail (1080p)
                                        </h3>
                                        <button
                                            onClick={() => handleDownload(getThumbnailUrls(videoId).max, "HD_1080p")}
                                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition flex items-center gap-2"
                                        >
                                            <Download size={16} /> Download HD
                                        </button>
                                    </div>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 group">
                                        <img
                                            src={getThumbnailUrls(videoId).max}
                                            alt="YouTube Thumbnail Max Res"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // If MAX res doesn't exist, fallback to HQ
                                                e.currentTarget.src = getThumbnailUrls(videoId).hq;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => handleDownload(getThumbnailUrls(videoId).max, "HD_1080p")}
                                                className="px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-2xl transition flex items-center gap-3 hover:scale-105"
                                            >
                                                <Download size={24} /> Download Full Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Resolutions */}
                            <div className="max-w-5xl mx-auto">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">Other Resolutions</h4>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {[
                                        { key: 'hq', name: 'High Quality', res: '480p', url: getThumbnailUrls(videoId).hq },
                                        { key: 'sd', name: 'Standard', res: '640p', url: getThumbnailUrls(videoId).sd },
                                        { key: 'mq', name: 'Medium', res: '320p', url: getThumbnailUrls(videoId).mq }
                                    ].map((qual) => (
                                        <div key={qual.key} className="bg-white p-3 rounded-3xl border border-slate-200 hover:border-red-200 transition-colors shadow-sm hover:shadow-xl hover:shadow-red-500/5 group">
                                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                                <img src={qual.url} alt={qual.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="px-2 flex items-center justify-between pb-2">
                                                <div>
                                                    <p className="font-bold text-slate-800">{qual.name}</p>
                                                    <p className="text-xs font-bold text-slate-400">{qual.res}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDownload(qual.url, qual.name.replace(/\s+/g, '_'))}
                                                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                                    title={`Download ${qual.name}`}
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Footer />
        </main>
    );
}
