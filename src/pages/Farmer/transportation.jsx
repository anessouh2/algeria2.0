import "../../styles/transportation.css";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { transporterAPI } from '../../api';

// Fix for default markers in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for start and end points
const startIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#4CAF50" stroke="white" stroke-width="3"/>
      <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">A</text>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const endIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#F44336" stroke="white" stroke-width="3"/>
      <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

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
  const [routeResult, setRouteResult] = useState(null);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([36.7538, 3.0588]); // Algiers coordinates
  const [mapZoom, setMapZoom] = useState(7);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [availableTransporters, setAvailableTransporters] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await transporterAPI.getLocations();
        setLocations(response.data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createSimpleRoute = (startCoords, endCoords) => {
    // This function is now deprecated - routes come from backend
    return [[startCoords.lat, startCoords.lng], [endCoords.lat, endCoords.lng]];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setRouteResult(null);
    setRouteCoordinates([]);
    setAvailableTransporters([]);

    try {
      const response = await transporterAPI.optimizeRoute({
        starting_point: formData.startingPoint,
        destination: formData.destination,
        weight_kg: parseFloat(formData.weight),
        route_nature: formData.nature,
        product_type: formData.product
      });

      console.log('Route optimization response:', response.data);
      setRouteResult(response.data);

      // Set map center and zoom to show the route
      const startLocation = locations.find(loc => loc.name === response.data.starting_point);
      const endLocation = locations.find(loc => loc.name === response.data.destination);

      if (startLocation && endLocation) {
        // Calculate center point
        const centerLat = (startLocation.latitude + endLocation.latitude) / 2;
        const centerLng = (startLocation.longitude + endLocation.longitude) / 2;
        setMapCenter([centerLat, centerLng]);

        // Calculate appropriate zoom level based on distance
        const distance = Math.sqrt(
          Math.pow(endLocation.latitude - startLocation.latitude, 2) +
          Math.pow(endLocation.longitude - startLocation.longitude, 2)
        );
        const zoom = Math.max(7, Math.min(12, 10 - distance * 2));
        setMapZoom(zoom);

        // Use actual route coordinates from backend if available
        if (response.data.route_coordinates && response.data.route_coordinates.length > 0) {
          // Use the full route coordinates from the routing service
          setRouteCoordinates(response.data.route_coordinates);
        } else if (response.data.route_info && response.data.route_info.uses_real_roads && response.data.waypoints) {
          // Fallback to waypoints if detailed coordinates aren't available
          const routePoints = response.data.waypoints.map(point => [point.lat, point.lon]);
          setRouteCoordinates(routePoints);
        } else {
          // Final fallback to simple route visualization
          const routePoints = createSimpleRoute(
            { lat: startLocation.latitude, lng: startLocation.longitude },
            { lat: endLocation.latitude, lng: endLocation.longitude }
          );
          setRouteCoordinates(routePoints);
        }
      }

      // Fetch available transporters for this route
      try {
        const transportersResponse = await transporterAPI.getAvailableTransporters(
          formData.startingPoint,
          formData.destination
        );
        console.log('Available transporters:', transportersResponse.data);
        setAvailableTransporters(transportersResponse.data.available_transporters || []);
      } catch (transportersError) {
        console.error('Failed to fetch transporters:', transportersError);
        // Keep empty array if fetching fails
        setAvailableTransporters([]);
      }

    } catch (err) {
      console.error('Route optimization error:', err);
      setError('Failed to optimize route. Please try again.');
    } finally {
      setIsSearching(false);
    }
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
            <select
              id="startingPoint"
              name="startingPoint"
              value={formData.startingPoint}
              onChange={handleInputChange}
              required
            >
              <option value="">Select starting location</option>
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            >
              <option value="">Select destination</option>
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
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
          <h2>Available Transporters for this Route</h2>
          
          {availableTransporters.length > 0 ? (
            <div className="transporters-list">
              {availableTransporters.map((transporter) => (
                <div key={transporter.id} className="transporter-card">
                  <div className="transporter-info">
                    <p className="transporter-name">🏢 {transporter.company_name}</p>
                    <p className="transporter-destination">📍 Operating in: {transporter.city}</p>
                    <p className="transporter-contact">📞 {transporter.phone_number}</p>
                    <p className="transporter-region">⭐ Rating: {transporter.average_rating}/5 ({transporter.total_deliveries} deliveries)</p>
                    <p className="transporter-vehicles">🚛 Vehicles: {transporter.vehicle_types.join(', ')}</p>
                    <p className="transporter-cost">💰 Estimated Cost: {transporter.estimated_cost}</p>
                    <p className="transporter-time">⏱️ Estimated Time: {transporter.estimated_time}</p>
                    <p className="transporter-radius">📏 Service Radius: {transporter.service_radius} km</p>
                  </div>
                  <button className="request-button">Request Quote</button>
                </div>
              ))}
            </div>
          ) : routeResult ? (
            <div className="no-transporters">
              <p>No transporters currently available for this route. Please try again later or contact support.</p>
            </div>
          ) : (
            <div className="transporters-placeholder">
              <p>Select a starting point and destination to see available transporters</p>
            </div>
          )}
        </div>

        <div className="best-road-section">
          <h2>Showing best road</h2>
          {error && <div className="error-message">{error}</div>}
          
          {routeResult && (
            <div className="route-results">
              <div className="route-summary">
                <h3>Route Summary</h3>
                <p><strong>Total Distance:</strong> {routeResult.total_distance_km} km</p>
                <p><strong>Estimated Time:</strong> {routeResult.estimated_time_hours ? `${routeResult.estimated_time_hours} hours` : 'Calculating...'}</p>
                <p><strong>Route Type:</strong> {routeResult.route_info?.route_quality === 'real_roads' ? '🚗 Real Road Route' : '🛣️ Advanced Road Network Simulation'}</p>
                {routeResult.route_info && (
                  <p><strong>Routing:</strong> {routeResult.route_info.routing_service} ({routeResult.route_info.coordinates_count} points)</p>
                )}
                {routeResult.route_info?.simulation_details && (
                  <p><strong>Route Style:</strong> {routeResult.route_info.simulation_details.primary_type} roads</p>
                )}
                <p><strong>From:</strong> {routeResult.starting_point}</p>
                <p><strong>To:</strong> {routeResult.destination}</p>
              </div>
              
              <div className="map-container">
                <MapContainer 
                  center={mapCenter} 
                  zoom={mapZoom} 
                  style={{ 
                    width: '100%', 
                    height: '500px', 
                    borderRadius: '12px',
                    border: '2px solid #4caf50'
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Route Line */}
                  {routeCoordinates.length > 0 && (
                    <Polyline 
                      positions={routeCoordinates}
                      color="#4285F4"
                      weight={5}
                      opacity={0.8}
                    />
                  )}
                  
                  {/* Start Marker */}
                  {routeResult.starting_point && locations.find(loc => loc.name === routeResult.starting_point) && (
                    <Marker 
                      position={[
                        locations.find(loc => loc.name === routeResult.starting_point).latitude,
                        locations.find(loc => loc.name === routeResult.starting_point).longitude
                      ]}
                      icon={startIcon}
                    >
                      <Popup>
                        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                          <h4 style={{ margin: '0 0 8px 0', color: '#2e7d32' }}>🚚 Starting Point</h4>
                          <p style={{ margin: '4px 0' }}><strong>{routeResult.starting_point}</strong></p>
                          <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>Green marker indicates start</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                  
                  {/* End Marker */}
                  {routeResult.destination && locations.find(loc => loc.name === routeResult.destination) && (
                    <Marker 
                      position={[
                        locations.find(loc => loc.name === routeResult.destination).latitude,
                        locations.find(loc => loc.name === routeResult.destination).longitude
                      ]}
                      icon={endIcon}
                    >
                      <Popup>
                        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                          <h4 style={{ margin: '0 0 8px 0', color: '#d32f2f' }}>🏁 Destination</h4>
                          <p style={{ margin: '4px 0' }}><strong>{routeResult.destination}</strong></p>
                          <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>Red marker indicates end</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
              
              {routeResult.routes && routeResult.routes.length > 0 && (
                <div className="route-details">
                  <h3>Route Details</h3>
                  {routeResult.routes.map((route, index) => (
                    <div key={index} className="route-item">
                      <h4>Vehicle {index + 1}</h4>
                      <p>Stops: {route.join(' → ')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!routeResult && !error && !isSearching && (
            <div className="map-placeholder">
              <MapContainer 
                center={[36.7538, 3.0588]} 
                zoom={7} 
                style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: '12px',
                  border: '2px solid #4caf50'
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[36.7538, 3.0588]}>
                  <Popup>
                    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#1a4d2e' }}>🗺️ Algeria</h4>
                      <p style={{ margin: '4px 0' }}>Select locations to view optimized route</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
