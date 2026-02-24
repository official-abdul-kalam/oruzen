"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile, sendEmailVerification, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, User as UserIcon, ShieldCheck, ShieldAlert, LogOut, Crown, Sparkles, CheckCircle2, Settings } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function AccountsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [isSendingVerification, setIsSendingVerification] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setDisplayName(currentUser.displayName || "");
            } else {
                router.push("/signin?redirect_url=/accounts");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        setUpdateMessage("");
        try {
            await updateProfile(user, { displayName });
            setUpdateMessage("Profile updated successfully!");
            // Sync with backend if necessary
            await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: displayName,
                    photoURL: user.photoURL
                })
            }).catch(console.error);
        } catch (error: any) {
            setUpdateMessage(error.message || "Failed to update profile.");
        } finally {
            setIsUpdating(false);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
    };

    const handleSendVerification = async () => {
        if (!user) return;
        setIsSendingVerification(true);
        setVerificationMessage("");
        try {
            await sendEmailVerification(user);
            setVerificationMessage("Verification email sent! Please check your inbox.");
        } catch (error: any) {
            if (error.code === 'auth/too-many-requests') {
                setVerificationMessage("Too many requests. Please try again later.");
            } else {
                setVerificationMessage(error.message || "Failed to send verification email.");
            }
        } finally {
            setIsSendingVerification(false);
            setTimeout(() => setVerificationMessage(""), 5000);
        }
    };

    const handleSignOut = async () => {
        await auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/5 via-primary/5 to-transparent pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 fade-up">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-primary/10 border border-slate-100 flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-black">{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
                                Welcome, {user.displayName ? user.displayName.split(' ')[0] : 'Creator'}!
                            </h1>
                            <p className="text-slate-500 mt-1 font-medium">Manage your Oruzen Studio profile and preferences.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile & Security */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Profile Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                    <Settings size={22} className="shrink-0" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Profile Details</h2>
                                    <p className="text-sm text-slate-500 font-medium">Update your public facing information.</p>
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <form onSubmit={handleUpdateProfile} className="space-y-6">

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email || ""}
                                            disabled
                                            className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                                        />
                                        <p className="mt-2 text-xs text-slate-500">Email address cannot be changed directly.</p>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                        <span className={`text-sm font-bold ${updateMessage.includes("success") ? "text-green-600" : "text-red-500"}`}>
                                            {updateMessage}
                                        </span>
                                        <button
                                            type="submit"
                                            disabled={isUpdating || displayName === user.displayName}
                                            className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-95"
                                        >
                                            {isUpdating ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Security / Verification Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
                                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                                    <ShieldCheck size={22} className="shrink-0" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Account Security</h2>
                                    <p className="text-sm text-slate-500 font-medium">Manage your account verification status.</p>
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border border-slate-200 rounded-2xl bg-slate-50">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${user.emailVerified ? 'bg-green-100 text-green-600 shadow-inner' : 'bg-amber-100 text-amber-500 shadow-inner'}`}>
                                            {user.emailVerified ? <CheckCircle2 size={24} /> : <ShieldAlert size={24} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-base">Email Verification</p>
                                            <p className="text-sm text-slate-500 mt-1 max-w-sm">
                                                {user.emailVerified ? "Your email is verified and secure. No further action needed." : "Your email is unverified. Please verify to access all features."}
                                            </p>
                                        </div>
                                    </div>
                                    {!user.emailVerified && (
                                        <button
                                            onClick={handleSendVerification}
                                            disabled={isSendingVerification}
                                            className="px-5 py-2.5 bg-white border-2 border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm hover:border-slate-300"
                                        >
                                            {isSendingVerification ? "Sending Link..." : "Verify Email"}
                                        </button>
                                    )}
                                </div>
                                {verificationMessage && (
                                    <p className={`mt-4 text-sm font-bold ${verificationMessage.includes("sent") ? "text-green-600" : "text-amber-500"}`}>
                                        {verificationMessage}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Premium/Billing */}
                    <div className="space-y-8">

                        {/* Subscription Card */}
                        <div className="bg-[#0f172a] rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-slate-900/20 fade-up relative group" style={{ animationDelay: '0.3s' }}>
                            {/* Decorative background gradients */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px]"></div>

                            <div className="p-8 relative z-10 border-b border-white/5">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold mb-6">
                                    <Crown size={14} className="text-yellow-400" />
                                    <span>Premium Access</span>
                                </div>
                                <h2 className="text-2xl font-black font-heading text-white">
                                    Oruzen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pro</span>
                                </h2>
                            </div>

                            <div className="p-8 relative z-10 space-y-6">
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-black text-white">$0</span>
                                        <span className="text-slate-400 text-sm font-medium">/ lifetime</span>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed mt-3">You currently have full unlimited access to Oruzen Studio while in beta.</p>
                                </div>

                                <ul className="space-y-4 py-4">
                                    {[
                                        'Unlimited Mockup Generation',
                                        'Export in 4K Quality',
                                        'Premium Project Source Codes',
                                        'Priority Community Support'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                                            <div className="mt-0.5 p-1 rounded-full bg-blue-500/20 text-blue-400">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-2">
                                    <button
                                        disabled
                                        className="w-full h-12 bg-white/5 text-white/50 font-bold rounded-xl flex items-center justify-center gap-2 border border-white/10 cursor-not-allowed transition-all"
                                    >
                                        Currently Active
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
