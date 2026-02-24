"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { Youtube, Search, Download, AlertCircle, PlayCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function YoutubeVideoDownloaderTool() {
    const [videoUrl, setVideoUrl] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const [videoData, setVideoData] = useState<{
        title: string;
        thumbnail: string;
        downloadUrl: string;
        fallbackUrl?: string;
    } | null>(null);

    const handleFetchVideo = async () => {
        if (!videoUrl.trim()) return;

        // Basic YouTube URL Validation
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (!youtubeRegex.test(videoUrl)) {
            setError("Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)");
            return;
        }

        setIsFetching(true);
        setError("");
        setVideoData(null);

        try {
            // We use Cobalt's public open-source API for fetching video streams
            // Cobalt allows bypassing YouTube restrictions without our own backend infrastructure.
            const response = await fetch("https://api.cobalt.tools/api/json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    url: videoUrl,
                    aFormat: "mp3", // Only needed if audio-only, but we want video
                    vQuality: "1080", // Try to get 1080p, falls back to 720p automatically
                    isAudioOnly: false,
                    isNoTTS: false
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch video. The service might be temporarily ratelimited.");
            }

            const data = await response.json();

            if (data.status === "error") {
                throw new Error(data.text || "Failed to process the YouTube link.");
            }

            // Extract the video ID for the thumbnail manually just in case
            const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            const videoId = videoIdMatch ? videoIdMatch[1] : "";

            setVideoData({
                title: "YouTube Video Download",
                thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                downloadUrl: data.url
            });

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred. Please try again later.");
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden text-slate-800">
            <Navbar />

            {/* Ambient Red Glow Background */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex-grow w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-red-500 font-bold tracking-wider text-sm uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-200 mb-4 inline-flex items-center gap-2">
                        <Youtube size={16} /> Social Media Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        YouTube Video Downloader
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Paste any YouTube link to instantly generate a high-quality (up to 1080p) MP4 download link. No software required.
                    </p>
                </div>

                {/* Main Action Card */}
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl p-8 lg:p-12 mb-8 relative overflow-hidden">

                    {/* Input Field */}
                    <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-4 z-10">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Paste YouTube Video URL here (https://...)"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 font-medium rounded-2xl pl-12 pr-4 py-4 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            onClick={handleFetchVideo}
                            disabled={isFetching || !videoUrl}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 sm:w-auto w-full disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95"
                        >
                            {isFetching ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Fetching...
                                </>
                            ) : (
                                <>
                                    <PlayCircle size={20} /> Get Video
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                </div>

                {/* Results Section */}
                {videoData && (
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 flex flex-col md:flex-row">

                        {/* Thumbnail Side */}
                        <div className="md:w-5/12 bg-slate-100 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 relative group">
                            <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                                <Youtube size={48} className="text-white drop-shadow-xl" />
                            </div>
                            <img
                                src={videoData.thumbnail}
                                alt="Video Thumbnail"
                                className="w-full h-full object-cover max-h-[300px] md:max-h-full"
                                onError={(e) => {
                                    // Fallback to standard quality if maxres isn't available
                                    const target = e.target as HTMLImageElement;
                                    target.src = target.src.replace('maxresdefault', 'hqdefault');
                                }}
                            />
                        </div>

                        {/* Download Details Side */}
                        <div className="md:w-7/12 p-8 flex flex-col justify-center">

                            <div className="mb-8">
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit mb-4">
                                    <CheckCircle2 size={16} /> Stream Extracted
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 line-clamp-2 leading-tight">
                                    {videoData.title}
                                </h3>
                                <p className="text-slate-500 mt-2 text-sm">
                                    Click the button below to download the MP4 video directly to your device via Cobalt API servers.
                                </p>
                            </div>

                            <a
                                href={videoData.downloadUrl}
                                // Setting rel target for safety
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-between transition-all group hover:scale-[1.02] shadow-xl shadow-slate-900/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                                        <Download size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white">Download MP4 Video</div>
                                        <div className="text-white/60 text-xs mt-0.5">High Quality</div>
                                    </div>
                                </div>
                                <div className="bg-white/10 px-3 py-1.5 rounded-lg text-sm group-hover:bg-white text-slate-900 transition-colors duration-300">
                                    Direct Link
                                </div>
                            </a>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-slate-400">
                                    By using this tool, you agree to YouTube's TOS and confirm you have permission to download this content.
                                </p>
                            </div>

                        </div>
                    </div>
                )}

            </section>

            <Footer />
        </main>
    );
}
