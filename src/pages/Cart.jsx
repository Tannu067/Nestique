import { Link } from "react-router-dom"

const T = {
  linen: "#F5F0E8",
  linenDark: "#EDE7D9",
  charcoal: "#2C2C2C",
  sage: "#7D9B76",
  muted: "#7A7A7A",
  white: "#FFFFFF",
}

// TEMP IMAGES (abhi test ke liye safe way)
const CART_ITEMS = [
  {
    id: 1,
    img: "/src/assets/images/cat-cushion.jpg",
    name: "Boho Weave — Rust",
    cat: "Cushion Cover",
    price: 649,
    qty: 2,
  },
  {
    id: 2,
    img: "/src/assets/images/cat-table.jpg",
    name: "Floral Embroidery — Cream",
    cat: "Table Cover",
    price: 1349,
    qty: 1,
  },
]

function CartItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1.5rem 0",
        borderBottom: `1px solid ${T.linenDark}`,
      }}
    >
      {/* IMAGE */}
      <img
        src={item.img}
        alt={item.name}
        style={{
          width: 100,
          height: 120,
          objectFit: "cover",
          background: T.linenDark,
          flexShrink: 0,
        }}
      />

      {/* DETAILS */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "0.7rem",
            color: T.sage,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {item.cat}
        </p>

        <h3
          style={{
            fontFamily: "serif",
            fontSize: "1.1rem",
            color: T.charcoal,
          }}
        >
          {item.name}
        </h3>

        <p style={{ color: T.muted }}>Qty: {item.qty}</p>

        <button
          style={{
            background: "none",
            border: "none",
            color: T.muted,
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>

      {/* PRICE */}
      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: 600 }}>
          ₹{item.price * item.qty}
        </p>
      </div>
    </div>
  )
}

export default function Cart() {
  const subtotal = CART_ITEMS.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  )

  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div
      style={{
        background: T.linen,
        minHeight: "100vh",
        padding: "4rem 5vw",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: "2.5rem",
          color: T.charcoal,
          marginBottom: "2rem",
        }}
      >
        Cart
      </h1>

      {/* EMPTY CHECK */}
      {CART_ITEMS.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Link to="/shop">Go to Shop</Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "3rem",
          }}
        >
          {/* LEFT */}
          <div>
            {CART_ITEMS.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* RIGHT */}
          <div
            style={{
              background: T.white,
              padding: "2rem",
              height: "fit-content",
            }}
          >
            <h2>Summary</h2>

            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping: {shipping === 0 ? "FREE" : "₹99"}</p>

            <hr />

            <h3>Total: ₹{total}</h3>

            <button
              style={{
                width: "100%",
                padding: "12px",
                background: T.charcoal,
                color: "#fff",
                border: "none",
                marginTop: "1rem",
              }}
            >
              Checkout
            </button>

            <Link to="/shop">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  )
}