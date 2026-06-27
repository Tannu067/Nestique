import { Link } from 'react-router-dom'

export default function Cart({ cartCount = 0 }) {
  return (
    <main className="page auth-page">
      <section className="auth-card">
        <div className="section-heading">
          <p className="eyebrow">Cart</p>
          <h1>Your cart</h1>
          <p className="hero-text">
            {cartCount > 0
              ? `You have ${cartCount} item${cartCount === 1 ? '' : 's'} in your cart.`
              : 'Your cart is empty right now.'}
          </p>
        </div>

        <Link to="/shop" className="button auth-submit">
          Continue shopping
        </Link>
      </section>
    </main>
  )
}
