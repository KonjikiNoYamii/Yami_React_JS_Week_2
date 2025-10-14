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

  return (
    <div style={style}>
      
      <ProductList />
      <CartBadge />
    </div>
  );
}
