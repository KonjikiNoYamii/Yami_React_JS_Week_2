import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CategoryFilter({ selectCategory, onCategoryChange }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeOutline, setActiveOutline] = useState(false);

  const navbarStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
    borderBottom: `2px solid ${theme === "dark" ? "#b30000" : "#ff4d4d"}`,
    color: theme === "dark" ? "#f5f5f5" : "#111111",
    transition: "all 0.5s ease",
    boxSizing: "border-box",
    fontSize: "1rem",
  };

  const categoryListStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const buttonStyle = {
    position: "relative",
    width: "50px",
    height: "50px",
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
    color: theme === "dark" ? "white" : "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  const outlineStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "3px",
    backgroundColor: "#fff",
    borderRadius: "2px",
    transition: "opacity 0.35s ease",
    opacity: activeOutline ? 1 : 0,
  };

  const categories = [
    { label: "Semua", value: "all" },
    { label: "Pakaian Pria", value: "men's clothing" },
    { label: "Pakaian Wanita", value: "women's clothing" },
    { label: "Elektronik", value: "electronics" },
    { label: "Perhiasan", value: "jewelery" },
  ];

  return (
    <>
      <nav style={navbarStyle}>
        <h3
          style={{
            fontWeight: "800",
            letterSpacing: "1px",
            fontSize: "1.1rem",
            color: "red",
            transition: "color 0.6s ease",
          }}
        >
          YAMI STORE
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
                  position: "relative",
                  color: isActive
                    ? activeColor
                    : theme === "dark"
                    ? "#f5f5f5"
                    : "#111111",
                  fontWeight: isActive ? "700" : "500",
                  paddingBottom: "4px",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
              >
                {c.label}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: isActive ? "100%" : "0%",
                    backgroundColor: activeColor,
                    borderRadius: "2px",
                    transition: "width 0.3s ease",
                  }}
                ></span>
              </li>
            );
          })}
        </ul>

        <button
          style={buttonStyle}
          onClick={() => {
            setActiveOutline(true);
            toggleTheme();
            setTimeout(() => setActiveOutline(false), 400);
          }}
        >
          {theme === "dark" ? "𖤓" : "☪"}
          <span style={outlineStyle}></span>
        </button>
      </nav>

      <style>{`
    @media (max-width: 480px) {
      nav {
        padding: 4px 6px !important;
        font-size: 0.75rem !important;
      }
      nav h3 {
        font-size: 0.85rem !important;
      }
      nav ul li {
        font-size: 0.65rem !important;
        padding-bottom: 1px !important;
      }
      nav button {
        width: 30px !important;
        height: 30px !important;
        font-size: 16px !important;
      }
      nav ul {
        gap: 4px !important;
        justify-content: center;
      }
    }
  `}</style>
    </>
  );
}
