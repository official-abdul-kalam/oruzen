"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from "lucide-react";

export default function PasswordGeneratorTool() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState({ score: 0, label: "", color: "" });

    const generatePassword = useCallback(() => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let charPool = "";
        if (options.uppercase) charPool += uppercaseChars;
        if (options.lowercase) charPool += lowercaseChars;
        if (options.numbers) charPool += numberChars;
        if (options.symbols) charPool += symbolChars;

        // Ensure at least one checked option
        if (charPool === "") {
            setOptions(prev => ({ ...prev, lowercase: true }));
            charPool = lowercaseChars;
        }

        let newPassword = "";
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            newPassword += charPool[array[i] % charPool.length];
        }

        setPassword(newPassword);
        calculateStrength(newPassword);
    }, [length, options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const calculateStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length > 8) score += 1;
        if (pwd.length > 12) score += 1;
        if (pwd.length >= 16) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 2;

        let label = "Weak";
        let color = "text-red-500";
        if (score >= 6) {
            label = "Very Strong";
            color = "text-green-500";
        } else if (score >= 4) {
            label = "Strong";
            color = "text-blue-500";
        } else if (score >= 2) {
            label = "Fair";
            color = "text-yellow-500";
        }

        setStrength({ score, label, color });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOptionToggle = (key: keyof typeof options) => {
        setOptions(prev => {
            const next = { ...prev, [key]: !prev[key] };
            // Ensure at least one option is selected
            if (!Object.values(next).some(Boolean)) {
                return prev;
            }
            return next;
        });
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Security
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Secure Password Generator
                    </h1>
                    <p className="text-lg text-slate-500">
                        Generate strong, random passwords using standard cryptography.
                        Calculated locally in your browser.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-xl shadow-slate-200/20">

                    {/* Password Display */}
                    <div className="relative mb-8 group">
                        <div className="w-full min-h-[5rem] px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center break-all font-mono text-xl md:text-2xl font-bold text-slate-800 pr-24 transition-colors group-hover:border-blue-400">
                            {password}
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <button
                                onClick={generatePassword}
                                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-95"
                                title="Regenerate"
                            >
                                <RefreshCw size={18} />
                            </button>
                            <button
                                onClick={handleCopy}
                                className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-95 shadow-md shadow-blue-500/20"
                                title="Copy Password"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Strength Indicator */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                            {[1, 2, 3, 4].map(level => (
                                <div
                                    key={level}
                                    className={`h-full flex-1 transition-all duration-500 ${strength.score >= (level * 1.5)
                                            ? strength.color.replace('text-', 'bg-')
                                            : 'bg-transparent'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className={`text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 ${strength.color} min-w-[120px] justify-end`}>
                            {strength.score >= 6 ? <ShieldCheck size={16} /> : (strength.score < 4 ? <ShieldAlert size={16} /> : <Shield size={16} />)}
                            {strength.label}
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password Length</label>
                                <span className="text-lg font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
                                    {length}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { key: 'uppercase', label: 'Uppercase (A-Z)' },
                                { key: 'lowercase', label: 'Lowercase (a-z)' },
                                { key: 'numbers', label: 'Numbers (0-9)' },
                                { key: 'symbols', label: 'Symbols (!@#$)' }
                            ].map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => handleOptionToggle(opt.key as keyof typeof options)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${options[opt.key as keyof typeof options]
                                            ? 'border-blue-500 bg-blue-50/50 text-blue-800 shadow-sm shadow-blue-500/10'
                                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${options[opt.key as keyof typeof options]
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-slate-200 text-transparent'
                                        }`}>
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
