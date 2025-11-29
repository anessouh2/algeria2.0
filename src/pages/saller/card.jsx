import "../../styles/card.css";
import { useState, useEffect } from 'react';

export default function Card({ cartItems = [], onBack, onUpdateCart }) {
  const [localCart, setLocalCart] = useState(cartItems);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const handleRemove = (productId) => {
    const updatedCart = localCart.filter(item => item.id !== productId);
    setLocalCart(updatedCart);
    if (onUpdateCart) {
      onUpdateCart(updatedCart);
    }
  };

  const handleUpdate = (productId) => {
    // You can implement update logic here (e.g., open a modal to edit quantity)
    // For now, we'll just keep the same item
    console.log('Update product:', productId);
  };

  

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const calculateTotalPrice = (quantity, unitPrice) => {
    return quantity * unitPrice;
  };

  return (
    <section className="card-page">
      <button className="back-button" onClick={handleBack}>
        ←
      </button>
      
      <div className="card-header">
        <h1>Review Your Order</h1>
        <p className="card-subtitle">Almost there! Review your items and proceed to checkout.</p>
      </div>

      <div className="card-content">
        <div className="my-card-header">
          <h2>My Card</h2>
          <div className="header-line"></div>
        </div>

        <div className="cart-items">
          {localCart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            localCart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <p className="item-name">Product: {item.name}</p>
                  <p className="item-category">category: {item.category}</p>
                  <p className="item-quantity">quantity: {item.quantity}kg</p>
                  <p className="item-price">price to be paid: {calculateTotalPrice(item.quantity, item.unitPrice)} DA</p>
                </div>
                <div className="item-actions">
                  <button className="update-button" onClick={() => handleUpdate(item.id)}>
                    Update
                  </button>
                  <button className="remove-button" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
    </section>
  );
}
