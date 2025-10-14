import { useEffect, useState, useContext } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { ThemeContext } from "../context/ThemeContext";

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { theme } = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setFade(true);
    const timer = setTimeout(() => setFade(false), 20);
    return () => clearTimeout(timer);
  }, [category, search, mounted]);

  if (loading)
    return <p style={{ textAlign: "center" }}>⏳ Sedang memuat produk...</p>;
  if (error) return <p>{error}</p>;

  const filterProduct = product.filter((item) => {
    const matchCategory =
      category === "all" ? true : item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#0d0d0d" : "#ffffff",
    color: theme === "dark" ? "#f5f5f5" : "#111111",
    transition: "all 0.5s ease",
    paddingBottom: "50px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    justifyItems: "center",
    padding: "30px",
    opacity: fade ? 0.5 : 1,
    transform: fade ? "translateY(10px)" : "translateY(0)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  return (
    <div style={containerStyle}>
      <CategoryFilter
        selectCategory={category}
        onCategoryChange={setCategory}
      />
      <SearchBar searchTerm={search} onSearchChange={setSearch} />

{filterProduct.length === 0 ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "300px",
      textAlign: "center",
      color: theme === "dark" ? "#f5f5f5" : "#111111",
      transition: "color 0.5s ease",
      gap: "15px",
    }}
  >
    <img
      src="public/empty.gif"
      alt="Tidak ditemukan"
      style={{
        width: "200px",
        height: "250px",
        objectFit: "contain",
        opacity: 0.8,
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    />
    <p
      style={{
        fontSize: "1.2rem",
        fontWeight: "600",
      }}
    >
     Produk tidak ditemukan...
    </p>
  </div>
) : (
  <div style={gridStyle}>
    {filterProduct.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}


      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid"] {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
