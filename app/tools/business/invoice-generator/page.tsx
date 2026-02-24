"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Download, FileText, Briefcase, User, Mail, DollarSign, Calendar } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceGeneratorTool() {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [invoiceNo, setInvoiceNo] = useState("INV-001");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Sender Details
    const [senderName, setSenderName] = useState("Oruzen Design Studio");
    const [senderEmail, setSenderEmail] = useState("hello@oruzen.com");
    const [senderAddress, setSenderAddress] = useState("123 Creative Street, Tech Park, NY 10001");

    // Client Details
    const [clientName, setClientName] = useState("Acme Corp");
    const [clientEmail, setClientEmail] = useState("billing@acmecorp.com");
    const [clientAddress, setClientAddress] = useState("456 Business Blvd, Suite 200, CA 90210");

    // Line Items
    const [items, setItems] = useState([
        { id: 1, desc: "Website Redesign", qty: 1, rate: 1500 }
    ]);

    // Financials
    const [taxRate, setTaxRate] = useState(0);
    const [currency, setCurrency] = useState("$");

    // Actions
    const addItem = () => setItems([...items, { id: Date.now(), desc: "", qty: 1, rate: 0 }]);

    const removeItem = (id: number) => {
        if (items.length > 1) setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: number, field: string, value: string | number) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    // Computations
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    // Export Logic
    const handleDownloadPDF = async () => {
        if (!invoiceRef.current) return;
        setLoading(true);

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 3, // High quality
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4" // 210 x 297 mm
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${clientName.replace(/\s+/g, '_')}_${invoiceNo}.pdf`);

        } catch (err) {
            console.error("PDF generation failed", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                        Business Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Invoice PDF Generator
                    </h1>
                    <p className="text-lg text-slate-500">
                        Create beautiful, professional PDF invoices instantly in your browser. No account required, 100% private.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* FORM BUILDER */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8 sticky top-32 max-h-[80vh] overflow-y-auto custom-scrollbar">

                        {/* Meta */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                                <FileText size={16} className="text-blue-500" /> Invoice Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Invoice No.</label>
                                    <input type="text" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Currency</label>
                                    <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="$">USD ($)</option>
                                        <option value="€">EUR (€)</option>
                                        <option value="£">GBP (£)</option>
                                        <option value="₹">INR (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Tax %</label>
                                    <input type="number" min="0" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* From */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Briefcase size={16} className="text-purple-500" /> From (Your Details)
                            </h3>
                            <input type="text" placeholder="Your Company Name" value={senderName} onChange={e => setSenderName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="email" placeholder="Email" value={senderEmail} onChange={e => setSenderEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                            <textarea placeholder="Address" value={senderAddress} onChange={e => setSenderAddress(e.target.value)} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                        </div>

                        {/* To */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                                <User size={16} className="text-green-500" /> Bill To (Client)
                            </h3>
                            <input type="text" placeholder="Client Name" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="email" placeholder="Client Email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                            <textarea placeholder="Client Address" value={clientAddress} onChange={e => setClientAddress(e.target.value)} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                        </div>

                        {/* Items Config (Compact) */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center justify-between border-b border-slate-100 pb-2">
                                <span>Line Items</span>
                                <button onClick={addItem} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 flex items-center gap-1">
                                    <Plus size={12} /> Add
                                </button>
                            </h3>
                            <div className="space-y-3">
                                <AnimatePresence>
                                    {items.map((item, idx) => (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} key={item.id} className="flex gap-2">
                                            <input type="text" placeholder="Description" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} className="flex-grow h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none" />
                                            <input type="number" placeholder="Qty" value={item.qty} onChange={e => updateItem(item.id, 'qty', Number(e.target.value))} className="w-16 h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none text-center" />
                                            <input type="number" placeholder="Rate" value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value))} className="w-20 h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none text-center" />
                                            <button onClick={() => removeItem(item.id)} className="w-9 h-9 flex shrink-0 items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition">
                                                <Trash2 size={14} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Export Button */}
                        <div className="pt-4 border-t border-slate-100">
                            <button
                                onClick={handleDownloadPDF}
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><Download size={18} /> Export as PDF</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* LIVE PREVIEW (A4 Aspect Ratio Container) */}
                    <div className="lg:col-span-8 overflow-x-auto bg-slate-200/50 p-4 sm:p-8 rounded-[32px] border border-slate-200 shadow-inner flex justify-center">

                        {/* The Actual Invoice Paper */}
                        <div
                            ref={invoiceRef}
                            className="bg-white text-slate-800 shadow-2xl shrink-0 relative overflow-hidden flex flex-col"
                            style={{
                                width: '210mm',
                                minHeight: '297mm',
                                margin: '0 auto',
                                boxSizing: 'border-box'
                            }}
                        >
                            {/* Header Banner */}
                            <div className="bg-slate-900 text-white p-12 pr-12 pb-16 relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30 pointer-events-none" />

                                <div className="flex justify-between items-start relative z-10">
                                    <div className="max-w-xs">
                                        <h1 className="text-4xl font-black tracking-tight mb-2">INVOICE</h1>
                                        <p className="text-slate-400 text-sm font-medium mb-1">Invoice No: <span className="text-white font-bold">{invoiceNo}</span></p>
                                        <p className="text-slate-400 text-sm font-medium">Date: <span className="text-white font-bold">{date}</span></p>
                                    </div>
                                    <div className="text-right max-w-xs">
                                        <h2 className="text-2xl font-bold mb-2">{senderName || 'Your Company'}</h2>
                                        <p className="text-slate-400 text-sm opacity-90">{senderEmail}</p>
                                        <p className="text-slate-400 text-sm opacity-90 whitespace-pre-wrap">{senderAddress}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Body */}
                            <div className="p-12 pr-12 flex-grow -mt-8 relative z-20">

                                {/* Bill To Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 flex justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Billed To</p>
                                        <h3 className="text-lg font-bold text-slate-800">{clientName || 'Client Name'}</h3>
                                        <p className="text-sm text-slate-500">{clientEmail}</p>
                                        <p className="text-sm text-slate-500 whitespace-pre-wrap mt-1">{clientAddress}</p>
                                    </div>
                                    <div className="text-right flex flex-col justify-end">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Due</p>
                                        <p className="text-3xl font-black text-blue-600">{currency}{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <table className="w-full mb-12 text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-slate-800">
                                            <th className="py-4 text-sm font-bold text-slate-800 uppercase">Description</th>
                                            <th className="py-4 text-sm font-bold text-slate-800 uppercase text-center w-24">Qty</th>
                                            <th className="py-4 text-sm font-bold text-slate-800 uppercase text-right w-32">Rate</th>
                                            <th className="py-4 text-sm font-bold text-slate-800 uppercase text-right w-32">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {items.map((item, idx) => (
                                            <tr key={item.id} className="group">
                                                <td className="py-4 text-slate-700 font-medium">
                                                    {item.desc || <span className="italic text-slate-300">Item description...</span>}
                                                </td>
                                                <td className="py-4 text-slate-700 text-center">{item.qty}</td>
                                                <td className="py-4 text-slate-700 text-right">{currency}{item.rate.toLocaleString()}</td>
                                                <td className="py-4 text-slate-800 font-bold text-right">{currency}{(item.qty * item.rate).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Totals */}
                                <div className="flex justify-end">
                                    <div className="w-72 space-y-3">
                                        <div className="flex justify-between text-sm font-bold text-slate-500">
                                            <span>Subtotal</span>
                                            <span className="text-slate-800">{currency}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        {taxRate > 0 && (
                                            <div className="flex justify-between text-sm font-bold text-slate-500">
                                                <span>Tax ({taxRate}%)</span>
                                                <span className="text-slate-800">{currency}{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-black text-slate-900 border-t border-slate-200 pt-3">
                                            <span>Total</span>
                                            <span className="text-blue-600">{currency}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="p-12 border-t border-slate-100 mt-auto">
                                <p className="text-center text-sm font-bold text-slate-400">
                                    Thank you for your business!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
