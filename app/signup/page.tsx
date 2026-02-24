"use client";

import { useState, Suspense } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { Loader2, Mail, Lock, User, AlertCircle, Eye, EyeOff, Smartphone, Facebook, Instagram } from "lucide-react";

import AuthNavbar from "@/app/components/AuthNavbar";

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    // Auth Views: 'options' | 'email'
    const [authView, setAuthView] = useState<'options' | 'email'>('options');

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect_url") || "/";

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, { displayName: name });

            await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: cred.user.uid,
                    email: cred.user.email,
                    displayName: name,
                    photoURL: cred.user.photoURL
                })
            }).catch(console.error);

            router.push(redirectUrl);
        } catch (err: any) {
            let msg = "Failed to create an account";
            if (err.code === "auth/email-already-in-use") {
                msg = "This email is already registered.";
            } else if (err.code === "auth/weak-password") {
                msg = "Password should be at least 6 characters.";
            } else if (err.code === "auth/invalid-email") {
                msg = "Please enter a valid email address.";
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError("");
        setGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const cred = await signInWithPopup(auth, provider);

            await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: cred.user.uid,
                    email: cred.user.email,
                    displayName: cred.user.displayName,
                    photoURL: cred.user.photoURL
                })
            }).catch(console.error);

            router.push(redirectUrl);
        } catch (err: any) {
            setError(err.message || "Failed to sign up with Google");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto fade-up">
            <div className="bg-black/40 backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden max-h-[80vh] overflow-y-auto custom-scrollbar-light">
                {/* Inner Glow Effect */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="absolute -inset-x-20 -top-20 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="mb-10 text-center relative z-10">
                    <h1 className="text-3xl font-bold font-heading text-white mb-2 leading-tight">
                        Log in or sign up in seconds
                    </h1>
                    <p className="text-white/60 text-sm">
                        Use your email or another service to continue with Oruzen (it's free)!
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl text-sm flex items-start gap-3 backdrop-blur-md relative z-10">
                        <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="relative z-10 space-y-4">
                    {authView === 'options' ? (
                        // --- Options View ---
                        <div className="space-y-4">
                            <button className="w-full h-14 flex items-center gap-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all group">
                                <Smartphone className="text-white/70 group-hover:text-white transition-colors" size={22} />
                                <span className="flex-1 text-left">Continue with phone number</span>
                            </button>

                            <button
                                onClick={handleGoogleSignUp}
                                disabled={googleLoading || loading}
                                className="w-full h-14 flex items-center gap-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all disabled:opacity-50"
                            >
                                {googleLoading ? (
                                    <Loader2 size={22} className="animate-spin text-white/70" />
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" /></svg>
                                )}
                                <span className="flex-1 text-left">Continue with Google</span>
                            </button>

                            <button
                                onClick={() => setAuthView('email')}
                                className="w-full h-14 flex items-center gap-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all group"
                            >
                                <Mail className="text-white/70 group-hover:text-white transition-colors" size={22} />
                                <span className="flex-1 text-left">Continue with Email</span>
                            </button>

                            <div className="pt-2">
                                <p className="text-center text-sm text-white/50">
                                    Already have an account? <Link href={`/signin?redirect_url=${encodeURIComponent(redirectUrl)}`} className="text-white font-bold hover:underline">Log in</Link>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // --- Email Signup View ---
                        <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                            <form onSubmit={handleEmailSignUp} className="space-y-5">
                                <div>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 h-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all focus:bg-white/10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 h-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all focus:bg-white/10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 h-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all focus:bg-white/10"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || googleLoading}
                                    className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-95"
                                >
                                    {loading ? <Loader2 size={22} className="animate-spin" /> : "Sign Up"}
                                </button>
                            </form>

                            <button
                                onClick={() => setAuthView('options')}
                                className="w-full text-center text-sm text-white/50 hover:text-white transition-colors py-2"
                            >
                                Back to all options
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer terms inside card */}
                <div className="mt-8 text-center text-[11px] text-white/40 leading-relaxed relative z-10 px-4">
                    By continuing, you agree to Oruzen's <a href="#" className="underline hover:text-white/80 transition-colors">Terms of Use</a> and <a href="#" className="underline hover:text-white/80 transition-colors">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
}

export default function SignUpPage() {
    return (
        <div className="h-screen overflow-hidden relative flex bg-[#1a0f0a]">
            {/* Cinematic Background Image (Using Unsplash placeholder representing rain/bokeh) */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop")',
                }}
            >
                {/* Heavy dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                {/* Overall darkening for ambiance */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <AuthNavbar ctaText="Log In" ctaHref="/signin" />

            {/* Split Screen Layout */}
            <div className="relative z-10 w-full flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-12 items-center h-full">

                {/* Left Side Typography */}
                <div className="flex-1 w-full text-left md:pr-12 text-white mb-16 md:mb-0 mt-12 md:mt-0">
                    <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight mb-6 drop-shadow-xl fade-up">
                        Start Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Creative Journey
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed mb-12 drop-shadow-md fade-up" style={{ animationDelay: '0.1s' }}>
                        Join millions of creators using Oruzen to build stunning designs, mockups, and videos in seconds.
                    </p>

                    <div className="fade-up" style={{ animationDelay: '0.2s' }}>
                        <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6 drop-shadow-md">Connect with us</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/30">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#bc1888]/30">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#1877F2]/30">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side Auth Card */}
                <div className="flex-1 w-full max-w-lg fade-up" style={{ animationDelay: '0.3s' }}>
                    <Suspense fallback={<div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />}>
                        <SignUpForm />
                    </Suspense>
                </div>

            </div>

            {/* Bottom Left Minimal Links */}
            <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-6 text-xs font-medium text-white/50 z-20">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>

            {/* Bottom Right Language */}
            <div className="absolute bottom-6 right-6 md:right-12 flex items-center gap-2 text-xs font-medium text-white/50 z-20 hover:text-white cursor-pointer transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                English (India)
            </div>
        </div>
    );
}
