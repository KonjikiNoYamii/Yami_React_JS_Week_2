import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function CartBadge() {
  const { item } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const badgeStyle = {
    position: "fixed",
    bottom: "25px", // 👈 Sekarang di bawah
    right: "25px", // tetap kanan
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    borderRadius: "50%",
    width: "55px",
    height: "55px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "18px",
    boxShadow:
      theme === "dark"
        ? "0 0 15px rgba(255, 0, 0, 0.5)"
        : "0 0 10px rgba(255, 0, 0, 0.3)",
    zIndex: 100,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const textStyle = {
    marginLeft: "5px",
    fontSize: "15px",
    fontWeight: "600",
  };

  return (
    <div style={badgeStyle} title="Keranjang Belanja">
      🛒 <span style={textStyle}>{item.length}</span>
    </div>
  );
}
