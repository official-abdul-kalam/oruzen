import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";


export default function Home() {
  return (

    <main className="min-h-screen selection:bg-secondary selection:text-white">
      <Navbar />
      <Hero />

      {/* Ecosystem Teaser */}
      <section className="py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-secondary font-bold tracking-wider text-xs uppercase mb-2 block">Our Ecosystem</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary">Powerful tools for every need.</h2>
            </div>
            <a href="/tools" className="text-text-muted hover:text-secondary font-medium transition-colors flex items-center gap-2 group">
              View all products <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Mini Cards for Top Tools */}
            {['Flow', 'Shield', 'Pulse', 'Sync'].map((item) => (
              <div key={item} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-secondary/20 hover:shadow-lg transition-all cursor-pointer group">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Oruzen {item}</h3>
                <p className="text-sm text-text-muted">Enterprise grade solution for modern teams.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold font-heading mb-2">5M+</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Daily Users</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-heading mb-2">12</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Global Offices</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-heading mb-2">99.9%</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Uptime</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-heading mb-2">24/7</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Support</div>
          </div>
        </div>
      </section>

      <Features />

      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-heading text-primary mb-6">
            Designed for clarity.
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            We believe that software should be quiet, smart, and powerful.
            Oruzen strips away the noise to focus on what truly matters:
            your work, your data, and your peace of mind.
          </p>
        </div>
      </section>
      <Footer />
    </main>

  );
}
