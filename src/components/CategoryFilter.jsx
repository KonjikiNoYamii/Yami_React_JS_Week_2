import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CategoryFilter({ selectCategory, onCategoryChange }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeOutline, setActiveOutline] = useState(false); // untuk tombol tema

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
    borderBottom: theme === "dark" ? "2px solid #b30000" : "2px solid #ff4d4d",
    color: theme === "dark" ? "#f5f5f5" : "#111111",
    transition: "background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease",
  };

  const categoryListStyle = {
    display: "flex",
    gap: "25px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const buttonStyle = {
    position: "relative",
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    overflow: "hidden",
  };

  const outlineStyle = {
    position: "absolute",
    bottom: "0px",
    left: "0",
    width: activeOutline ? "100%" : "0%",
    height: "3px",
    backgroundColor: "#fff",
    borderRadius: "2px",
    transition: "width 0.35s ease",
  };

  const categories = [
    { label: "Semua", value: "all" },
    { label: "Pakaian Pria", value: "men's clothing" },
    { label: "Pakaian Wanita", value: "women's clothing" },
    { label: "Elektronik", value: "electronics" },
    { label: "Perhiasan", value: "jewelery" },
  ];

  return (
    <nav style={navbarStyle}>
      <h3
        style={{
          fontWeight: "800",
          letterSpacing: "1.2px",
          fontSize: "1.3rem",
          color: "red",
          transition: "color 0.6s ease",
        }}
      >
        Yami Store
      </h3>

      <ul style={categoryListStyle}>
        {categories.map((c) => {
          const isActive = selectCategory === c.value;
          const activeColor = theme === "dark" ? "#b30000" : "#ff4d4d";

          return (
            <li
              key={c.value}
              onClick={() => onCategoryChange(c.value)}
              style={{
                cursor: "pointer",
                borderBottom: `3px solid ${isActive ? activeColor : "transparent"}`,
                color: isActive ? activeColor : theme === "dark" ? "#f5f5f5" : "#111111",
                fontWeight: isActive ? "700" : "600",
                paddingBottom: "6px",
                fontSize: "1.05rem",
                transition: "color 0.3s ease, border-bottom-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.08)";
                if (!isActive) e.target.style.color = activeColor; 
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                if (!isActive) e.target.style.color = theme === "dark" ? "#f5f5f5" : "#111111";
              }}
            >
              {c.label}
            </li>
          );
        })}
      </ul>

      <button
        style={buttonStyle}
        onClick={() => {
          setActiveOutline(true);
          requestAnimationFrame(() => setActiveOutline("expand"));
          toggleTheme();
          setTimeout(() => setActiveOutline(false), 400); 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {theme === "dark" ? "🌞" : "🌙"}
        <span style={outlineStyle}></span>
      </button>
    </nav>
  );
}
