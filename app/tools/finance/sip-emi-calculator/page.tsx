"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { Calculator, TrendingUp, Home, Landmark, ArrowRight, IndianRupee } from "lucide-react";

export default function SipEmiCalculatorTool() {
    const [activeTab, setActiveTab] = useState<"sip" | "emi">("sip");

    // SIP State
    const [sipAmount, setSipAmount] = useState(5000);
    const [sipYears, setSipYears] = useState(10);
    const [sipReturnRate, setSipReturnRate] = useState(12);

    // EMI State
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [loanYears, setLoanYears] = useState(20);
    const [loanInterestRate, setLoanInterestRate] = useState(8.5);

    // Calculations
    const sipData = useMemo(() => {
        const monthlyRate = sipReturnRate / 12 / 100;
        const months = sipYears * 12;
        const investedAmount = sipAmount * months;
        let futureValue = 0;

        if (monthlyRate === 0) {
            futureValue = investedAmount;
        } else {
            futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        }

        const estReturns = Math.max(0, futureValue - investedAmount);

        return {
            investedAmount: Math.round(investedAmount),
            estReturns: Math.round(estReturns),
            totalValue: Math.round(futureValue),
            chartData: [
                { name: "Invested", value: Math.round(investedAmount), color: "#3b82f6" }, // Blue
                { name: "Est. Returns", value: Math.round(estReturns), color: "#10b981" }  // Green
            ]
        };
    }, [sipAmount, sipYears, sipReturnRate]);

    const emiData = useMemo(() => {
        const monthlyRate = loanInterestRate / 12 / 100;
        const months = loanYears * 12;

        let emi = 0;
        if (monthlyRate === 0) {
            emi = loanAmount / months;
        } else {
            emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalPayment = emi * months;
        const totalInterest = Math.max(0, totalPayment - loanAmount);

        return {
            emi: Math.round(emi),
            principalAmount: Math.round(loanAmount),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment),
            chartData: [
                { name: "Principal", value: Math.round(loanAmount), color: "#3b82f6" }, // Blue
                { name: "Total Interest", value: Math.round(totalInterest), color: "#ef4444" } // Red
            ]
        };
    }, [loanAmount, loanYears, loanInterestRate]);


    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden text-slate-800">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-300/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-300/20 rounded-full blur-[100px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 mb-4 inline-flex items-center gap-2">
                        <TrendingUp size={16} /> Finance Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        SIP & Loan EMI Calculator
                    </h1>
                    <p className="text-lg text-slate-500">
                        Plan your wealth clearly. Calculate Mutual Fund SIP returns or home loan EMIs instantly.
                    </p>
                </div>

                {/* Main Dashboard Tabs */}
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col">

                    <div className="flex border-b border-slate-100">
                        <button
                            onClick={() => setActiveTab('sip')}
                            className={`flex-1 py-5 text-center font-bold text-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'sip' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <TrendingUp size={20} /> SIP Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab('emi')}
                            className={`flex-1 py-5 text-center font-bold text-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'emi' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Home size={20} /> EMI Calculator
                        </button>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-12">

                        {/* INPUT CONTROLS */}
                        <div className="lg:w-1/2 space-y-8">

                            {activeTab === 'sip' ? (
                                <>
                                    {/* Monthly Investment */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Monthly Investment (₹)</label>
                                            <div className="flex items-center text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg">
                                                {formatCurrency(sipAmount)}
                                            </div>
                                        </div>
                                        <input type="range" min="500" max="100000" step="500" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-full accent-blue-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>₹500</span><span>₹1 L</span></div>
                                    </div>

                                    {/* Expected Return Rate */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Expected Return Rate (p.a)</label>
                                            <div className="flex items-center text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg">
                                                {sipReturnRate}%
                                            </div>
                                        </div>
                                        <input type="range" min="1" max="30" step="0.5" value={sipReturnRate} onChange={(e) => setSipReturnRate(Number(e.target.value))} className="w-full accent-blue-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>1%</span><span>30%</span></div>
                                    </div>

                                    {/* Time Period */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Time Period (Years)</label>
                                            <div className="flex items-center text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg">
                                                {sipYears} Yr
                                            </div>
                                        </div>
                                        <input type="range" min="1" max="40" step="1" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full accent-blue-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>1 Yr</span><span>40 Yr</span></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Loan Amount */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Loan Amount (₹)</label>
                                            <div className="flex items-center text-emerald-600 font-bold text-xl bg-emerald-50 px-3 py-1 rounded-lg">
                                                {formatCurrency(loanAmount)}
                                            </div>
                                        </div>
                                        <input type="range" min="100000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-emerald-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>₹1 L</span><span>₹5 Cr</span></div>
                                    </div>

                                    {/* Interest Rate */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Interest Rate (p.a)</label>
                                            <div className="flex items-center text-emerald-600 font-bold text-xl bg-emerald-50 px-3 py-1 rounded-lg">
                                                {loanInterestRate}%
                                            </div>
                                        </div>
                                        <input type="range" min="1" max="20" step="0.1" value={loanInterestRate} onChange={(e) => setLoanInterestRate(Number(e.target.value))} className="w-full accent-emerald-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>1%</span><span>20%</span></div>
                                    </div>

                                    {/* Loan Tenure */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-bold text-slate-600">Loan Tenure (Years)</label>
                                            <div className="flex items-center text-emerald-600 font-bold text-xl bg-emerald-50 px-3 py-1 rounded-lg">
                                                {loanYears} Yr
                                            </div>
                                        </div>
                                        <input type="range" min="1" max="30" step="1" value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} className="w-full accent-emerald-600" />
                                        <div className="flex justify-between text-xs text-slate-400"><span>1 Yr</span><span>30 Yr</span></div>
                                    </div>
                                </>
                            )}

                        </div>

                        {/* RESULTS & CHART VISUALIZATION */}
                        <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">

                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                {activeTab === 'sip' ? (
                                    <>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Invested Amount</div>
                                            <div className="text-xl font-bold text-slate-800">{formatCurrency(sipData.investedAmount)}</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Est. Returns</div>
                                            <div className="text-xl font-bold text-emerald-600">{formatCurrency(sipData.estReturns)}</div>
                                        </div>
                                        <div className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-lg shadow-blue-500/20 text-white flex justify-between items-center">
                                            <div>
                                                <div className="text-blue-100 text-sm font-medium mb-1">Total Expected Value</div>
                                                <div className="text-3xl font-bold">{formatCurrency(sipData.totalValue)}</div>
                                            </div>
                                            <Landmark size={40} className="text-blue-200 opacity-50" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Principal Amount</div>
                                            <div className="text-xl font-bold text-slate-800">{formatCurrency(emiData.principalAmount)}</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Total Interest</div>
                                            <div className="text-xl font-bold text-red-500">{formatCurrency(emiData.totalInterest)}</div>
                                        </div>
                                        <div className="col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-2xl shadow-lg shadow-emerald-500/20 text-white flex justify-between items-center">
                                            <div>
                                                <div className="text-emerald-100 text-sm font-medium mb-1">Monthly EMI</div>
                                                <div className="text-3xl font-bold">{formatCurrency(emiData.emi)}</div>
                                            </div>
                                            <Calculator size={40} className="text-emerald-200 opacity-50" />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Donut Chart */}
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={activeTab === 'sip' ? sipData.chartData : emiData.chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {(activeTab === 'sip' ? sipData.chartData : emiData.chartData).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            formatter={(value: any) => formatCurrency(Number(value) || 0)}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
