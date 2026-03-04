"use client";

import { useState } from "react";
import Link from "next/link";
import { studentProjectsData } from "@/lib/data/projects";
import { Search, Code2, Download, Star, Filter, ArrowRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function StudentProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        { id: "all", name: "All Projects" },
        { id: "react", name: "React JS" },
        { id: "nextjs", name: "Next.js" },
        { id: "python", name: "Python / ML" },
        { id: "node", name: "Node.js" },
        { id: "html-css", name: "HTML & CSS" }
    ];

    const filteredProjects = studentProjectsData.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-32">

                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6 fade-up">
                        <Code2 size={14} /> Source Codes & Templates
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
                        Student Projects <span className="text-blue-600">Hub</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed fade-up" style={{ animationDelay: '0.2s' }}>
                        Download high-quality, fully functional projects for your college assignments, hackathons, and portfolio. Free open-source code included.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="max-w-7xl mx-auto px-6 mb-12 fade-up" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for 'React E-Commerce' or 'Python ML'..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id
                                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col fade-up hover:-translate-y-1"
                                style={{ animationDelay: `${0.1 * (index % 3)}s` }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-lg border border-slate-200">
                                            {project.category}
                                        </span>
                                        <span className={`px-3 py-1 font-bold text-xs uppercase tracking-wider rounded-lg border flex items-center gap-1 ${project.difficulty === 'Beginner' ? 'bg-green-50 text-green-600 border-green-200' :
                                            project.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                                                'bg-red-50 text-red-600 border-red-200'
                                            }`}>
                                            <Star size={12} className={project.difficulty === 'Beginner' ? 'fill-green-600' : project.difficulty === 'Intermediate' ? 'fill-yellow-600' : 'fill-red-600'} />
                                            {project.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {project.name}
                                </h2>
                                <p className="text-slate-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.techStack.slice(0, 3).map(tech => (
                                        <span key={tech} className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                        <Download size={16} className="text-blue-500" />
                                        {project.downloads}
                                    </div>
                                    <Link href={`/projects/${project.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-md shadow-slate-900/20 hover:shadow-blue-600/20 text-sm">
                                        View Code <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <Code2 size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No projects found</h3>
                            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
