import { useState } from "react";
import { FREE_SHIPPING_THRESHOLD, formatJPY } from "../data/products";
import { useCart } from "../store/cart";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart, setQty, remove, clear } =
    useCart();
  const [placed, setPlaced] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const checkout = () => {
    setPlaced(true);
    window.setTimeout(() => {
      clear();
      setPlaced(false);
      closeCart();
    }, 1800);
  };

  return (
    <>
      <div
        className={`cart-scrim${isOpen ? " show" : ""}`}
        onClick={closeCart}
      />
      <aside className={`cart${isOpen ? " open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3>
            Your cart <span>({count})</span>
          </h3>
          <button className="cart-x" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="ship">
          <p>
            {remaining > 0 ? (
              <>
                <b>{formatJPY(remaining)}</b> away from free shipping
              </>
            ) : (
              <>Free shipping unlocked ✓</>
            )}
          </p>
          <div className="ship-bar">
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="cart-lines">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-jp">空</p>
              <p>Your cart is empty.</p>
              <button className="btn-add" onClick={closeCart}>
                Browse the shelf
              </button>
            </div>
          ) : (
            lines.map(({ product, qty }) => (
              <div className="cart-line" key={product.id}>
                <span
                  className="cart-thumb"
                  style={{ ["--accent" as string]: product.accent }}
                >
                  {product.jp.slice(0, 1)}
                </span>
                <div className="cart-info">
                  <b>{product.name}</b>
                  <span>{formatJPY(product.price)}</span>
                  <div className="qty">
                    <button onClick={() => setQty(product.id, qty - 1)}>
                      −
                    </button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-right">
                  <b>{formatJPY(product.price * qty)}</b>
                  <button
                    className="cart-rm"
                    onClick={() => remove(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span>Subtotal</span>
              <b>{formatJPY(subtotal)}</b>
            </div>
            <p className="cart-note">Tax included. Shipping at checkout.</p>
            <button
              className="btn-checkout"
              onClick={checkout}
              disabled={placed}
            >
              {placed ? "Order placed — thank you ✓" : "Checkout (mock)"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
