let alphaApiKey = '';
let finnhubApiKey = '';
let viewCount = localStorage.getItem('viewCount') || 0;
let dataFetched = false;

// Display initial view count
updateViewCount();

function updateViewCount() {
    document.getElementById('view-count').textContent = viewCount;
    localStorage.setItem('viewCount', viewCount); // Update localStorage with the new count
}

function submitApiKeys() {
    alphaApiKey = document.getElementById('alpha-api-key').value;
    finnhubApiKey = document.getElementById('finnhub-api-key').value;

    if (!alphaApiKey && !finnhubApiKey) {
        alert('Please provide at least one API key!');
        return;
    }

    fetchData();
}

function fetchData() {
    const alertsDiv = document.getElementById('alerts');
    const stockTableBody = document.getElementById('stock-table-body');
    const lastFetchedSpan = document.getElementById('last-fetched');

    alertsDiv.innerHTML = ''; // Clear any previous alerts

    // Display default empty data while fetching
    stockTableBody.innerHTML = generateTableRows(getEmptyStocks());

    if (alphaApiKey) {
        fetchAlphaVantageData();
    } else if (finnhubApiKey) {
        fetchFinnhubData();
    } else {
        alertsDiv.innerHTML = 'Data cannot be fetched. Please check your internet connection.';
        showDefaultTable();
    }
}

function getEmptyStocks() {
    const emptyStock = { openPrice: '-', prevClose: '-', currentPrice: '-', spyWeightage: '-', rsi: '-', ema20: '-', ema50: '-', openDate: '-', closeDate: '-' };
    return [
        { symbol: 'MSFT', ...emptyStock },
        { symbol: 'AAPL', ...emptyStock },
        { symbol: 'GOOGL', ...emptyStock },
        { symbol: 'AMZN', ...emptyStock },
        { symbol: 'TSLA', ...emptyStock },
        { symbol: 'NVDA', ...emptyStock },
        { symbol: 'META', ...emptyStock },
        { symbol: 'SPY', ...emptyStock }
    ];
}

function generateTableRows(stocks) {
    return stocks.map(stock => `
        <tr>
            <td>${stock.symbol}</td>
            <td>${stock.openPrice} (${stock.openDate})</td>
            <td>${stock.prevClose} (${stock.closeDate})</td>
            <td>${stock.currentPrice}</td>
            <td>${stock.spyWeightage ? (stock.spyWeightage * 100).toFixed(2) + '%' : '-'}</td>
            <td>${stock.rsi}</td>
            <td>${stock.ema20}</td>
            <td>${stock.ema50}</td>
        </tr>
    `).join('');
}

function showDefaultTable() {
    const stockTableBody = document.getElementById('stock-table-body');
    stockTableBody.innerHTML = generateTableRows(getEmptyStocks());
    document.getElementById('last-fetched').textContent = new Date().toLocaleString();
}

// Simulate fetching data from Alpha Vantage
function fetchAlphaVantageData() {
    setTimeout(() => {
        const data = [
            { symbol: 'MSFT', openPrice: '250.00', prevClose: '249.50', currentPrice: '255.00', spyWeightage: 0.05, rsi: '62', ema20: '252.50', ema50: '245.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'AAPL', openPrice: '145.09', prevClose: '144.90', currentPrice: '146.00', spyWeightage: 0.03, rsi: '60', ema20: '145.50', ema50: '143.75', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'GOOGL', openPrice: '2719.50', prevClose: '2700.00', currentPrice: '2725.00', spyWeightage: 0.04, rsi: '62', ema20: '2720.50', ema50: '2705.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'AMZN', openPrice: '3300.00', prevClose: '3280.00', currentPrice: '3325.00', spyWeightage: 0.03, rsi: '55', ema20: '3295.00', ema50: '3200.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'TSLA', openPrice: '650.00', prevClose: '645.00', currentPrice: '660.00', spyWeightage: 0.04, rsi: '65', ema20: '650.00', ema50: '640.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'NVDA', openPrice: '400.00', prevClose: '398.00', currentPrice: '410.00', spyWeightage: 0.06, rsi: '70', ema20: '405.00', ema50: '395.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'META', openPrice: '340.00', prevClose: '335.00', currentPrice: '345.00', spyWeightage: 0.02, rsi: '58', ema20: '342.50', ema50: '340.00', openDate: '2025-02-15', closeDate: '2025-02-14' },
            { symbol: 'SPY', openPrice: '430.00', prevClose: '429.00', currentPrice: '432.00', spyWeightage: 1.00, rsi: '60', ema20: '430.50', ema50: '425.00', openDate: '2025-02-15', closeDate: '2025-02-14' }
        ];

        const stockTableBody = document.getElementById('stock-table-body');
        stockTableBody.innerHTML = generateTableRows(data);
        document.getElementById('last-fetched').textContent = new Date().toLocaleString();
    }, 1000); // Simulating data fetch delay
}

function fetchFinnhubData() {
    // Implement Finnhub API data fetching logic here
}
