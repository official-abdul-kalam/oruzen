"use client";

import { useParams } from "next/navigation";
import { studentProjectsData } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowLeft, Github, Download, Terminal, CheckCircle2, Play, FileCode2, Copy, ExternalLink, Star } from "lucide-react";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";

export default function StudentProjectDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [copied, setCopied] = useState(false);

    const project = studentProjectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
                <h1 className="text-3xl font-extrabold mb-4">Project Not Found</h1>
                <Link href="/projects" className="text-blue-600 hover:underline flex items-center gap-2 font-bold">
                    <ArrowLeft size={16} /> Browse Projects
                </Link>
            </div>
        );
    }

    const copyCommands = () => {
        navigator.clipboard.writeText(project.setupCommands.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-slate-800 font-sans pb-24 pt-24">

                {/* Header Breadcrumb */}
                <div className="max-w-7xl mx-auto px-6 mb-8 pt-4">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:border-blue-200">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-6">

                    {/* Hero Box */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20 mb-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between border-b border-slate-700/50 pb-8 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 font-bold tracking-widest text-[10px] uppercase rounded-full border border-blue-500/30">
                                        {project.category}
                                    </span>
                                    <span className={`flex items-center gap-1.5 px-3 py-1.5 font-bold tracking-widest text-[10px] uppercase rounded-full border ${project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                                        project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                            'bg-red-500/20 text-red-300 border-red-500/30'
                                        }`}>
                                        <Star size={12} className={project.difficulty === 'Beginner' ? 'fill-green-400' : project.difficulty === 'Intermediate' ? 'fill-yellow-400' : 'fill-red-400'} />
                                        {project.difficulty}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                                    {project.name}
                                </h1>
                                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                                    {project.tagline}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <Link href={project.githubUrl} target="_blank" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/25">
                                    <Github size={20} /> Get Source Code
                                </Link>
                                {project.demoUrl && (
                                    <Link href={project.demoUrl} target="_blank" className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-bold border border-slate-700 transition-all">
                                        <ExternalLink size={20} /> Live Demo
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-3">
                            {project.techStack.map(tech => (
                                <span key={tech} className="px-4 py-2 bg-slate-900/50 backdrop-blur border border-slate-700 rounded-xl text-sm font-bold text-slate-300 flex items-center gap-2 shadow-inner">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div> {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-12">

                            <section>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                    <FileCode2 className="text-blue-500" /> About the Project
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    {project.description}
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500" /> Key Features
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="bg-green-100 p-1 rounded-full shrink-0">
                                                <CheckCircle2 size={16} className="text-green-600" />
                                            </div>
                                            <span className="font-medium text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                        </div>

                        {/* Sidebar Area */}
                        <div className="space-y-8">

                            {/* 2-Minute Setup Terminal */}
                            <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden sticky top-32">
                                <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider ml-2">Run in 2 mins</span>
                                    </div>
                                    <button
                                        onClick={copyCommands}
                                        className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-xl border border-slate-700"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="p-6 font-mono text-sm leading-8 overflow-x-auto">
                                    {project.setupCommands.map((command, idx) => (
                                        <div key={idx} className="flex">
                                            <span className="text-slate-600 mr-4 select-none">$</span>
                                            <span className="text-emerald-400">{command.split(' ')[0]}</span>
                                            <span className="text-slate-300 ml-2">{command.substring(command.indexOf(' ') + 1)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Box */}
                            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Downloads</p>
                                    <p className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                                        {project.downloads} <Download size={20} className="text-blue-500" />
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
