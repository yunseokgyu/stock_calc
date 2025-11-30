import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 tracking-tight">
                        주식 가치 투자 계산기
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        미국 주식 및 ETF의 과거 데이터를 기반으로 당신의 투자 성과를 시뮬레이션하세요.
                    </p>
                </header>

                <main>
                    {children}
                </main>

                <footer className="mt-20 text-center text-slate-600 text-sm">
                    <p>© 2024 StockValue. All rights reserved. Data is for simulation purposes only.</p>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
