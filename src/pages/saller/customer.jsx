import "../../styles/customer.css";
import { useState, useEffect } from 'react';
import Shop from '../../imgs/shopp.png';

const initialProducts = [

  {
    id: 2,
    name: "Onions",
    category: "Vegetables",
    farmerName: "Tahar Amar",
    quantity: 400,
    unitPrice: 25,
    description: "A Fundamental Crop with Strong Flavor and High Value.",
    image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400"
  },
  {
    id: 3,
    name: "Orange",
    category: "Fruits",
    farmerName: "Said Bouchareb",
    quantity: 250,
    unitPrice: 70,
    description: "Fresh, Nutritious, and Rich in Vitamin C.",
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400"
  },
  {
    id: 4,
    name: "Potatoes",
    category: "Vegetables",
    farmerName: "Abderahmane Naim",
    quantity: 350,
    unitPrice: 35,
    description: "A High-Yield Crop Essential to Global Food Supply.",
    image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400"
  },
  {
    id: 5,
    name: "Bananas",
    category: "Fruit",
    farmerName: "Abdelkader Hamid",
    quantity: 150,
    unitPrice: 200,
    description: "A Tropical Fruit Loved for Taste and Nutrition.",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
  }
];

export default function Customer({ onNavigateToCard, cart = [], onUpdateCart, onBackToLanding }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    if (onUpdateCart) {
      onUpdateCart(updatedCart);
    }
    localStorage.setItem('customerCart', JSON.stringify(updatedCart));
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleShopClick = () => {
    if (onNavigateToCard) {
      onNavigateToCard();
    }
  };

  const handleBack = () => {
    if (onBackToLanding) {
      onBackToLanding();
    }
  };

  return (
    <section className="customer">
      <div className="customer-header">
        <div className="header-content">
          <h1>Welcome dear customer!</h1>
          <h2>Source Fresh, Traceable Quality</h2>
          <p>Connect directly with local producers. Find the best products, verify their origin, and build your supply chain with confidence.</p>
        </div>
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for Tomatoes onions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {showSuccessMessage && (
        <div className="success-message">
          Order added successfully!
        </div>
      )}
      <div className="products-section">
        <div className="shop">
          <button onClick={handleShopClick}><img src={Shop} /></button> 
           <p>My Pannier</p>
        </div>
        <h2 className="products-title">Available Products</h2>
        <p className="products-subtitle">Here is our available chops for now:</p>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-detail">Product: {product.name}</p>
                <p className="product-detail">Category: {product.category}</p>
                <p className="product-detail">Farmer name: {product.farmerName}</p>
                <p className="product-detail">Quantity: {product.quantity}kg</p>
                <p className="product-detail">Unit price: {product.unitPrice} DA</p>
                <p className="product-description">{product.description}</p>
              </div>
              <div className="product-actions">
                <button className="order-button" onClick={() => handleAddToCart(product)}>
                  Order Now
                </button>
                <button className="read-more-button">
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
