import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 mt-20">
                <div className="max-w-2xl w-full text-center fade-up">
                    <div className="relative inline-block mb-8">
                        <h1 className="text-9xl font-black font-heading text-slate-100 tracking-tighter">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl md:text-3xl font-bold text-primary whitespace-nowrap bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl shadow-sm">
                                Page not found
                            </span>
                        </div>
                    </div>

                    <p className="text-slate-500 mb-10 max-w-md mx-auto">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="bg-primary hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-primary/10 w-full sm:w-auto"
                        >
                            Go Home
                        </Link>
                        <Link
                            href="/tools"
                            className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold py-3.5 px-8 rounded-xl transition-all w-full sm:w-auto"
                        >
                            Browse Tools
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
