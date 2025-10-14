// ProductList.js
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

  const [displayProducts, setDisplayProducts] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setProduct(data);
        setDisplayProducts(data); // tampilkan awal
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = product.filter((item) => {
    const matchCategory =
      category === "all" ? true : item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Saat category/search berubah → fade-out dulu
  useEffect(() => {
    if (loading) return;
    setFadeOut(true);
    const timer = setTimeout(() => {
      setDisplayProducts(filteredProducts); // update produk setelah fade-out
      setFadeOut(false); // fade-in otomatis
    }, 200); // durasi fade
    return () => clearTimeout(timer);
  }, [category, search]);

  if (loading)
    return <p style={{ textAlign: "center" }}>⏳ Sedang memuat produk...</p>;
  if (error) return <p>{error}</p>;

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
  };

  return (
    <div style={containerStyle}>
      <CategoryFilter
        selectCategory={category}
        onCategoryChange={setCategory}
      />
      <SearchBar searchTerm={search} onSearchChange={setSearch} />

      {displayProducts.length === 0 ? (
        <p>Produk tidak ditemukan...</p>
      ) : (
        <div style={gridStyle} className="product-grid">
          {displayProducts.map((product, idx) => (
            <div
              key={product.id}
              style={{
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? "translateY(20px)" : "translateY(0)",
                transition: `opacity 0.4s ease ${
                  idx * 50
                }ms, transform 0.4s ease ${idx * 50}ms`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Media Query responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
