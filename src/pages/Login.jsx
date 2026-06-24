import { Link } from 'react-router-dom'

export default function Login() {
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

        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="Your password" />
          </label>

          <button type="submit" className="button auth-submit">
            Login
          </button>

          <p className="auth-note">
            New here? <Link to="/shop">Browse the shop first</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
