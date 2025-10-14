import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./page/Home";

export default function App() {
  return (
    <div>
      <ThemeProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}
