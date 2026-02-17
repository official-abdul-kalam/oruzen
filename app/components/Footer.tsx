import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="25" fill="#1E293B" className="fill-white/10" />
                                <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="8" className="text-white/20" />
                                <path d="M50 22C65.464 22 78 34.536 78 50" stroke="white" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                            <span className="text-2xl font-bold font-heading tracking-tighter">
                                Oruzen<span className="text-blue-500">.</span>
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-xs">
                            Quiet, smart, and powerful solutions for the modern era. Building the future of digital ecosystems.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Twitter size={18} />, href: "#" },
                                { icon: <Github size={18} />, href: "#" },
                                { icon: <Linkedin size={18} />, href: "#" },
                                { icon: <Mail size={18} />, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading">Product</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Oruzen Flow</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Oruzen Shield</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Oruzen Pulse</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Oruzen Sync</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading">Company</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Press Kit</a></li>
                            <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading">Stay Updated</h4>
                        <p className="text-slate-400 mb-6 text-sm">Subscribe to our newsletter for the latest updates.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 px-3 rounded-md hover:bg-blue-500 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Oruzen Inc. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
