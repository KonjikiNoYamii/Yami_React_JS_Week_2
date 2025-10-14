import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CategoryFilter({ selectCategory, onCategoryChange }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
    borderBottom: theme === "dark" ? "1px solid #b30000" : "1px solid #ff4d4d",
    color: theme === "dark" ? "#f5f5f5" : "#111111",
    transition: "background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease",
  };

  const categoryListStyle = {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#b30000" : "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.4s ease, transform 0.3s ease",
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
          fontWeight: "700",
          letterSpacing: "1px",
          transition: "color 0.6s ease",
        }}
      >
        Yami Store
      </h3>

      <ul style={categoryListStyle}>
        {categories.map((c) => {
          const isActive = selectCategory === c.value;
          return (
            <li
              key={c.value}
              onClick={() => onCategoryChange(c.value)}
              style={{
                cursor: "pointer",
                borderBottom: `2px solid ${
                  isActive
                    ? theme === "dark"
                      ? "#b30000"
                      : "#ff4d4d"
                    : "transparent"
                }`,
                color: isActive
                  ? theme === "dark"
                    ? "#b30000"
                    : "#ff4d4d"
                  : theme === "dark"
                  ? "#f5f5f5"
                  : "#111111",
                fontWeight: isActive ? "700" : "500",
                paddingBottom: "4px",
                transition:
                  "color 0.5s ease, border-bottom-color 0.5s ease, transform 0.3s ease, text-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.textShadow =
                  "0 0 8px rgba(255, 77, 77, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1.0)";
                e.target.style.textShadow = "none";
              }}
            >
              {c.label}
            </li>
          );
        })}
      </ul>

      <button
        style={buttonStyle}
        onClick={toggleTheme}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
      >
        {theme === "dark" ? "🌞 Terang" : "🌙 Gelap"}
      </button>
    </nav>
  );
}
