import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Shop from './pages/Shop'
import './App.css'

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([])

  const handleAddToCart = () => {
    setCartCount((count) => count + 1)
  }

  const handleToggleWishlist = (item) => {
    setWishlistItems((current) => {
      const exists = current.some((entry) => entry.title === item.title)
      if (exists) {
        return current.filter((entry) => entry.title !== item.title)
      }

      return [...current, item]
    })
  }

  const wishlistedTitles = new Set(wishlistItems.map((item) => item.title))

  const handleToggleSearch = () => {
    setIsSearchOpen((current) => !current)
    setIsWishlistOpen(false)
  }

  const handleToggleWishlistPanel = () => {
    setIsWishlistOpen((current) => !current)
    setIsSearchOpen(false)
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleSearch={handleToggleSearch}
        onToggleWishlistPanel={handleToggleWishlistPanel}
        wishlistCount={wishlistItems.length}
      />
      {isWishlistOpen && (
        <section className="wishlist-panel" aria-label="Wishlist products">
          <div className="wishlist-panel__header">
            <h2>Your Wishlist</h2>
            <button type="button" className="wishlist-panel__close" onClick={handleToggleWishlistPanel}>
              Close
            </button>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <article key={item.title} className="wishlist-card">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                    <strong>{item.price}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="wishlist-panel__empty">No liked products yet.</p>
          )}
        </section>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              searchTerm={searchTerm}
              wishlistedTitles={wishlistedTitles}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              searchTerm={searchTerm}
              wishlistedTitles={wishlistedTitles}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
