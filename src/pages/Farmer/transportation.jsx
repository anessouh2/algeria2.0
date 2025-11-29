import "../../styles/transportation.css";
import { useState } from "react";

const transporters = [
  {
    id: 1,
    name: "Anas Zoughailech",
    destination: "Ain Defla - Chlef - Blida",
    contact: "+213 234567890",
    region: "Center"
  },
  {
    id: 2,
    name: "Anas Oughailech",
    destination: "Ain Defla - Chlef - Blida",
    contact: "+213 234567890",
    region: "Ain Defla"
  },
  {
    id: 3,
    name: "Rais Hamroida",
    destination: "Ain Defla - Chlef - Blida",
    contact: "+213 234567890",
    region: "Ain Defla"
  }
];

export default function Transportation({ onBack }) {
  const [formData, setFormData] = useState({
    startingPoint: "",
    destination: "",
    weight: "",
    nature: "",
    product: ""
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <section className="transportation">
      <button className="back-button" onClick={onBack}>⇽</button>
      
      <div className="transportation-container">
        <div className="transportation-header">
          <h1>Find optimal Transportation</h1>
          <p>Connect with reliable transporters to efficiently move your agricultural products to market</p>
        </div>

        <form className="transportation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startingPoint">Starting point</label>
            <input
              type="text"
              id="startingPoint"
              name="startingPoint"
              value={formData.startingPoint}
              onChange={handleInputChange}
              placeholder="Enter starting location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Maximum weight capacity</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nature">Nature of the route</label>
            <input
              type="text"
              id="nature"
              name="nature"
              value={formData.nature}
              onChange={handleInputChange}
              placeholder="e.g., Highway, Rural road"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product">Type of the product</label>
            <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="e.g., Vegetables, Fruits"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Find best Transportation
          </button>
        </form>

        {isSearching && (
          <div className="searching-status">
            Searching for transporters...
          </div>
        )}

        <div className="transporters-section">
          <h2>Transporters going to the same destination</h2>
          
          <div className="transporters-list">
            {transporters.map((transporter) => (
              <div key={transporter.id} className="transporter-card">
                <div className="transporter-info">
                  <p className="transporter-name">Name: {transporter.name}</p>
                  <p className="transporter-destination">Destination: {transporter.destination}</p>
                  <p className="transporter-contact">Contact: {transporter.contact}</p>
                  <p className="transporter-region">Region: {transporter.region}</p>
                </div>
                <button className="request-button">Request</button>
              </div>
            ))}
          </div>
        </div>

        <div className="best-road-section">
          <h2>Showing best road</h2>
          <div className="map-placeholder">
            {/* Map integration would go here */}
            <p>Map view coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
