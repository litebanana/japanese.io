import { useCart } from "../store/cart";

export function StoreFooter() {
  const { openCart } = useCart();
  return (
    <footer className="store-foot">
      <div className="store-foot-grid">
        <div>
          <b>KAGE GROOMING</b>
          <p>Temple-made tools. Kyoto, Japan.</p>
        </div>
        <div>
          <span>Shop</span>
          <a href="#shop">All products</a>
          <a href="#shop">Wax & pomade</a>
          <a href="#shop">Blades</a>
        </div>
        <div>
          <span>Help</span>
          <a href="#shop">Shipping</a>
          <a href="#shop">Returns</a>
          <button onClick={openCart}>Open cart</button>
        </div>
      </div>
      <p className="store-base">© 2026 Kage Grooming Supply — mock demo storefront</p>
    </footer>
  );
}
