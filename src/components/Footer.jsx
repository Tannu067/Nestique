import { Link } from "react-router-dom";

const T = {
  linen: "#F5F0E8",
  clay: "#A0624A",
};

const css = `
  .fg{
    display:grid;
    grid-template-columns:2fr 1fr 1fr 1fr;
    gap:3rem;
    margin-bottom:3rem;
  }

  .footer-link{
    text-decoration:none;
    color:rgba(245,240,232,0.65);
    font-size:0.88rem;
    transition:0.3s ease;
  }

  .footer-link:hover{
    color:#A0624A;
  }

  .footer-social{
    width:36px;
    height:36px;
    border:1px solid rgba(255,255,255,0.15);
    display:flex;
    align-items:center;
    justify-content:center;
    color:rgba(255,255,255,0.6);
    cursor:pointer;
    font-size:0.9rem;
    background:none;
    border-radius:50%;
    transition:0.3s ease;
  }

  .footer-social:hover{
    border-color:#A0624A;
    color:#A0624A;
  }

  @media(max-width:900px){
    .fg{
      grid-template-columns:1fr 1fr;
    }
  }

  @media(max-width:600px){
    .fg{
      grid-template-columns:1fr;
    }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{css}</style>

      <footer
        style={{
          background: "#1E1E1E",
          color: T.linen,
          padding: "4rem 5vw 2rem",
        }}
      >
        <div className="fg">
          {/* Brand */}
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Nest<span style={{ color: T.clay }}>ique</span>
            </h2>

            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(245,240,232,0.55)",
                lineHeight: 1.8,
                maxWidth: "28ch",
                marginBottom: "1.5rem",
              }}
            >
              Handcrafted home textiles that bring warmth and elegance to every
              corner of your home.
            </p>

            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button className="footer-social">📷</button>
              <button className="footer-social">📌</button>
              <button className="footer-social">f</button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.2rem",
              }}
            >
              Shop
            </h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.7rem" }}>
                <Link to="/shop" className="footer-link">
                  Cushion Covers
                </Link>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <Link to="/shop" className="footer-link">
                  Table Covers
                </Link>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <Link to="/shop" className="footer-link">
                  Aprons
                </Link>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <Link to="/shop" className="footer-link">
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/shop" className="footer-link">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.2rem",
              }}
            >
              Help
            </h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.7rem" }}>
                <a href="#" className="footer-link">
                  Track Order
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <a href="#" className="footer-link">
                  Returns & Exchanges
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <a href="#" className="footer-link">
                  Shipping Policy
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <a href="#" className="footer-link">
                  Size Guide
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.2rem",
              }}
            >
              Contact
            </h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.7rem" }}>
                <a
                  href="mailto:hello@nestique.in"
                  className="footer-link"
                >
                  hello@nestique.in
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <a
                  href="tel:+919876543210"
                  className="footer-link"
                >
                  +91 98765 43210
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <a href="#" className="footer-link">
                  WhatsApp Us
                </a>
              </li>

              <li style={{ marginBottom: "0.7rem" }}>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © 2025 Nestique. All rights reserved.
          </p>

          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Privacy Policy · Terms of Use · Cookie Policy
          </p>
        </div>
      </footer>
    </>
  );
}
