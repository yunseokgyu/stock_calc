import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from 'lucide-react';
import { getExchangeRate } from '../utils/mockData';

const StatCard = ({ title, value, subValue, isPositive, icon: Icon }) => (
    <div className="glass-panel p-6 flex flex-col justify-between hover:bg-white/15 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
            <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {subValue}
            </div>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-xl">
                <p className="text-slate-300 mb-2">{label}</p>
                <p className="text-blue-400 font-bold">
                    평가금: ${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-slate-400 text-sm">
                    투자원금: ${payload[1].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
            </div>
        );
    }
    return null;
};

const ResultsDashboard = ({ data }) => {
    if (!data || data.length === 0) return null;

    const initialValue = data[0].invested;
    const finalValue = data[data.length - 1].value;
    const totalInvested = data[data.length - 1].invested;
    const totalProfit = finalValue - totalInvested;
    const roi = (totalProfit / totalInvested) * 100;

    // KRW Calculation
    const endDate = data[data.length - 1].date;
    const exchangeRate = getExchangeRate(endDate);
    const finalValueKRW = finalValue * exchangeRate;

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="최종 평가금액"
                    value={`$${finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    subValue={`약 ${finalValueKRW.toLocaleString(undefined, { maximumFractionDigits: 0 })}원 (환율 ${exchangeRate.toLocaleString()}원)`}
                    isPositive={totalProfit >= 0}
                    icon={DollarSign}
                />
                <StatCard
                    title="총 수익률 (ROI)"
                    value={`${roi.toFixed(2)}%`}
                    subValue={totalProfit >= 0 ? "수익 발생" : "손실 발생"}
                    isPositive={roi >= 0}
                    icon={Percent}
                />
                <StatCard
                    title="총 투자 원금"
                    value={`$${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    subValue="적립식 투자 포함"
                    isPositive={true}
                    icon={DollarSign}
                />
            </div>

            {/* Chart */}
            <div className="glass-panel p-6 h-[500px]">
                <h3 className="text-xl font-bold text-white mb-6">자산 성장 그래프</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            tickFormatter={(str) => str.substring(0, 7)}
                            minTickGap={50}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            name="평가금액"
                        />
                        <Line
                            type="monotone"
                            dataKey="invested"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            name="투자원금"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ResultsDashboard;
