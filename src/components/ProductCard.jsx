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
    margin: "15px",
    width: "200px",
    textAlign: "center",
    boxShadow:
      theme === "dark"
        ? "0 4px 10px rgba(255,0,0,0.2)"
        : "0 4px 10px rgba(255,0,0,0.1)",
    transition: "all 0.3s",
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  };

  return (
    <div style={cardStyle}>
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      <h3 style={{ fontSize: "14px", height: "40px" }}>{product.title}</h3>
      <p style={{ fontWeight: "700", margin: "8px 0" }}>${product.price}</p>
      <button style={buttonStyle} onClick={() => addCart(product)}>
        Add to Cart 🛒
      </button>
    </div>
  );
}
