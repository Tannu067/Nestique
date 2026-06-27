import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Shop from './pages/Shop'
import './App.css'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([])

  const handleAddToCart = (item) => {
    setCartItems((current) => [...current, item])
  }

  const handleToggleWishlist = (item) => {
    setWishlistItems((current) => {
      const exists = current.some((entry) => entry._id === item._id)
      return exists
        ? current.filter((entry) => entry._id !== item._id)
        : [...current, item]
    })
  }

  const wishlistedIds = new Set(wishlistItems.map((item) => item._id))

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
        cartCount={cartItems.length}
        isSearchOpen={isSearchOpen}
        onSearchChange={setSearchTerm}
        onToggleSearch={handleToggleSearch}
        onToggleWishlistPanel={handleToggleWishlistPanel}
        searchTerm={searchTerm}
        wishlistCount={wishlistItems.length}
      />

      {isWishlistOpen && (
        <section className="wishlist-panel" aria-label="Wishlist products">
          <div className="wishlist-panel__header">
            <h2>Your Wishlist</h2>
            <button
              type="button"
              className="wishlist-panel__close"
              onClick={handleToggleWishlistPanel}
            >
              Close
            </button>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <article key={item._id} className="wishlist-card">
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <strong>₹{item.price}</strong>
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
              wishlistedIds={wishlistedIds}
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
              wishlistedIds={wishlistedIds}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onClearCart={() => setCartItems([])}
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
