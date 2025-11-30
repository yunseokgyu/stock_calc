export const generateStockData = (symbol, startDate, endDate, initialInvestment, monthlyContribution) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data = [];

    let currentDate = new Date(start);
    let currentPrice = 100; // Base price
    let totalInvested = Number(initialInvestment);
    let currentShares = totalInvested / currentPrice;

    // Seed random based on symbol to make it consistent for the same symbol
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let volatility = 0.02; // 2% daily volatility
    let trend = 0.0005; // Slight upward trend

    // Adjust volatility/trend based on symbol "type" (fake logic)
    if (['QQQ', 'TQQQ', 'SOXL'].includes(symbol.toUpperCase())) {
        volatility = 0.03;
        trend = 0.0008;
    } else if (['SPY', 'VOO'].includes(symbol.toUpperCase())) {
        volatility = 0.015;
        trend = 0.0004;
    }

    while (currentDate <= end) {
        // Random walk
        const change = (Math.sin(currentDate.getTime() * seed) * volatility) + trend + (Math.random() * volatility - volatility / 2);
        currentPrice = currentPrice * (1 + change);

        // Monthly contribution (simplified: add on the 1st of each month)
        if (currentDate.getDate() === 1 && monthlyContribution > 0) {
            const contribution = Number(monthlyContribution);
            totalInvested += contribution;
            currentShares += contribution / currentPrice;
        }

        const portfolioValue = currentShares * currentPrice;

        data.push({
            date: currentDate.toISOString().split('T')[0],
            price: currentPrice,
            invested: totalInvested,
            value: portfolioValue,
            profit: portfolioValue - totalInvested
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
};

export const getExchangeRate = (dateStr) => {
    // Mock exchange rate logic
    // In a real app, this would fetch from an API
    const date = new Date(dateStr);
    const year = date.getFullYear();

    // Simple mock trend: Exchange rate increases over time
    // Base: 1100, +50 per year since 2020, plus some random fluctuation
    const baseRate = 1200;
    const yearDiff = year - 2020;
    const randomFluctuation = Math.floor(Math.random() * 100) - 50;

    return baseRate + (yearDiff * 20) + randomFluctuation;
};
