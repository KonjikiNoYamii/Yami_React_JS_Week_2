// ProductCard.js
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProductCard({ product }) {
  const { addCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const cardStyle = {
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
    color: theme === "dark" ? "#f5f5f5" : "#111",
    border: `1px solid ${theme === "dark" ? "#b30000" : "#ff4d4d"}`,
    borderRadius: "12px",
    padding: "20px",
    margin: "10px",
    width: "250px",
    height: "400px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.2s, background-color 0.3s",
  };

  const imgStyle = {
    width: "140px",
    height: "140px",
    objectFit: "contain",
    marginBottom: "8px",
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img src={product.image} alt={product.title} style={imgStyle} />
      <h3 style={{ fontSize: "14px", height: "55px" }}>{product.title}</h3>
      <p style={{ fontWeight: "700", margin: "8px 0", fontSize: "14px" }}>
        ${product.price}
      </p>
      <button style={buttonStyle} onClick={() => addCart(product)}>
        Add to Cart
      </button>

      <style>{`
      @media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 6px !important;
    padding: 6px !important;
  }

  .product-grid > div {
    width: 100% !important;       
    height: 200px !important;      
    padding: 4px !important;
  }

  .product-grid > div img {
    width: 60px !important;
    height: 60px !important;
  }

  .product-grid > div h3 {
    font-size: 10px !important;
    height: 36px !important;
    overflow: hidden;
  }

  .product-grid > div p {
    font-size: 10px !important;
    margin: 2px 0;
  }

  .product-grid > div button {
    padding: 2px 6px !important;
    font-size: 10px !important;
  }
}
`}</style>
    </div>
  );
}
