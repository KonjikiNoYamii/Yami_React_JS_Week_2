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
    padding: "25px",
    margin: "15px",
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
    width: "150px",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto", 
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s, transform 0.2s",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img src={product.image} alt={product.title} style={imgStyle} />
      <h3 style={{ fontSize: "16px", height: "60px" }}>{product.title}</h3>
      <p style={{ fontWeight: "700", margin: "10px 0", fontSize: "16px" }}>
        ${product.price}
      </p>
      <button style={buttonStyle} onClick={() => addCart(product)}>
        Add to Cart 
      </button>
    </div>
  );
}
