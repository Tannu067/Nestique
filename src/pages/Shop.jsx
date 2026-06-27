import { useEffect, useState } from 'react'
import cushion1 from '../assets/images/cushion-1.jpg'
import cushion2 from '../assets/images/cushion-2.jpg'
import cushion3 from '../assets/images/cushion-3.jpg'
import table1 from '../assets/images/table-1.jpg'
import table2 from '../assets/images/table-2.jpg'
import table3 from '../assets/images/table-3.jpg'
import apron1 from '../assets/images/apron-1.jpg'
import apron2 from '../assets/images/apron-2.jpg'

const API_BASE = 'http://localhost:5000'

const categoryImages = {
  'cushion-cover': cushion1,
  'table-cover': table1,
  apron: apron1,
}

function formatPrice(price) {
  return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

function formatCategory(category) {
  return String(category || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getProductImage(product) {
  return product.imageUrl || categoryImages[product.category] || cushion2
}

export default function Shop({
  onAddToCart,
  onToggleWishlist,
  searchTerm = '',
  wishlistedIds = new Set(),
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE}/api/products`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load products (${response.status})`)
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredProducts = products.filter((item) => {
    if (!normalizedSearch) return true
    return (
      item.name?.toLowerCase().includes(normalizedSearch) ||
      item.category?.toLowerCase().includes(normalizedSearch) ||
      item.description?.toLowerCase().includes(normalizedSearch)
    )
  })

  return (
    <main className="page">
      <section className="shop-hero">
        <div className="section-heading">
          <p className="eyebrow">The shop</p>
          <h1>Find cushions, tables, and everyday pieces with a softer feel.</h1>
          <p className="hero-text">
            Curated for cozy living rooms, calm dining corners, and homes that
            lean into texture.
          </p>
        </div>
      </section>

      <section className="section">
        {loading ? (
          <p className="empty-state">Loading products...</p>
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : (
          <div className="product-grid product-grid--shop">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <article key={item._id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={getProductImage(item)} alt={item.name} />
                    <span>{formatCategory(item.category)}</span>
                  </div>
                  <div className="product-copy">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description || 'Designed for everyday spaces and easy layering.'}</p>
                    </div>
                    <div className="product-meta">
                      <strong>{formatPrice(item.price)}</strong>
                      <div className="product-actions">
                        <button type="button" className="product-action" onClick={() => onAddToCart(item)}>
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          className={`product-action product-action--heart ${
                            wishlistedIds.has(item._id) ? 'is-liked' : ''
                          }`}
                          aria-pressed={wishlistedIds.has(item._id)}
                          onClick={() => onToggleWishlist(item)}
                        >
                          {wishlistedIds.has(item._id) ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="empty-state">No products found.</p>
            )}
          </div>
        )}
      </section>

      <section className="section section--soft">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Simple ordering, custom touches, and quick support.</h2>
        </div>

        <div className="info-grid">
          <article className="info-card">
            <h3>Choose your texture</h3>
            <p>Pick a cushion fabric or table finish that fits your room.</p>
          </article>
          <article className="info-card">
            <h3>Request a variation</h3>
            <p>We can adjust color, size, or styling details on many items.</p>
          </article>
          <article className="info-card">
            <h3>Style with confidence</h3>
            <p>We’ll help you mix pieces so the space feels balanced and warm.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
