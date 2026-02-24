"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { Copy, Trash2, Code2, AlertCircle, Check, FileJson, Minus, Plus } from "lucide-react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-twilight.css"; // Dark theme for JSON

export default function JsonFormatterTool() {
    const [code, setCode] = useState("{\n  \"example\": \"Paste your raw JSON here\",\n  \"numbers\": [1, 2, 3],\n  \"nested\": {\n    \"boolean\": true,\n    \"nullValue\": null\n  }\n}");
    const [error, setError] = useState<string | null>(null);
    const [indent, setIndent] = useState(2);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            // Remove lingering errors
            setError(null);

            // Parse and stringify
            const parsed = JSON.parse(code);
            const formatted = JSON.stringify(parsed, null, indent);
            setCode(formatted);
        } catch (err: any) {
            setError(`Invalid JSON: ${err.message}`);
        }
    };

    const minifyJson = () => {
        try {
            setError(null);
            const parsed = JSON.parse(code);
            const minified = JSON.stringify(parsed);
            setCode(minified);
        } catch (err: any) {
            setError(`Invalid JSON: ${err.message}`);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        if (window.confirm("Clear editor?")) {
            setCode("");
            setError(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col relative">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full flex-grow flex flex-col">
                <Navbar />

                <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-blue-400 font-bold tracking-wider text-sm uppercase bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4 inline-block">
                            Developer Tools
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            JSON Formatter & Validator
                        </h1>
                        <p className="text-lg text-slate-400">
                            Format, beautify, minify, and validate raw JSON strings locally in your browser.
                            Zero tracking, syntax highlighted.
                        </p>
                    </div>

                    <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:h-[700px]">

                        {/* Toolbar */}
                        <div className="p-4 border-b border-slate-700/50 flex flex-wrap gap-4 items-center justify-between bg-slate-800/50">
                            <div className="flex items-center gap-2">
                                <FileJson size={20} className="text-blue-400" />
                                <span className="font-bold text-white tracking-wide">Editor.json</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Indentation control */}
                                <div className="flex items-center bg-slate-900/50 rounded-xl border border-slate-700/50 p-1">
                                    <button
                                        onClick={() => setIndent(Math.max(2, indent - 2))}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-xs font-bold text-slate-300 w-16 text-center">
                                        Tab: {indent}
                                    </span>
                                    <button
                                        onClick={() => setIndent(Math.min(8, indent + 2))}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="w-px h-6 bg-slate-700 mx-2 hidden sm:block"></div>

                                <button
                                    onClick={formatJson}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
                                >
                                    <Code2 size={16} /> Format
                                </button>
                                <button
                                    onClick={minifyJson}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-sm font-bold rounded-xl transition"
                                >
                                    Minify
                                </button>

                                <div className="w-px h-6 bg-slate-700 mx-2 hidden sm:block"></div>

                                <button
                                    onClick={handleCopy}
                                    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 hover:text-white rounded-xl transition flex items-center justify-center"
                                    title="Copy All"
                                >
                                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                </button>
                                <button
                                    onClick={handleClear}
                                    className="w-10 h-10 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl transition flex items-center justify-center"
                                    title="Clear"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Error Banner */}
                        {error && (
                            <div className="bg-red-500/10 border-b border-red-500/20 p-4 flex items-start gap-3 text-red-400">
                                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                <div className="text-sm font-mono break-all">{error}</div>
                            </div>
                        )}

                        {/* Code Editor */}
                        <div className="flex-grow overflow-auto bg-[#141414] relative text-base font-mono">
                            <Editor
                                value={code}
                                onValueChange={code => setCode(code)}
                                highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
                                padding={24}
                                style={{
                                    fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                                    fontSize: 15,
                                    outline: 'none',
                                    minHeight: '100%'
                                }}
                                textareaClassName="focus:outline-none"
                            />
                        </div>

                        {/* Footer Status */}
                        <div className="p-3 border-t border-slate-800 bg-[#0B1121] text-xs font-mono text-slate-500 flex justify-between">
                            <span>Ln {code.split('\n').length}, Col {code.length}</span>
                            <span>{code.length} bytes</span>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    );
}
