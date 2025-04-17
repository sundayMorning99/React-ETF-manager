import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

//make sure to install react-chartjs-2 by 'npm install react-chartjs-2 chart.js'
// ETF class definition
class ETF {
  constructor(ticker, description, assetClass, expenseRatio) {
    this.ticker = ticker;
    this.description = description;
    this.assetClass = assetClass;
    this.expenseRatio = expenseRatio;
  }
}

// ETF instances
const etfs = [
  new ETF('IVV', 'S&P 500 ETF', 'Large Cap', 0.03),
  new ETF('IJH', 'Mid-Cap ETF', 'Mid Cap', 0.05),
  new ETF('IJR', 'Small-Cap ETF', 'Small Cap', 0.06),
  new ETF('IEFA', 'Developed Markets', 'International', 0.07),
  new ETF('IEMG', 'Emerging Markets', 'International', 0.11),
  new ETF('AGG', 'Core U.S. Bond Market', 'Bonds', 0.04),
];

// Allocation styles
const styles = {
  conservative: [0.2, 0.1, 0.1, 0.15, 0.05, 0.4],
  moderate: [0.25, 0.15, 0.1, 0.2, 0.1, 0.2],
  aggressive: [0.3, 0.2, 0.15, 0.2, 0.1, 0.05],
};

function App() {
  const [amount, setAmount] = useState('');
  const [style, setStyle] = useState('moderate');

  //make sure input for amount is number
  const numericAmount = parseFloat(amount);
  const allocations = styles[style].map(p =>
    !isNaN(numericAmount) ? (p * numericAmount).toFixed(2) : 0
  );

  const chartData = {
    labels: etfs.map(etf => etf.ticker),
    datasets: [
      {
        data: allocations,
        backgroundColor: ['#007bff', '#6f42c1', '#20c997', '#fd7e14', '#dc3545', '#ffc107'],
      },
    ],
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary">ETF Investment Breakdown</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="investmentAmount" className="form-label fw-semibold">Total Investment Amount ($):</label>
          <input
            id="investmentAmount"
            type="number"
            className="form-control"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter dollar amount"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="investmentStyle" className="form-label fw-semibold">Investment Style:</label>
          <select
            id="investmentStyle"
            className="form-select"
            value={style}
            onChange={e => setStyle(e.target.value)}
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>
      {/*in HTML row length is 12. So, if you wan to make two-column layout set column length 6*/}
      <div className="row">
        {/* ETF breakdown */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">ETF Allocations</div>
            <ul className="list-group list-group-flush">
              {etfs.map((etf, index) => (
                <li key={etf.ticker} className="list-group-item d-flex justify-content-between">
                  <span>
                    <strong>{etf.ticker}</strong> - {etf.description}
                  </span>
                  <span className="text-success">${allocations[index]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pie chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-bold text-center">Pie Chart</div>
            <div className="card-body">
              <Pie data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
