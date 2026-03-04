import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 fade-up">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <h1 className="text-4xl font-bold font-heading text-slate-900 mb-6">Terms of Service</h1>
                    <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Provision of Services</h2>
                            <p>
                                You agree and acknowledge that Oruzen is entitled to modify, improve or discontinue any of its services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it.
                                Furthermore, you agree and acknowledge that Oruzen is entitled to provide services to you through subsidiaries or affiliated entities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Proprietary Rights</h2>
                            <p>
                                You acknowledge and agree that Oruzen may contain proprietary and confidential information including trademarks, service marks and patents protected by intellectual property laws and international intellectual property treaties.
                                Oruzen authorizes you to view and make a single copy of portions of its content for offline, personal, non-commercial use.
                                Our content may not be sold, reproduced, or distributed without our written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Submitted Content</h2>
                            <p>
                                When you submit content to Oruzen you simultaneously grant Oruzen an irrevocable, worldwide, royalty free license to publish, display, modify, distribute and syndicate your content worldwide.
                                You confirm and warrant that you have the required authority to grant the above license to Oruzen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Termination of Agreement</h2>
                            <p>
                                The Terms of this agreement will continue to apply in perpetuity until terminated by either party without notice at any time for any reason.
                                Terms that are to continue in perpetuity shall be unaffected by the termination of this agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Contact Information</h2>
                            <p>
                                If you have any questions or concerns about these Terms of Service, please contact us at:
                                <br /><br />
                                <strong>Email:</strong> legal@oruzen.com<br />
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
