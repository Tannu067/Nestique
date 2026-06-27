import { Link } from 'react-router-dom'
import hero from "../assets/images/hero.jpg";

import catCushion from "../assets/images/cat-cushion.jpg";
import catTable from "../assets/images/cat-table.jpg";
import table1 from '../assets/images/table-1.jpg'
import table2 from '../assets/images/table-2.jpg'

import story from "../assets/images/story.jpg";

import p1 from "../assets/images/cushion-1.jpg";
import p2 from "../assets/images/cushion-2.jpg";
import p3 from "../assets/images/cushion-3.jpg";

import p4 from "../assets/images/table-1.jpg";
import p5 from "../assets/images/table-2.jpg";
import p6 from "../assets/images/table-3.jpg";

import p7 from "../assets/images/apron-1.jpg";
import p8 from "../assets/images/apron-2.jpg";

export default function Home() {
  const IMGS = {
    hero,
    catCushion,
    catTable,
    catApron,
    story,
    p1, p2, p3,
    p4, p5, p6,
    p7, p8
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      

      {/* HERO */}
      <section style={{ display: "flex", minHeight: "90vh" }}>
        <div style={{ flex: 1, padding: "60px" }}>
          <h1 style={{ fontSize: "50px" }}>
            Dress your <span style={{ color: "brown" }}>home</span>
          </h1>
          <p>Handmade cushion covers, table linens and aprons.</p>
        </div>

        <div style={{ flex: 1 }}>
          <img
            src={IMGS.hero}
            alt="hero"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ display: "flex", gap: "20px", padding: "40px" }}>

        <div style={{ flex: 1 }}>
          <img src={IMGS.catCushion} style={{ width: "100%" }} alt="" />
          <h3>Cushions</h3>
        </div>

        <div style={{ flex: 1 }}>
          <img src={IMGS.catTable} style={{ width: "100%" }} alt="" />
          <h3>Table Covers</h3>
        </div>

        <div style={{ flex: 1 }}>
          <img src={IMGS.catApron} style={{ width: "100%" }} alt="" />
          <h3>Aprons</h3>
        </div>

      </section>

      {/* PRODUCTS */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "10px",
        padding: "40px"
      }}>
        {[IMGS.p1, IMGS.p2, IMGS.p3, IMGS.p4, IMGS.p5, IMGS.p6, IMGS.p7, IMGS.p8].map((img, i) => (
          <img key={i} src={img} alt="" style={{ width: "100%" }} />
        ))}
      </section>

      {/* STORY */}
      <section style={{ display: "flex", padding: "40px", gap: "20px" }}>
        <img src={IMGS.story} style={{ width: "50%" }} alt="" />

        <div>
          <h2>Our Story</h2>
          <p>We create handmade home decor with love and care.</p>
        </div>
      </section>

    </div>
  );
}