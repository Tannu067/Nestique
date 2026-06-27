import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import hero from '../assets/images/hero.jpg'
import story from '../assets/images/story.jpg'
import catCushion from '../assets/images/cat-cushion.jpg'
import catTable from '../assets/images/cat-table.jpg'
import catApron from '../assets/images/cat-apron.jpg'

const API_BASE = 'http://localhost:5000'

const highlights = [
  { value: '48 hrs', label: 'Made to order' },
  { value: '12+', label: 'Texture options' },
  { value: 'Free', label: 'Styling support' },
]

const categories = [
  {
    title: 'Cushions',
    copy: 'Soft silhouettes, rich weave, and layered color stories for sofas and beds.',
    image: catCushion,
  },
  {
    title: 'Tables',
    copy: 'Compact and crafted pieces that feel warm, grounded, and easy to live with.',
    image: catTable,
  },
  {
    title: 'Aprons',
    copy: 'Everyday essentials with a calm palette and durable finishing.',
    image: catApron,
  },
]

function formatPrice(price) {
  return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

function formatCategory(category) {
  return String(category || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function Home({
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
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Nestique home studio</p>
          <h1>Warm spaces built from cushions, tables, and calm detail.</h1>
          <p className="hero-text">
            Discover handcrafted home pieces designed to make rooms feel softer,
            more lived in, and more personal.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="button">
              Browse collection
            </Link>
            <a href="#story" className="button button--ghost">
              Read our story
            </a>
          </div>

          <div className="highlights" aria-label="Studio highlights">
            {highlights.map((item) => (
              <article key={item.label} className="highlight-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-media">
          <img src={hero} alt="Styled home interior with fabric and wood accents" />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Shop by category</p>
          <h2>Pieces that layer together naturally.</h2>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <article key={item.title} className="category-card">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="section-heading">
          <p className="eyebrow">Featured picks</p>
          <h2>Signature items for your next room refresh.</h2>
        </div>

        {loading ? (
          <p className="empty-state">Loading products...</p>
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <article key={item._id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{formatCategory(item.category)}</span>
                  </div>
                  <div className="product-copy">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description || 'Natural textures and thoughtful finishing for everyday use.'}</p>
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

      <section className="story-section" id="story">
        <div className="story-media">
          <img src={story} alt="Workshop tools and textile materials" />
        </div>

        <div className="story-copy">
          <p className="eyebrow">Our story</p>
          <h2>Made slowly, styled easily.</h2>
          <p>
            Nestique was shaped for people who want a home that feels relaxed,
            thoughtful, and visually grounded. We focus on small-batch pieces
            with materials that wear beautifully over time.
          </p>
          <p>
            From cushions that soften a reading nook to tables that anchor a
            dining corner, every piece is selected to work quietly and look
            lasting.
          </p>
        </div>
      </section>

      <section className="section contact-band" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Need help styling a room?</h2>
        </div>

        <div className="contact-actions">
          <a className="button" href="mailto:hello@nestique.studio">
            hello@nestique.studio
          </a>
          <Link className="button button--ghost" to="/shop">
            See the shop
          </Link>
        </div>
      </section>
    </main>
  )
}
