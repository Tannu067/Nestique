import { Link } from 'react-router-dom'
import hero from '../assets/images/hero.jpg'
import cushion1 from '../assets/images/cushion-1.jpg'
import cushion2 from '../assets/images/cushion-2.jpg'
import table1 from '../assets/images/table-1.jpg'
import table2 from '../assets/images/table-2.jpg'
import story from '../assets/images/story.jpg'
import catCushion from '../assets/images/cat-cushion.jpg'
import catTable from '../assets/images/cat-table.jpg'
import catApron from '../assets/images/cat-apron.jpg'

const featured = [
  { title: 'Moss Linen Cushion', price: '₹1,240', image: cushion1, tag: 'Best seller' },
  { title: 'Sable Dining Table', price: '₹18,900', image: table1, tag: 'New arrival' },
  { title: 'Ivory Stitch Cushion', price: '₹1,490', image: cushion2, tag: 'Hand finished' },
  { title: 'Oak Edge Table', price: '₹21,500', image: table2, tag: 'Studio pick' },
]

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

export default function Home({
  onAddToCart,
  onToggleWishlist,
  searchTerm = '',
  wishlistedTitles = new Set(),
}) {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredFeatured = featured.filter((item) => {
    if (!normalizedSearch) return true
    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.tag.toLowerCase().includes(normalizedSearch)
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

        <div className="product-grid">
          {filteredFeatured.length > 0 ? (
            filteredFeatured.map((item) => (
              <article key={item.title} className="product-card">
                <div className="product-image-wrap">
                  <img src={item.image} alt={item.title} />
                  <span>{item.tag}</span>
                </div>
                <div className="product-copy">
                  <div>
                    <h3>{item.title}</h3>
                    <p>Natural textures and thoughtful finishing for everyday use.</p>
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
