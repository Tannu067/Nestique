import { useState } from "react";
import { Link } from "react-router-dom";

import cushion1 from "../assets/images/cushion-1.jpg";
import cushion2 from "../assets/images/cushion-2.jpg";
import cushion3 from "../assets/images/cushion-3.jpg";

import table1 from "../assets/images/table-1.jpg";
import table2 from "../assets/images/table-2.jpg";
import table3 from "../assets/images/table-3.jpg";

import apron1 from "../assets/images/apron-1.jpg";
import apron2 from "../assets/images/apron-2.jpg";


const T = {
  sage: "#7D9B76",
  linen: "#F5F0E8",
  charcoal: "#2C2C2C",
  clay: "#A0624A",
  muted: "#7A7A7A",
};


const PRODUCTS = [
  {
    id: 1,
    img: cushion1,
    cat: "Cushion",
    name: "Boho Weave — Rust",
    price: "₹649",
    orig: "₹899",
    save: "Save 28%",
    badge: "Best Seller",
  },

  {
    id: 2,
    img: cushion2,
    cat: "Cushion",
    name: "Block Print — Indigo",
    price: "₹599",
    orig: "₹799",
    save: "Save 25%",
    badge: null,
  },

  {
    id: 3,
    img: cushion3,
    cat: "Cushion",
    name: "Velvet Luxe — Dusty Pink",
    price: "₹749",
    orig: "₹999",
    save: "Save 25%",
    badge: "New",
  },

  {
    id: 4,
    img: table1,
    cat: "Table",
    name: "Herringbone Linen — Sage",
    price: "₹1,199",
    orig: "₹1,499",
    save: "Save 20%",
    badge: null,
  },

  {
    id: 5,
    img: table2,
    cat: "Table",
    name: "Floral Embroidery — Cream",
    price: "₹1,349",
    orig: "₹1,699",
    save: "Save 21%",
    badge: "Best Seller",
  },

  {
    id: 6,
    img: table3,
    cat: "Table",
    name: "Gingham Check — Monochrome",
    price: "₹1,099",
    orig: "₹1,399",
    save: "Save 21%",
    badge: null,
  },

  {
    id: 7,
    img: apron1,
    cat: "Apron",
    name: "Canvas Chef — Navy",
    price: "₹849",
    badge: "New",
  },

  {
    id: 8,
    img: apron2,
    cat: "Apron",
    name: "Half Waist — Terracotta Stripe",
    price: "₹699",
    badge: null,
  },
];



const css = `

.pc:hover .p-img{
  transform:scale(1.05);
}

.p-img{
  transition:0.5s;
}


.wbtn{
 opacity:0;
 transition:0.3s;
}

.pc:hover .wbtn{
 opacity:1;
}


.abtn{
 transform:translateY(100%);
 transition:0.3s;
}

.pc:hover .abtn{
 transform:translateY(0);
}


@media(max-width:900px){
 .shop-grid{
   grid-template-columns:repeat(2,1fr)!important;
 }
}


@media(max-width:600px){
 .shop-grid{
   grid-template-columns:1fr!important;
 }
}

`;



function ProductCard({p}){

 const [wish,setWish] = useState(false);
 const [added,setAdded] = useState(false);


 return(

<Link 
to={`/product/${p.id}`}
style={{
 textDecoration:"none",
 color:"inherit"
}}
>


<div className="pc">


<div
style={{
position:"relative",
aspectRatio:"3/4",
overflow:"hidden",
background:T.linen,
marginBottom:"1rem"
}}
>


<img
src={p.img}
alt={p.name}
className="p-img"
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>



{
p.badge &&
<span
style={{
position:"absolute",
top:"12px",
left:"12px",
background:T.clay,
color:"#fff",
padding:"5px 10px",
fontSize:"12px"
}}
>
{p.badge}
</span>
}



<button
className="wbtn"
onClick={(e)=>{
e.preventDefault();
e.stopPropagation();
setWish(!wish);
}}

style={{
position:"absolute",
right:"12px",
top:"12px",
border:"none",
borderRadius:"50%",
width:"35px",
height:"35px",
cursor:"pointer",
background:"#fff",
fontSize:"18px"
}}
>

{wish?"♥":"♡"}

</button>



<button

className="abtn"

onClick={(e)=>{

e.preventDefault();
e.stopPropagation();

setAdded(true);

setTimeout(()=>{
setAdded(false)
},1500)

}}

style={{

position:"absolute",
bottom:0,
left:0,
right:0,

padding:"12px",

border:"none",

background:added?T.sage:T.charcoal,

color:"#fff",

cursor:"pointer"

}}

>

{added?"Added ✓":"Add To Cart"}

</button>



</div>




<p
style={{
color:T.sage,
fontSize:"12px",
textTransform:"uppercase"
}}
>
{p.cat}
</p>



<h3
style={{
color:T.charcoal
}}
>
{p.name}
</h3>



<div
style={{
display:"flex",
gap:"10px",
alignItems:"center"
}}
>

<b>{p.price}</b>


{
p.orig &&
<span
style={{
color:T.muted,
textDecoration:"line-through"
}}
>
{p.orig}
</span>
}


{
p.save &&
<span
style={{
color:T.clay,
fontSize:"12px"
}}
>
{p.save}
</span>
}


</div>



</div>

</Link>

 )

}




export default function Shop(){


const [filter,setFilter] = useState("All");


const filters=[
"All",
"Cushion",
"Table",
"Apron"
];


const visible =
filter==="All"
?
PRODUCTS
:
PRODUCTS.filter(
p=>p.cat===filter
);



return(

<>


<style>{css}</style>


<div
style={{
background:T.linen,
minHeight:"100vh",
padding:"4rem 5vw"
}}
>



<div
className="shop-top"
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"end",
marginBottom:"3rem"
}}
>



<div>

<p
style={{
color:T.sage,
letterSpacing:"2px"
}}
>
ALL PRODUCTS
</p>


<h1
style={{
fontSize:"3rem",
color:T.charcoal
}}
>
Shop
</h1>

</div>



<div
style={{
display:"flex",
gap:"10px"
}}
>

{
filters.map(f=>(

<button

key={f}

onClick={()=>setFilter(f)}

style={{

padding:"8px 18px",

border:"1px solid #ccc",

cursor:"pointer",

background:
filter===f
?
T.charcoal
:
"transparent",

color:
filter===f
?
"#fff"
:
T.charcoal

}}

>

{f}

</button>

))
}


</div>


</div>





<p
style={{
color:T.muted
}}
>
{visible.length} PRODUCTS
</p>




<div

className="shop-grid"

style={{

display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:"2rem",

marginTop:"2rem"

}}

>


{
visible.map(
p=>
<ProductCard
key={p.id}
p={p}
/>
)
}


</div>




</div>


</>

)

}
