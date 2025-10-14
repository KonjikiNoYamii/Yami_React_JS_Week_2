import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar({ searchTerm, onSearchChange }) {
  const { theme } = useContext(ThemeContext);

  const style = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: theme === "dark" ? "#141414" : "#f5f5f5",
    transition: "all 0.3s ease",
  };

  const inputStyle = {
    width: "60%",
    padding: "10px 15px",
    borderRadius: "10px",
    border: `1px solid ${theme === "dark" ? "#b30000" : "#ff4d4d"}`,
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
    color: theme === "dark" ? "#f5f5f5" : "#111",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  };

  return (
    <div style={style}>
      <input
        type="text"
        style={inputStyle}
        placeholder="Cari produk..."
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}
