import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function CartBadge() {
  const { item } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const [animate, setAnimate] = useState(false);

  // Trigger animasi saat jumlah item berubah
  useEffect(() => {
    if (item.length === 0) return;
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300); // durasi animasi
    return () => clearTimeout(timer);
  }, [item.length]);

  const badgeStyle = {
    position: "fixed",
    bottom: "25px",
    right: "25px",
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
    zIndex: 100,
    cursor: "pointer",
    transition: "transform 0.3s ease",
    transform: animate ? "scale(1.3)" : "scale(1)", // ✨ efek pop
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
