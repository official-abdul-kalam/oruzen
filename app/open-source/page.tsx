import Link from "next/link";
import { productsData } from "@/lib/data/products";
import { Terminal, Github, Star, GitFork, ExternalLink } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function OpenSourcePage() {
    const osList = productsData.filter(p => p.category === 'open-source');

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0d1117] pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-16 fade-up">
                        <div className="inline-flex items-center justify-center p-3 text-slate-300 rounded-2xl mb-4 border border-slate-700 bg-slate-800/50">
                            <Terminal size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 tracking-tight">
                            Open Source By Oruzen
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            We build in public. Discover, fork, and contribute to the tools that power the Oruzen ecosystem.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {osList.map((project, index) => (
                            <Link href={`/open-source/${project.id}`} key={project.id} className="group fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 h-full transition-all duration-200 hover:border-[#8b949e] flex flex-col">

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="text-slate-400 mt-1">
                                            <Github size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue-400 font-mono group-hover:underline decoration-blue-400/50 underline-offset-4">
                                                oruzen / {project.name.toLowerCase().replace(/ /g, '-')}
                                            </h3>
                                            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-auto pt-6">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            {project.platforms[0]}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                            <Star size={14} />
                                            {project.stars}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork size={14} />
                                            {Math.floor(Math.random() * 500) + 100}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            License: {project.license}
                                        </div>
                                        <div className="flex items-center gap-1 ml-auto">
                                            Updated {project.updatedAt}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
