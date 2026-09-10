import { useState } from "react";
import { PRODUCTS, formatJPY, type Product } from "../data/products";
import { useCart } from "../store/cart";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      <span className="stars-dim">{"★".repeat(5 - full)}</span>
    </span>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}
    >
      <div className="product-media" onClick={() => setOpen((v) => !v)}>
        <span className="product-mono">{String(index + 1).padStart(2, "0")}</span>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {discount > 0 && <span className="product-off">-{discount}%</span>}
        <span
          className="product-orb"
          style={{ ["--accent" as string]: product.accent }}
        />
        <span className="product-kanji" aria-hidden="true">
          {product.jp.slice(0, 1)}
        </span>
        <span className="product-expand">{open ? "Hide detail" : "Quick view"}</span>
      </div>

      <div className="product-body">
        <p className="product-jp">{product.jp}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span>
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        {open && <p className="product-desc">{product.description}</p>}

        <div className="product-foot">
          <div className="product-price">
            <strong>{formatJPY(product.price)}</strong>
            {product.compareAt && <s>{formatJPY(product.compareAt)}</s>}
          </div>
          <div className="product-actions">
            <button className="btn-ghost" onClick={() => setOpen((v) => !v)}>
              {open ? "Less" : "Detail"}
            </button>
            <button
              className={`btn-add${added ? " added" : ""}`}
              onClick={handleAdd}
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        </div>
        <button
          className="btn-buy"
          onClick={() => {
            handleAdd();
            openCart();
          }}
        >
          Buy now
        </button>
      </div>
    </article>
  );
}

export function Shop() {
  const { count, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">(
    "featured"
  );

  const list = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="shop" id="shop">
      <div className="shop-head">
        <p className="eyebrow shop-eyebrow">
          <span className="dot" /> Kage Grooming Supply — Est. Kyoto
        </p>
        <div className="shop-title-row">
          <h2 className="shop-title">
            The shelf.
            <span> Six tools for the ritual.</span>
          </h2>
          <button className="btn-cart-top" onClick={openCart}>
            Cart ({count})
          </button>
        </div>
        <p className="shop-sub">
          Small-batch grooming goods from the temple workshop — wax, blades and
          oils, shipped from Kyoto in plastic-free packaging.
        </p>
        <div className="shop-toolbar">
          <input
            className="shop-search"
            placeholder="Search wax, clipper, oil…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="shop-empty">
          Nothing matches “{query}”. Try “wax” or “clipper”.
        </p>
      ) : (
        <div className="product-grid">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      <div className="shop-perks">
        <div>
          <b>Free shipping</b>
          <span>Orders over ¥10,000 · tracked worldwide</span>
        </div>
        <div>
          <b>30-day returns</b>
          <span>Opened wax? Still returnable.</span>
        </div>
        <div>
          <b>Sharpen for life</b>
          <span>Clippers + razors serviced free.</span>
        </div>
      </div>
    </section>
  );
}
