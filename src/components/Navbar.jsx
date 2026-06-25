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

export default function Navbar() {
  return (
    <header className="site-header">
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
        <Link to="/shop" className="button button--ghost">
          Shop now
        </Link>
      </div>
      
    </header>
  )
}
