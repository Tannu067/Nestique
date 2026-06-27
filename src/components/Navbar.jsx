import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Story', to: { pathname: '/', hash: '#story' } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
]

function NavLinkItem({ label, to }) {
  return (
    <Link className="nav-link" to={to}>
      {label}
    </Link>
  )
}

export default function Navbar({
  cartCount = 0,
  isSearchOpen = false,
  onSearchChange,
  onToggleSearch,
  onToggleWishlistPanel,
  searchTerm = '',
  wishlistCount = 0,
}) {
  return (
    <header className="site-header">
      <div className="site-header__row">
        <div className="brand-wrap">
          <Link to="/" className="brand">
            Nest<span>ique</span>
          </Link>
          <p className="brand-tag">Cushions, tables, and tactile home accents</p>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLinkItem key={item.label} {...item} />
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="button button--ghost nav-icon-button"
            aria-label="Search products"
            onClick={onToggleSearch}
          >
            ⌕
          </button>
          <button
            type="button"
            className="button button--ghost nav-icon-button"
            aria-label={`Wishlist ${wishlistCount} items`}
            onClick={onToggleWishlistPanel}
          >
            ♥
          </button>
          <Link to="/login" className="button button--ghost">
            Login
          </Link>
          <Link to="/cart" className="cart-pill" aria-label={`Cart count ${cartCount}`}>
            Cart
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="nav-search-panel">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products or categories"
            aria-label="Search products or categories"
          />
        </div>
      )}
    </header>
  )
}
