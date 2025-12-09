import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart, setCartItems } from '../../redux/actions';
import Header from '../header/header'; 
import './cart.css';

function Cart() {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userEmail = localStorage.getItem('userEmail');
  console.log(' Cart - Поточний користувач:', userEmail);

  useEffect(() => {
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      const savedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      console.log(' Завантажено корзину для', userEmail, ':', savedCart);
      dispatch(setCartItems(savedCart));
    }
  }, [userEmail, dispatch]);

  useEffect(() => {
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      console.log('Збережено корзину для', userEmail, ':', cartItems);
    }
  }, [cartItems, userEmail]);

  const TICKET_NAMES = {
    adult: "Adult Ticket",
    child: "Child Ticket",
    student: "Student Ticket",
    family: "Family Ticket"
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    dispatch(updateQuantity(productId, currentQuantity + 1));
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity(productId, currentQuantity - 1));
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      localStorage.setItem(cartKey, JSON.stringify([]));
      console.log('Очищено корзину для', userEmail);
    }
  };

  const handleContinueShopping = () => {
    navigate('/catalog');
  };

  const handleImageClick = (zooId) => {
    navigate(`/item/${zooId}`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <main className="cart-main">
          <h2>Shopping Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={handleContinueShopping} className="round-btn blue-btn">
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <main className="cart-main">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={handleClearCart} className="round-btn red-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image clickable-image"
                onClick={() => handleImageClick(item.zooId)}
              />
              
              <div className="cart-item-details">
                <h3 
                  className="clickable-title"
                  onClick={() => handleImageClick(item.zooId)}
                >
                  {item.name}
                </h3>

                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-meta">{item.visitors.toLocaleString()} visitors</p>
                <p className="cart-item-meta">{item.animals} animals • {item.type}</p>

                {item.ticketType && (
                  <p className="cart-item-meta">
                    Ticket type: <b>{TICKET_NAMES[item.ticketType]}</b>
                  </p>
                )}
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="round-btn quantity-btn"
                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="round-btn quantity-btn"
                    onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="round-btn red-btn"
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="total-section">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          
          <div className="cart-actions">
            <button onClick={handleContinueShopping} className="round-btn blue-btn">
              Continue Shopping
            </button>
            
            <button 
              onClick={() => navigate('/checkout')} 
              className="round-btn checkout-btn"
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;