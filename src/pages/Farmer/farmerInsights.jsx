import "../../styles/farmerInsights.css";
import { useState } from 'react';
import MarketChart from '../../imgs/image.png';

export default function FarmerInsights({ onBack }) {
  const [formData, setFormData] = useState({
    region: '',
    currentSeason: '',
    soilType: '',
    rainfallLevel: ''
  });

  const [stockQuantity] = useState(8000);
  const [soldQuantity] = useState(6000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <section className="farmer-insights">
      <button className="plus-icon" onClick={onBack}>⇽</button>
      
      <div className="insights-container">
        <div className="plan-section">
          <h1 className="plan-title">Plan Your Success</h1>
          <p className="plan-description">
            Make informed decisions using real-time market demand, soil conditions, and weather patterns to maximize your yield and profits.
          </p>
          
          <div className="plan-form-panel">
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              className="plan-input"
            />
            <input
              type="text"
              name="currentSeason"
              placeholder="Current Season"
              value={formData.currentSeason}
              onChange={handleChange}
              className="plan-input"
            />
            <input
              type="text"
              name="soilType"
              placeholder="Soil Type"
              value={formData.soilType}
              onChange={handleChange}
              className="plan-input"
            />
            <input
              type="text"
              name="rainfallLevel"
              placeholder="Rainfall Level"
              value={formData.rainfallLevel}
              onChange={handleChange}
              className="plan-input"
            />
            <button type="submit" className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className="market-section">
          <div className="section-header">
            <h2 className="section-title">Market Demand Analysis</h2>
            <div className="title-underline"></div>
          </div>
          
          <p className="market-instructions">
            This chart shows you which crops are most wanted by buyers right now. The taller the bar, the higher the demand in your region.
          </p>
          
          <div className="guidance-boxes">
            <div className="guidance-box high-demand">
              <h3>HIGH DEMAND (Plant More)</h3>
              <p>Tall bars = High buyer interest</p>
              <p>Best profit opportunities</p>
              <p>Focus your planting here</p>
            </div>
            <div className="guidance-box low-demand">
              <h3>LOW DEMAND (Avoid Planting)</h3>
              <p>Short bars = Low buyer interest</p>
              <p>Prices will likely be lower</p>
              <p>Consider other crops</p>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>Quantity</span>
              <span className="arrow-up">↑</span>
            </div>
            <div className="chart-content">
              <img 
                src={MarketChart} 
                alt="Market Demand Chart" 
                className="chart-image"
              />
            </div>
            <div className="chart-x-axis">
              <span className="arrow-right">→</span>
              <span>Crops</span>
            </div>
          </div>
        </div>

        <div className="stock-section">
          <div className="section-header">
            <h2 className="section-title">Stock management</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="stock-details">
            <p>Stock quantity: {stockQuantity} Kg</p>
            <p>Sold quantity: {soldQuantity} Kg</p>
          </div>
        </div>
      </div>
    </section>
  );
}
