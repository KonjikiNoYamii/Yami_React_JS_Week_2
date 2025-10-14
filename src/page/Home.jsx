import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CartBadge from "../components/CartBadge";
import ProductList from "../components/ProductList";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === "dark" ? "#0d0d0d" : "#ffffff",
    color: theme === "dark" ? "#f5f5f5" : "#111111",
    minHeight: "100vh",
    transition: "all 0.4s ease",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: theme === "dark" 
      ? "0 0 10px rgba(255,0,0,0.3)" 
      : "0 0 6px rgba(255,0,0,0.2)",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={style}>
      
      <ProductList />
      <CartBadge />
    </div>
  );
}
