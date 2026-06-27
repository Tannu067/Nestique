import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = 'http://localhost:5000'

function formatPrice(price) {
  return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

export default function Cart({ cartItems = [], onClearCart }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0)

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setMessage('')

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          customerName: 'Guest Customer',
          address: 'Not provided',
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.message || `Checkout failed (${response.status})`)
      }

      setMessage('Order placed successfully.')
      onClearCart?.()
    } catch (checkoutError) {
      setError(checkoutError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page auth-page">
      <section className="auth-card">
        <div className="section-heading">
          <p className="eyebrow">Cart</p>
          <h1>Your cart</h1>
          <p className="hero-text">
            {cartItems.length > 0
              ? `You have ${cartItems.length} item${cartItems.length === 1 ? '' : 's'} in your cart.`
              : 'Your cart is empty right now.'}
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="wishlist-grid">
            {cartItems.map((item, index) => (
              <article key={`${item._id}-${index}`} className="wishlist-card">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="section-heading">
          <h2>Total: {formatPrice(totalAmount)}</h2>
        </div>

        {message && <p className="auth-note">{message}</p>}
        {error && <p className="auth-note">{error}</p>}

        <button type="button" className="button auth-submit" onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>

        <Link to="/shop" className="button button--ghost auth-submit">
          Continue shopping
        </Link>
      </section>
    </main>
  )
}
