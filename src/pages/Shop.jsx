import cushion1 from '../assets/images/cushion-1.jpg'
import cushion2 from '../assets/images/cushion-2.jpg'
import cushion3 from '../assets/images/cushion-3.jpg'
import table1 from '../assets/images/table-1.jpg'
import table2 from '../assets/images/table-2.jpg'
import table3 from '../assets/images/table-3.jpg'
import apron1 from '../assets/images/apron-1.jpg'
import apron2 from '../assets/images/apron-2.jpg'

const products = [
  {
    category: 'Cushion',
    title: 'Moss Linen Cushion',
    price: '₹1,240',
    image: cushion1,
  },
  {
    category: 'Table',
    title: 'Sable Dining Table',
    price: '₹18,900',
    image: table1,
  },
  {
    category: 'Cushion',
    title: 'Ivory Stitch Cushion',
    price: '₹1,490',
    image: cushion2,
  },
  {
    category: 'Table',
    title: 'Oak Edge Table',
    price: '₹21,500',
    image: table2,
  },
  {
    category: 'Cushion',
    title: 'Clay Woven Cushion',
    price: '₹1,650',
    image: cushion3,
  },
  {
    category: 'Table',
    title: 'Pebble Side Table',
    price: '₹9,800',
    image: table3,
  },
  {
    category: 'Apron',
    title: 'Field Apron',
    price: '₹890',
    image: apron1,
  },
  {
    category: 'Apron',
    title: 'Studio Apron',
    price: '₹920',
    image: apron2,
  },
]

export default function Shop({
  onAddToCart,
  onToggleWishlist,
  searchTerm = '',
  wishlistedTitles = new Set(),
}) {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredProducts = products.filter((item) => {
    if (!normalizedSearch) return true
    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch)
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
        <div className="product-grid product-grid--shop">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <article key={item.title} className="product-card">
                <div className="product-image-wrap">
                  <img src={item.image} alt={item.title} />
                  <span>{item.category}</span>
                </div>
                <div className="product-copy">
                  <div>
                    <h3>{item.title}</h3>
                    <p>Designed for everyday spaces and easy layering.</p>
                  </div>
                  <div className="product-meta">
                    <strong>{item.price}</strong>
                    <div className="product-actions">
                      <button type="button" className="product-action" onClick={onAddToCart}>
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        className={`product-action product-action--heart ${
                          wishlistedTitles.has(item.title) ? 'is-liked' : ''
                        }`}
                        aria-pressed={wishlistedTitles.has(item.title)}
                        onClick={() => onToggleWishlist(item)}
                      >
                        {wishlistedTitles.has(item.title) ? '♥' : '♡'}
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
