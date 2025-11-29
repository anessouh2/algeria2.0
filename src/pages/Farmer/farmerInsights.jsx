import "../../styles/farmerInsights.css";
import { useState } from 'react';
import { marketAPI } from '../../api';

export default function FarmerInsights({ onBack }) {
  const [formData, setFormData] = useState({
    region: '',
    season: '',
    soil_type: ''
  });

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockQuantity] = useState(8000);
  const [soldQuantity] = useState(6000);

  // Define available options based on ML model data
  const regions = ['North', 'Center', 'South'];
  const seasons = ['Summer', 'Autumn', 'Spring', 'Winter'];
  const soilTypes = ['Sandy', 'Clay', 'Loam', 'Silt'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.region || !formData.season || !formData.soil_type) {
      setError('Please select all fields before getting predictions.');
      return;
    }
    
    setLoading(true);
    setError('');
    setPredictions([]);

    console.log('Submitting form data:', formData);

    try {
      const response = await marketAPI.predictBestCrops(formData);
      console.log('API Response:', response);
      setPredictions(response.data.best_crops || []);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to get predictions. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="plan-input"
              required
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="plan-input"
              required
            >
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            
            <select
              name="soil_type"
              value={formData.soil_type}
              onChange={handleChange}
              className="plan-input"
              required
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
            
            <button 
              type="submit" 
              className="submit-button" 
              onClick={handleSubmit}
              disabled={loading || !formData.region || !formData.season || !formData.soil_type}
            >
              {loading ? 'Analyzing...' : 'Get Predictions'}
            </button>
            
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>

        <div className="market-section">
          <div className="section-header">
            <h2 className="section-title">AI Crop Demand Predictions</h2>
            <div className="title-underline"></div>
          </div>
          
          {predictions.length > 0 && (
            <div className="predictions-results">
              <h3>Top Recommended Crops for Your Conditions</h3>
              <div className="predictions-grid">
                {predictions.map((prediction, index) => (
                  <div key={prediction.crop} className={`prediction-card ${index === 0 ? 'top-pick' : ''}`}>
                    <div className="prediction-rank">#{index + 1}</div>
                    <h4>{prediction.crop}</h4>
                    <div className="demand-score">
                      <span className="score">{prediction.predicted_demand.toFixed(2)}</span>
                      <span className="label">Demand Score</span>
                    </div>
                    <div className="recommendation">
                      {index === 0 && <span className="badge best">BEST CHOICE</span>}
                      {index === 1 && <span className="badge good">GOOD OPTION</span>}
                      {index > 1 && <span className="badge consider">CONSIDER</span>}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="prediction-insights">
                <h4>Demand Analysis</h4>
                <p><strong>Highest Demand:</strong> {predictions[0]?.crop} (Score: {predictions[0]?.predicted_demand.toFixed(2)})</p>
                <p>Based on your location ({formData.region}), soil type ({formData.soil_type}), and season ({formData.season})</p>
              </div>
            </div>
          )}
          
          <p className="market-instructions">
            This analysis shows you which crops are predicted to have the highest demand based on current market conditions, weather patterns, and regional preferences.
          </p>
          
          <div className="guidance-boxes">
            <div className="guidance-box high-demand">
              <h3>HIGH DEMAND (Plant More)</h3>
              <p>Top 2 crops = Highest profit potential</p>
              <p>Best market opportunities</p>
              <p>Focus your planting here</p>
            </div>
            <div className="guidance-box low-demand">
              <h3>MODERATE DEMAND (Consider)</h3>
              <p>Middle ranked crops = Steady demand</p>
              <p>Good secondary options</p>
              <p>Balance your crop selection</p>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>{predictions.length > 0 ? 'Demand Score' : 'Waiting for Analysis'}</span>
              <span className="arrow-up">↑</span>
            </div>
            <div className="chart-content">
              {predictions.length > 0 ? (
                <div className="prediction-chart">
                  {predictions.map((prediction, index) => {
                    const maxDemand = Math.max(...predictions.map(p => p.predicted_demand));
                    const barHeight = maxDemand > 0 ? Math.max((prediction.predicted_demand / maxDemand) * 100, 15) : 50;
                    return (
                      <div key={prediction.crop} className="chart-bar">
                        <div 
                          className="bar-fill" 
                          style={{height: `${barHeight}%`}}
                        ></div>
                        <div className="bar-label">{prediction.crop}</div>
                        <div className="bar-value">{prediction.predicted_demand.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="waiting-chart">
                  <div className="waiting-message">
                    <h3>Select your conditions above and click "Get Predictions"</h3>
                    <p>The AI will analyze market demand and show you the best crops to plant</p>
                  </div>
                </div>
              )}
            </div>
            <div className="chart-x-axis">
              <span className="arrow-right">→</span>
              <span>{predictions.length > 0 ? 'Crops' : 'Analysis Results'}</span>
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
