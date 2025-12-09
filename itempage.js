import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import { getZooById } from "../../api/zoos";
import "./itempage.css";

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [zoo, setZoo] = useState(null);
  const [loading, setLoading] = useState(true);


  const [ticketType, setTicketType] = useState("adult");
  const [quantity, setQuantity] = useState(1);


  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchZoo = async () => {
      try {
        const data = await getZooById(id);
        setZoo(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZoo();
  }, [id]);

  const handleBackToCatalog = () => navigate("/catalog");


  const getBasePrice = () => {
    switch (zoo.type) {
      case "Urban Area":
        return 15;
      case "Wildlife Reserve":
        return 25;
      case "National Park":
        return 35;
      default:
        return 20;
    }
  };


  const calculateTicketPrice = (type) => {
    const base = getBasePrice();
    switch (type) {
      case "child":
        return base * 0.5;
      case "student":
        return base * 0.7;
      case "adult":
        return base;
      case "family":
        return base * 3;
      default:
        return base;
    }
  };

  const handleConfirm = () => {
    if (!zoo) return;

    const groupedId = `${zoo.id}-${ticketType}`; 

    const cartItem = {
      id: groupedId,
      zooId: zoo.id,
      name: zoo.name,
      price: calculateTicketPrice(ticketType),
      image: zoo.image,
      visitors: zoo.visitors,
      animals: zoo.animals,
      type: zoo.type,
      ticketType: ticketType,
      quantity: quantity
    };

    dispatch(addToCart(cartItem));
    setShowModal(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!zoo) return <div className="error">Zoo not found!</div>;

  const ticketOptions = [
    { type: "adult", label: "Adult Ticket", description: "Standard admission" },
    { type: "child", label: "Child Ticket", description: "Ages 3-12" },
    { type: "student", label: "Student Ticket", description: "With student ID" },
    { type: "family", label: "Family Ticket", description: "2 adults + 2 kids" }
  ];

  return (
    <div className="item-page">
      <button className="back-btn" onClick={handleBackToCatalog}>
        ← Back to Catalog
      </button>

      <div className="zoo-details">
        <img src={zoo.image} alt={zoo.name} className="zoo-detail-image" />

        <div className="zoo-info">
          <h1>{zoo.name}</h1>
          <p className="zoo-description">{zoo.description}</p>

          <div className="zoo-stats">
            <div className="stat">
              <span className="stat-label">Visitors per year:</span>
              <span className="stat-value">{zoo.visitors.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Animals:</span>
              <span className="stat-value">{zoo.animals}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Type:</span>
              <span className="stat-value">{zoo.type}</span>
            </div>
          </div>

          <div className="ticket-section">
            <h3>Select Ticket</h3>

            <div className="ticket-options">
              {ticketOptions.map((option) => (
                <div
                  key={option.type}
                  className={`ticket-option ${
                    ticketType === option.type ? "selected" : ""
                  }`}
                  onClick={() => setTicketType(option.type)}
                >
                  <div className="ticket-label">{option.label}</div>
                  <div className="ticket-description">{option.description}</div>
                  <div className="ticket-price">
                    ${calculateTicketPrice(option.type).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="quantity-control">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="total-price">
              Total: ${(calculateTicketPrice(ticketType) * quantity).toFixed(2)}
            </div>

            <button className="add-to-cart-btn" onClick={handleConfirm}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Tickets added to Cart!</h3>
            <p>
              {quantity} × {ticketType} ticket(s)
            </p>
            <p>
              Total: $
              {(calculateTicketPrice(ticketType) * quantity).toFixed(2)}
            </p>

            <div className="modal-actions">
              <button className="continue-btn" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
              <button
                className="continue-shopping-btn"
                onClick={() => setShowModal(false)}
              >
                Keep Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemPage;
