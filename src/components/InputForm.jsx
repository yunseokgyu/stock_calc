import React, { useState } from 'react';
import { Search, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const InputForm = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        symbol: 'AAPL',
        startDate: '2020-01-01',
        endDate: new Date().toISOString().split('T')[0],
        initialInvestment: 10000,
        monthlyContribution: 500
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <div className="glass-panel p-8 mb-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Symbol Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        종목 티커 (예: AAPL, SPY)
                    </label>
                    <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        className="input-field uppercase font-bold tracking-wider"
                        placeholder="AAPL"
                        required
                    />
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        시작일
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        종료일
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Investment Amounts */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-400" />
                        초기 투자금 ($)
                    </label>
                    <input
                        type="number"
                        name="initialInvestment"
                        value={formData.initialInvestment}
                        onChange={handleChange}
                        className="input-field"
                        min="0"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        월 적립금 ($)
                    </label>
                    <input
                        type="number"
                        name="monthlyContribution"
                        value={formData.monthlyContribution}
                        onChange={handleChange}
                        className="input-field"
                        min="0"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                        계산하기
                    </button>
                </div>

            </form>
        </div>
    );
};

export default InputForm;
