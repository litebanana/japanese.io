import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { CartProvider, useCart } from "./store/cart";
import { CartDrawer } from "./components/CartDrawer";

// Below-fold storefront loads after first paint so the hero gets the main thread.
const Shop = lazy(() =>
  import("./components/Shop").then((m) => ({ default: m.Shop }))
);
const StoreFooter = lazy(() =>
  import("./components/StoreFooter").then((m) => ({ default: m.StoreFooter }))
);

function FloatingCart() {
  const { count, openCart, lastAddedId } = useCart();
  if (count === 0) return null;
  return (
    <button
      key={lastAddedId ?? "cart"}
      className="floating-cart pop"
      onClick={openCart}
    >
      Cart · {count}
    </button>
  );
}

export function Scene() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hibernating, setHibernating] = useState(false);

  // The Kage canvas is position:fixed and repaints every frame even while the
  // user is down in the shop. Hiding the iframe pauses its rAF loop and drops
  // all WebGL/grain/vignette compositing; the document state is preserved so
  // it resumes instantly (240px pre-roll avoids a flash on scroll-back).
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setHibernating(!entry.isIntersecting),
      { rootMargin: "240px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <CartProvider>
      <div
        ref={heroRef}
        className={`shader-frame${hibernating ? " hibernating" : ""}`}
      >
        <KageLandingPage
          headingFont="onest"
          bodyFont="onest"
          headingWeight="400"
          bodyWeight="300"
          primaryColor="#e0231c"
          headingSize={46}
          bodySize={17}
          headingLetterSpacing={-0.012}
        />
      </div>
      <Suspense fallback={null}>
        <Shop />
        <StoreFooter />
      </Suspense>
      <CartDrawer />
      <FloatingCart />
    </CartProvider>
  );
}
