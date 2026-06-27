import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:5000'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.message || 'Login failed')
      }

      localStorage.setItem('nestiqueToken', payload.token)
      localStorage.setItem('nestiqueUser', JSON.stringify(payload.user))
      navigate('/')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page auth-page">
      <section className="auth-card">
        <div className="section-heading">
          <p className="eyebrow">Login</p>
          <h1>Welcome back.</h1>
          <p className="hero-text">
            Sign in to manage your orders, wishlist, and saved cart items.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              required
            />
          </label>

          {error && <p className="auth-note">{error}</p>}

          <button type="submit" className="button auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="auth-note">
            New here? <Link to="/shop">Browse the shop first</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
