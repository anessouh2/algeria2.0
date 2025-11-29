import "../../styles/farmer.css";

const cards = [
  {
    title: "Total listings",
    description: "Your products on the market",
    value: "5 listings",
    badge: "listings",
  },
  {
    title: "Ordered Pending",
    description: "Orders waiting for your action",
    value: "3 Orders",
    badge: "orders",
  },
  {
    title: "This month's Revenue",
    description: "Earnings from AgroConnect sales",
    value: "30.000 DZ",
    badge: "revenue",
  },
];

export default function Farmer({ onAddNewProduct, onMarketInsights, onTransportation, onBackToLanding }) {
  return (
    <section className="farmer">
      <button className="plus-icon" onClick={onBackToLanding}>⇽</button>
      <div className="farmer-overlay">
        <div className="farmer-top">
          <h1>Welcome Producer</h1>
        </div>
        <div className="farmer-intro">
          <h2>Your Farm's Command Center</h2>
          <p>
            Turn market data into profit. AgroConnect gives you the insights to
            grow what sells, the tools to sell what you grow, and the
            connections to maximize your earnings.
          </p>
          <div className="farmer-actions">
            <button onClick={onAddNewProduct}>Add new product</button>
            <button onClick={onMarketInsights}>Market insights</button>
            <button onClick={onTransportation}>Transportation</button>
          </div>
        </div>
        <div className="farmer-cards">
          {cards.map((card) => (
            <button className="stat-card" key={card.title}>
              <div className="card-icon" data-variant={card.badge}>
                <span />
              </div>
              <div className="card-body">
                <p className="card-label">{card.title}</p>
                <p className="card-description">{card.description}</p>
                <p className="card-value">{card.value}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
