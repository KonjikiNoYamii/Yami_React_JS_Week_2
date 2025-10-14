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
  const [mounted, setMounted] = useState(false); // ✅ pastikan grid sudah render
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
        setMounted(true); // grid sudah siap
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setFade(true);
    const timer = setTimeout(() => setFade(false), 20); // minimal delay agar render
    return () => clearTimeout(timer);
  }, [category, search, mounted]);

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Sedang memuat produk...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>❌ {error}</p>;

  const filterProduct = product.filter((item) => {
    const matchCategory = category === "all" ? true : item.category === category;
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    justifyItems: "center",
    padding: "30px",
    opacity: fade ? 0.5 : 1, // ✨ jangan sampai 0
    transform: fade ? "translateY(10px)" : "translateY(0)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  return (
    <div style={containerStyle}>
      <CategoryFilter selectCategory={category} onCategoryChange={setCategory} />
      <SearchBar searchTerm={search} onSearchChange={setSearch} />

      {filterProduct.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>😿 Produk tidak ditemukan</p>
      ) : (
        <div style={gridStyle}>
          {filterProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
