import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════
   DESIGN SYSTEM — Vert & Jaune Africain
═══════════════════════════════════════ */
const C = {
  // Primaires
  green:   "#1B7A3E",  // Vert forêt africain
  green2:  "#25A054",  // Vert vif
  green3:  "#0F5C2E",  // Vert foncé
  greenL:  "#E8F7EE",  // Vert clair
  yellow:  "#F5C518",  // Jaune or africain
  yellow2: "#FFD700",  // Or vif
  yellowL: "#FFFBEA",  // Jaune pâle
  // Neutres
  white:   "#FFFFFF",
  offW:    "#F9FAF7",
  gray1:   "#F2F4F0",
  gray2:   "#E2E8DF",
  gray3:   "#B8C4B3",
  gray4:   "#7A8C75",
  dark:    "#1A2318",
  dark2:   "#243020",
  // Sémantiques
  danger:  "#E53935",
  ok:      "#2E7D32",
  warn:    "#F57C00",
  info:    "#1565C0",
};

const G = {
  main:   `linear-gradient(135deg, #1B7A3E, #25A054)`,
  gold:   `linear-gradient(135deg, #F5C518, #FFD700)`,
  hero:   `linear-gradient(160deg, #0F5C2E 0%, #1B7A3E 50%, #25A054 100%)`,
  card:   `linear-gradient(145deg, #FFFFFF, #F9FAF7)`,
  dark:   `linear-gradient(160deg, #1A2318, #243020)`,
  light:  `linear-gradient(160deg, #F9FAF7, #F2F4F0)`,
  afro:   `linear-gradient(135deg, #1B7A3E 0%, #F5C518 100%)`,
};

const fmt = n => n.toLocaleString("fr-FR");

/* ═══════════════════════════════════════
   DATA — 10 PARTENAIRES MULTI-CATÉGORIES
═══════════════════════════════════════ */
const CATEGORIES = [
  { id:"all",       icon:"🌍", label:"Tout",          color:C.green  },
  { id:"food",      icon:"🍽️", label:"Restaurants",   color:"#E65100"},
  { id:"pastry",    icon:"🥐", label:"Pâtisserie",    color:"#6D4C41"},
  { id:"flowers",   icon:"💐", label:"Fleuriste",     color:"#C62828"},
  { id:"market",    icon:"🛒", label:"Supermarché",   color:"#1565C0"},
  { id:"choco",     icon:"🍫", label:"Chocolaterie",  color:"#4E342E"},
  { id:"clean",     icon:"🧹", label:"Nettoyage",     color:"#00695C"},
  { id:"laundry",   icon:"👕", label:"Laverie",       color:"#1976D2"},
  { id:"courier",   icon:"🏍️", label:"Coursier",      color:"#6A1B9A"},
];

const PARTNERS = [
  // RESTAURANTS
  {
    id:1, cat:"food", name:"Chez Mama Afrique", sub:"Cuisine du terroir béninois",
    rating:4.9, reviews:412, time:"20-30", fee:300, open:true, dist:"1.1km",
    badge:"⭐ Top 1", emoji:"🍲", color:"#E65100",
    items:[
      {id:1,  name:"Amiwo Royal",         price:2000, desc:"Pâte de maïs rouge, sauce tomate épicée, viande",    emoji:"🌽"},
      {id:2,  name:"Gboma Dessi Spécial", price:2500, desc:"Épinards, poisson fumé, huile de palme artisanale",  emoji:"🐟"},
      {id:3,  name:"Poulet Braisé DG",    price:4500, desc:"Demi-poulet mariné aux épices, attiéké & alloco",    emoji:"🍗"},
      {id:4,  name:"Kpétou Sauce Rouge",  price:1200, desc:"Boulettes de haricots frites, sauce piment maison", emoji:"🫘"},
      {id:5,  name:"Jus Gingembre Bio",   price:800,  desc:"100% naturel, citron vert, menthe fraîche",          emoji:"🫚"},
    ],
  },
  {
    id:2, cat:"food", name:"King Burger Cotonou", sub:"Burgers & Fast Food Premium",
    rating:4.7, reviews:891, time:"15-25", fee:500, open:true, dist:"0.8km",
    badge:"🔥 Tendance", emoji:"🍔", color:"#BF360C",
    items:[
      {id:6,  name:"Burger Africain",     price:4200, desc:"Bœuf local, fromage, avocat, sauce épices",          emoji:"🍔"},
      {id:7,  name:"Crispy Chicken XL",   price:3800, desc:"Poulet croustillant, coleslaw, sauce barbecue",      emoji:"🍗"},
      {id:8,  name:"Frites + Sauce",      price:1200, desc:"Pommes fraîches, sauce fromage ou piment",           emoji:"🍟"},
      {id:9,  name:"Milkshake Maison",    price:1500, desc:"Chocolat belge, fraise ou vanille Bourbon",          emoji:"🥤"},
    ],
  },
  {
    id:3, cat:"food", name:"Maquis du Lac Nokoué", sub:"Poissons & Grillades lac",
    rating:4.8, reviews:356, time:"25-40", fee:400, open:true, dist:"2.3km",
    badge:"🌊 Fraîcheur", emoji:"🐠", color:"#006064",
    items:[
      {id:10, name:"Tilapia Braisé",      price:4000, desc:"Tilapia frais du lac, attiéké, sauce tomate",        emoji:"🐠"},
      {id:11, name:"Crevettes Géantes",   price:6500, desc:"Crevettes du lac, beurre ail, pain artisanal",       emoji:"🦐"},
      {id:12, name:"Capitaine Entier",    price:5500, desc:"Capitaine frit, légumes sautés, riz parfumé",        emoji:"🐟"},
    ],
  },
  // PÂTISSERIE
  {
    id:4, cat:"pastry", name:"Pâtisserie Belle Époque", sub:"Gâteaux & Viennoiseries artisanales",
    rating:4.8, reviews:234, time:"10-20", fee:200, open:true, dist:"0.5km",
    badge:"🥐 Artisan", emoji:"🎂", color:"#6D4C41",
    items:[
      {id:13, name:"Fondant Cacao Bénin", price:2800, desc:"Cœur coulant, cacao 72% Béninois, crème anglaise",  emoji:"🎂"},
      {id:14, name:"Croissant Beurre",    price:700,  desc:"Feuilleté 27 couches, beurre AOP français",         emoji:"🥐"},
      {id:15, name:"Tarte Noix Coco",     price:2200, desc:"Noix de coco fraîche, crème pâtissière vanille",    emoji:"🥧"},
      {id:16, name:"Éclair Café",         price:1200, desc:"Café arabica, fondant chocolat noir, choux léger",  emoji:"🍫"},
      {id:17, name:"Gâteau 3D Commande",  price:35000,desc:"Sur commande, livraison planifiée, design au choix",emoji:"🎂"},
    ],
  },
  // FLEURISTE
  {
    id:5, cat:"flowers", name:"Jardins d'Afrique", sub:"Fleurs fraîches & Arrangements",
    rating:4.9, reviews:178, time:"30-50", fee:500, open:true, dist:"1.8km",
    badge:"💐 Premium", emoji:"🌹", color:"#C62828",
    items:[
      {id:18, name:"Bouquet Romantique",  price:8500, desc:"Roses rouges, lys blancs, verdure tropicale",        emoji:"🌹"},
      {id:19, name:"Arrangement Mariage", price:25000,desc:"Composition florale sur mesure, livraison express",  emoji:"💒"},
      {id:20, name:"Plante Tropicale",    price:5500, desc:"Plante d'intérieur, pot décoratif, entretien facile",emoji:"🪴"},
      {id:21, name:"Bouquet Anniversaire",price:12000,desc:"Orchidées, tournesols, carte message personnalisée", emoji:"🎂"},
      {id:22, name:"Couronne Funèbre",    price:18000,desc:"Composition sobre et élégante, livraison prioritaire",emoji:"🕊️"},
    ],
  },
  // SUPERMARCHÉ
  {
    id:6, cat:"market", name:"FreshMart Express", sub:"Courses livrées en 30 min",
    rating:4.6, reviews:567, time:"25-40", fee:350, open:true, dist:"1.2km",
    badge:"🛒 Express", emoji:"🛍️", color:"#1565C0",
    items:[
      {id:23, name:"Pack Légumes Frais",  price:3500, desc:"Tomates, oignons, piment, ail, carottes du marché",  emoji:"🥬"},
      {id:24, name:"Pack Protéines",      price:8000, desc:"Poulet, bœuf, œufs frais, poisson fumé",            emoji:"🥩"},
      {id:25, name:"Épicerie Semaine",    price:15000,desc:"Riz, huile, farine, lait, sucre, sel, condiments",  emoji:"🛒"},
      {id:26, name:"Boissons Fraîches",   price:4500, desc:"Eau, jus, sodas, bières locales, yaourts",          emoji:"🧃"},
      {id:27, name:"Produits Bébé",       price:6500, desc:"Couches, lait infantile, lingettes, crème",          emoji:"👶"},
    ],
  },
  // CHOCOLATERIE
  {
    id:7, cat:"choco", name:"Cacao Royale Bénin", sub:"Chocolats fins 100% béninois",
    rating:5.0, reviews:89, time:"15-25", fee:300, open:true, dist:"0.9km",
    badge:"🍫 Artisan", emoji:"🍫", color:"#4E342E",
    items:[
      {id:28, name:"Box Dégustation",     price:12000,desc:"12 chocolats, 4 origines Bénin, emballage cadeau",   emoji:"🎁"},
      {id:29, name:"Tablette Noir 85%",   price:3500, desc:"Cacao grand cru Alibori, notes fruités et florales", emoji:"🍫"},
      {id:30, name:"Truffes Piment",      price:4500, desc:"Ganache chocolat noir, piment de Pendjari, or",      emoji:"✨"},
      {id:31, name:"Chocolat Chaud",      price:1500, desc:"Cacao pur, lait entier, pointe cannelle locale",     emoji:"☕"},
    ],
  },
  // NETTOYAGE
  {
    id:8, cat:"clean", name:"CleanPro Services", sub:"Nettoyage pro domicile & bureaux",
    rating:4.7, reviews:145, time:"60-120", fee:0, open:true, dist:"—",
    badge:"🧹 Certifié", emoji:"🏠", color:"#00695C",
    items:[
      {id:32, name:"Nettoyage Appartement",price:15000,desc:"Studio/F2, produits fournis, 2h de travail",        emoji:"🏠"},
      {id:33, name:"Nettoyage Villa",     price:35000,desc:"Grande surface, équipe de 3, matériel pro",          emoji:"🏡"},
      {id:34, name:"Nettoyage Bureau",    price:25000,desc:"Open space jusqu'à 100m², désinfection complète",    emoji:"🏢"},
      {id:35, name:"Vitres & Façades",    price:20000,desc:"Nacelle si nécessaire, résultat impeccable garanti", emoji:"🪟"},
      {id:36, name:"Après Travaux",       price:45000,desc:"Débarras + nettoyage profond post-chantier",         emoji:"🔨"},
    ],
  },
  // LAVERIE
  {
    id:9, cat:"laundry", name:"LavoExpress Cotonou", sub:"Lavage & Repassage à domicile",
    rating:4.8, reviews:203, time:"120-240", fee:500, open:true, dist:"1.5km",
    badge:"👕 Express", emoji:"🫧", color:"#1976D2",
    items:[
      {id:37, name:"Lavage 5kg",          price:3000, desc:"Collecte + lavage + livraison, produits premium",    emoji:"👕"},
      {id:38, name:"Lavage + Repassage",  price:5500, desc:"5kg lavé, séché, repassé, plié et livré",           emoji:"👔"},
      {id:39, name:"Pressing Costume",    price:4500, desc:"Costume, robe de soirée, vêtements délicats",        emoji:"🥻"},
      {id:40, name:"Couette/Housse",      price:6000, desc:"Grand format, lavage industriel, livraison 48h",     emoji:"🛏️"},
    ],
  },
  // COURSIER
  {
    id:10, cat:"courier", name:"ZéWa Coursier Express", sub:"Envoi de colis & documents",
    rating:4.9, reviews:678, time:"30-60", fee:0, open:true, dist:"—",
    badge:"🏍️ Rapide", emoji:"📦", color:"#6A1B9A",
    items:[
      {id:41, name:"Colis Express Ville",  price:1500, desc:"Livraison dans Cotonou en moins d'1h, suivi GPS",   emoji:"📦"},
      {id:42, name:"Documents Urgents",    price:2000, desc:"Enveloppe sécurisée, signature obligatoire",         emoji:"📄"},
      {id:43, name:"Colis Inter-villes",   price:5000, desc:"Cotonou ↔ Porto-Novo, Bohicon, Parakou",            emoji:"🚐"},
      {id:44, name:"Courses Personnelles", price:3000, desc:"Commissionnaire, achats marché, pharmacie...",       emoji:"🛍️"},
      {id:45, name:"Déménagement Partiel", price:15000,desc:"Camionnette + aide, devis personnalisé disponible",  emoji:"🚛"},
    ],
  },
];

const ORDER_HIST = [
  {id:"#ZW-4021", partner:"Chez Mama Afrique",      cat:"food",    total:5200,  date:"Auj. 12:30", status:"Livré"},
  {id:"#ZW-3998", partner:"Pâtisserie Belle Époque",cat:"pastry",  total:3500,  date:"Hier 16:45", status:"Livré"},
  {id:"#ZW-3971", partner:"LavoExpress Cotonou",    cat:"laundry", total:5500,  date:"04 Mar",      status:"Livré"},
  {id:"#ZW-3950", partner:"Jardins d'Afrique",      cat:"flowers", total:8500,  date:"01 Mar",      status:"Livré"},
];

const PROMOS = [
  {title:"Première commande",  sub:"-20% sur tout",          code:"ZEWA20",  c1:"#1B7A3E", c2:"#25A054", emoji:"🎁"},
  {title:"Livraison Gratuite", sub:"Commandes > 5 000 FCFA", code:"FREELIV", c1:"#F5C518", c2:"#E6AC00", emoji:"🛵", dark:true},
  {title:"Coursier Express",   sub:"30 min garanti en ville", code:"EXPRESS", c1:"#6A1B9A", c2:"#4A148C", emoji:"🏍️"},
];

const PAYMENT_METHODS = [
  {id:"mtn",   icon:"💛", label:"MTN Mobile Money",   sub:"*880#",         color:"#FFB300", active:true },
  {id:"moov",  icon:"💙", label:"Moov Money",          sub:"*155#",         color:"#1976D2", active:false},
  {id:"card",  icon:"💳", label:"Carte Bancaire",      sub:"Visa / Mastercard", color:"#1565C0", active:false},
  {id:"cash",  icon:"💵", label:"Espèces à la livraison",sub:"Payer le livreur", color:"#2E7D32", active:false},
];

const RIDERS = [
  {name:"Dossou Anicet",  zone:"Cotonou Nord", orders:14, rating:4.9, status:"Actif",  emoji:"🏍️"},
  {name:"Kpodo Franck",   zone:"Akpakpa",      orders:9,  rating:4.8, status:"Actif",  emoji:"🛵" },
  {name:"Agossa Michel",  zone:"Fidjrossè",    orders:6,  rating:4.7, status:"Pause",  emoji:"🏍️"},
  {name:"Gbénou Sandra",  zone:"Godomey",      orders:18, rating:5.0, status:"Actif",  emoji:"🛵" },
  {name:"Hounsa Romain",  zone:"Cadjehoun",    orders:11, rating:4.9, status:"Actif",  emoji:"🏍️"},
];

const TRACK_STEPS = [
  {icon:"✅", label:"Commande confirmée"},
  {icon:"⚙️", label:"Partenaire en préparation"},
  {icon:"🏍️", label:"Livreur en route"},
  {icon:"📦", label:"Livré avec succès !"},
];

/* ═══════════════════════════════════════
   LOGO AFRICAIN
═══════════════════════════════════════ */
function Logo({ size = 40, dark = false }) {
  const txt = dark ? C.dark : C.white;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, userSelect:"none" }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5C518"/>
            <stop offset="100%" stopColor="#FFD700"/>
          </linearGradient>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B7A3E"/>
            <stop offset="100%" stopColor="#25A054"/>
          </linearGradient>
        </defs>
        {/* Étoile africaine hexagonale */}
        <polygon points="32,4 56,17 56,47 32,60 8,47 8,17" fill="url(#lg2)"/>
        {/* Motif adinkra central (losange = force) */}
        <rect x="22" y="22" width="20" height="20" rx="2" transform="rotate(45 32 32)" fill="url(#lg1)" opacity=".9"/>
        {/* Éclair = livraison rapide */}
        <path d="M36 10 L24 33 L31 33 L28 54 L40 30 L33 30 Z" fill="white" opacity=".95"/>
        {/* Point accent vert clair */}
        <circle cx="50" cy="14" r="7" fill="#25A054"/>
        <circle cx="50" cy="14" r="4" fill="white" opacity=".6"/>
      </svg>
      <div>
        <div style={{
          fontWeight:900, fontSize:size*0.56, letterSpacing:3,
          background: dark ? `linear-gradient(135deg,#1B7A3E,#25A054)` : `linear-gradient(135deg,#F5C518,#FFD700)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          lineHeight:1,
        }}>ZÉWA</div>
        <div style={{ fontSize:size*0.18, color: dark ? C.gray4 : "rgba(255,255,255,.6)", letterSpacing:2.5, fontWeight:600 }}>
          LIVRAISON EXPRESS
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════ */
function BottomNav({ tab, setTab, cartCount }) {
  const tabs = [
    {id:"home",    icon:"🏠", label:"Accueil"  },
    {id:"search",  icon:"🔍", label:"Chercher" },
    {id:"orders",  icon:"📦", label:"Commandes"},
    {id:"profile", icon:"👤", label:"Profil"   },
  ];
  return (
    <nav style={{ background:C.white, borderTop:`2px solid ${C.gray2}`, display:"flex", padding:"8px 0 16px", flexShrink:0, boxShadow:"0 -4px 20px rgba(0,0,0,.08)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", position:"relative", padding:"2px 0" }}>
          <span style={{ fontSize:20, filter:tab===t.id?"none":"grayscale(1) opacity(.35)", transition:"all .2s", transform:tab===t.id?"scale(1.15)":"scale(1)" }}>{t.icon}</span>
          <span style={{ fontSize:9, fontWeight:700, color:tab===t.id?C.green:C.gray3, transition:"color .2s" }}>{t.label}</span>
          {tab===t.id && <div style={{ position:"absolute", bottom:-16, width:22, height:3, background:G.main, borderRadius:2 }}/>}
          {t.id==="orders" && cartCount>0 && (
            <div style={{ position:"absolute", top:0, right:"18%", background:C.yellow, color:C.dark, width:16, height:16, borderRadius:"50%", fontSize:8, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 8px rgba(245,197,24,.6)` }}>{cartCount}</div>
          )}
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════
   PARTNER CARD
═══════════════════════════════════════ */
function PartnerCard({ p, idx, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => p.open && onSelect(p)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:20, overflow:"hidden", cursor:p.open?"pointer":"default",
        background:C.white, opacity:p.open?1:.6,
        border:`1px solid ${hov&&p.open?C.green+"66":C.gray2}`,
        transform:hov&&p.open?"translateY(-3px)":"translateY(0)",
        boxShadow:hov&&p.open?`0 16px 40px rgba(27,122,62,.15)`:`0 2px 12px rgba(0,0,0,.06)`,
        transition:"all .25s cubic-bezier(.4,0,.2,1)",
        animation:`cardIn .4s ease ${idx*.07}s both`,
      }}
    >
      <div style={{ height:110, background:`linear-gradient(135deg,${p.color}22,${p.color}08)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:58, position:"relative" }}>
        <div style={{ position:"absolute", right:-12, top:-12, width:80, height:80, borderRadius:"50%", background:`${p.color}0C` }}/>
        {p.emoji}
        <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,.6)", backdropFilter:"blur(8px)", padding:"2px 8px", borderRadius:20, fontSize:9, color:C.white, fontWeight:700 }}>{p.badge}</div>
        {!p.open && (
          <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,.75)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:C.gray3, fontWeight:700, fontSize:12 }}>Fermé</span>
          </div>
        )}
      </div>
      <div style={{ padding:"10px 12px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
          <div>
            <div style={{ fontWeight:800, color:C.dark, fontSize:13 }}>{p.name}</div>
            <div style={{ color:C.gray4, fontSize:10, marginTop:1 }}>{p.sub}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:2, background:C.yellowL, border:`1px solid ${C.yellow}55`, borderRadius:8, padding:"2px 7px" }}>
            <span style={{ color:C.yellow, fontSize:10 }}>★</span>
            <span style={{ color:C.warn, fontWeight:900, fontSize:11 }}>{p.rating}</span>
          </div>
        </div>
        <div style={{ height:1, background:C.gray2, margin:"7px 0" }}/>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:10, color:C.gray4 }}>🕐 {p.time} min</span>
          {p.dist!=="—" && <span style={{ fontSize:10, color:C.gray4 }}>📍 {p.dist}</span>}
          <span style={{ fontSize:10, fontWeight:600, color:p.fee===0?C.green:C.gray4 }}>
            🛵 {p.fee===0?"Gratuit":fmt(p.fee)+" F"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ITEM ROW
═══════════════════════════════════════ */
function ItemRow({ item, qty, onAdd, onRemove }) {
  const [pop, setPop] = useState(false);
  const handleAdd = () => { onAdd(item); setPop(true); setTimeout(()=>setPop(false),300); };
  return (
    <div style={{ display:"flex", gap:11, alignItems:"center", background:C.white, border:`1px solid ${C.gray2}`, borderRadius:16, padding:"11px 12px", transition:"box-shadow .2s", boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}>
      <div style={{ width:48, height:48, borderRadius:12, flexShrink:0, background:C.greenL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{item.emoji}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:700, color:C.dark, fontSize:13, marginBottom:2 }}>{item.name}</div>
        <div style={{ color:C.gray4, fontSize:10, lineHeight:1.4, marginBottom:5 }}>{item.desc}</div>
        <div style={{ fontWeight:900, color:C.green, fontSize:13 }}>{fmt(item.price)} <span style={{ fontSize:9, fontWeight:500, color:C.gray4 }}>FCFA</span></div>
      </div>
      {qty > 0 ? (
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <button onClick={() => onRemove(item.id)} style={{ width:28, height:28, borderRadius:"50%", background:C.greenL, color:C.green, fontSize:16, fontWeight:700, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
          <span style={{ color:C.dark, fontWeight:900, fontSize:14, minWidth:16, textAlign:"center" }}>{qty}</span>
          <button onClick={handleAdd} style={{ width:28, height:28, borderRadius:"50%", background:G.main, color:C.white, fontSize:16, fontWeight:700, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transform:pop?"scale(1.3)":"scale(1)", transition:"transform .2s" }}>+</button>
        </div>
      ) : (
        <button onClick={handleAdd} style={{ width:34, height:34, borderRadius:"50%", background:G.main, color:C.white, fontSize:20, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 4px 12px rgba(27,122,62,.4)`, transform:pop?"scale(1.3)":"scale(1)", transition:"transform .2s" }}>+</button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   PARTNER DETAIL
═══════════════════════════════════════ */
function PartnerDetail({ p, cart, onAdd, onRemove, onBack }) {
  const [sec, setSec] = useState("menu");
  const cartCount = Object.values(cart).reduce((s,v)=>s+v,0);
  const catCfg = CATEGORIES.find(c=>c.id===p.cat);
  return (
    <div style={{ position:"absolute", inset:0, background:C.offW, zIndex:300, overflowY:"auto", animation:"slideInX .28s cubic-bezier(.4,0,.2,1)" }}>
      {/* Hero */}
      <div style={{ height:190, background:`linear-gradient(160deg,${p.color}30,${p.color}08)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:82, position:"relative", flexShrink:0 }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 60%,${C.offW} 100%)` }}/>
        {p.emoji}
        <button onClick={onBack} style={{ position:"absolute", top:50, left:14, width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,.9)", backdropFilter:"blur(12px)", color:C.dark, fontSize:18, border:`1px solid ${C.gray2}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px rgba(0,0,0,.1)" }}>←</button>
        <button style={{ position:"absolute", top:50, right:14, width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,.9)", backdropFilter:"blur(12px)", color:C.dark, fontSize:18, border:`1px solid ${C.gray2}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>♡</button>
        <div style={{ position:"absolute", top:50, left:"50%", transform:"translateX(-50%)", background:C.white, borderRadius:20, padding:"4px 12px", border:`1px solid ${C.gray2}`, display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:12 }}>{catCfg?.icon}</span>
          <span style={{ fontSize:11, fontWeight:700, color:p.color }}>{catCfg?.label}</span>
        </div>
        {p.open && (
          <div style={{ position:"absolute", bottom:16, left:14, background:"rgba(255,255,255,.9)", border:`1px solid ${C.green}44`, borderRadius:20, padding:"4px 12px", display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green, animation:"dotPulse 1.5s ease-in-out infinite" }}/>
            <span style={{ color:C.green, fontSize:11, fontWeight:700 }}>Ouvert maintenant</span>
          </div>
        )}
      </div>

      {/* Info card */}
      <div style={{ margin:"-20px 14px 0", position:"relative", zIndex:2 }}>
        <div style={{ background:C.white, borderRadius:20, padding:"16px 16px 12px", border:`1px solid ${C.gray2}`, boxShadow:"0 4px 20px rgba(0,0,0,.08)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div>
              <h1 style={{ fontSize:17, fontWeight:900, color:C.dark, lineHeight:1.1 }}>{p.name}</h1>
              <div style={{ color:C.gray4, fontSize:11, marginTop:3 }}>{p.sub}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                <span style={{ color:C.yellow, fontSize:13 }}>★</span>
                <span style={{ color:C.warn, fontWeight:900, fontSize:14 }}>{p.rating}</span>
              </div>
              <div style={{ color:C.gray3, fontSize:10, marginTop:1 }}>{p.reviews} avis</div>
            </div>
          </div>
          <div style={{ height:1, background:C.gray2, marginBottom:10 }}/>
          <div style={{ display:"flex", justifyContent:"space-around" }}>
            {[["🕐",p.time+" min","Livraison"],["📍",p.dist,"Distance"],["🛵",p.fee===0?"Gratuit":fmt(p.fee)+" F","Frais"]].map(([ic,v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:2 }}>{ic}</div>
                <div style={{ fontWeight:700, fontSize:12, color:C.dark }}>{v}</div>
                <div style={{ color:C.gray3, fontSize:9 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", margin:"12px 14px 0", background:C.gray1, borderRadius:14, padding:4 }}>
        {[["menu","📋 Menu/Services"],["info","ℹ️ Infos"]].map(([s,l]) => (
          <button key={s} onClick={()=>setSec(s)} style={{ flex:1, padding:"9px 0", borderRadius:11, background:sec===s?C.green:"transparent", color:sec===s?C.white:C.gray4, fontWeight:700, fontSize:12, border:"none", cursor:"pointer", transition:"all .2s" }}>{l}</button>
        ))}
      </div>

      {/* Items */}
      {sec==="menu" && (
        <div style={{ padding:"12px 14px 110px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {p.items.map(item => <ItemRow key={item.id} item={item} qty={cart[item.id]||0} onAdd={onAdd} onRemove={()=>onRemove(item.id)}/>)}
          </div>
        </div>
      )}
      {sec==="info" && (
        <div style={{ padding:"12px 14px 100px" }}>
          {[["📍","Adresse","Cotonou, Bénin"],["🕐","Horaires","Lun–Sam : 7h–22h"],["📞","Téléphone","+229 97 XX XX XX"],["🛵","Livraison",p.fee===0?"Gratuite":fmt(p.fee)+" FCFA"],["💳","Paiement","MTN MoMo, Moov, Carte, Cash"]].map(([ic,l,v]) => (
            <div key={l} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.white, borderRadius:14, padding:"12px 14px", marginBottom:9, border:`1px solid ${C.gray2}` }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{ic}</span>
              <div><div style={{ fontSize:10, color:C.gray3, fontWeight:600, marginBottom:2 }}>{l}</div><div style={{ fontSize:13, color:C.dark, fontWeight:500 }}>{v}</div></div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky ORDER BUTTON */}
      {cartCount>0 && (
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"12px 16px 24px", background:`linear-gradient(180deg,transparent 0%,${C.white} 30%)`, zIndex:400 }}>
          <button style={{ width:"100%", padding:"16px 20px", borderRadius:20, background:G.main, color:C.white, fontWeight:900, fontSize:16, border:"none", cursor:"pointer", boxShadow:`0 8px 28px rgba(27,122,62,.45)`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ background:"rgba(255,255,255,.25)", borderRadius:10, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14 }}>{cartCount}</div>
            <span>🛵 COMMANDER MAINTENANT</span>
            <span style={{ fontWeight:900 }}>{fmt(Object.entries(cart).reduce((s,[id,q])=>{const it=p.items.find(i=>i.id==id);return s+(it?it.price*q:0);},0)+p.fee)} F</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME TAB
═══════════════════════════════════════ */
function HomeTab({ q, setQ, cat, setCat, promoIdx, onSelect }) {
  const filtered = PARTNERS.filter(p => {
    const mq = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.sub.toLowerCase().includes(q.toLowerCase());
    const mc = cat==="all" || p.cat===cat;
    return mq && mc;
  });

  return (
    <div style={{ paddingBottom:90, background:C.offW }}>
      {/* Hero header */}
      <div style={{ background:G.hero, padding:"50px 18px 22px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, width:160, height:160, borderRadius:"50%", background:"rgba(245,197,24,.12)" }}/>
        <div style={{ position:"absolute", left:-20, bottom:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,.05)" }}/>
        {/* Adinkra pattern */}
        <div style={{ position:"absolute", right:14, top:48, opacity:.08 }}>
          <svg width="80" height="80" viewBox="0 0 80 80"><polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke="white" strokeWidth="2"/><polygon points="40,15 65,28 65,52 40,65 15,52 15,28" fill="none" stroke="white" strokeWidth="1.5"/></svg>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div>
            <Logo size={36}/>
          </div>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, border:"1px solid rgba(255,255,255,.3)" }}>👤</div>
        </div>
        <div style={{ marginBottom:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ fontSize:13, color:C.yellow }}>📍</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.7)" }}>Livraison à</span>
          </div>
          <div style={{ fontSize:17, fontWeight:800, color:C.white }}>Cadjehoun, Cotonou <span style={{ color:C.yellow, fontSize:12 }}>▾</span></div>
        </div>
        {/* Search */}
        <div style={{ position:"relative", marginTop:14 }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, color:C.gray4 }}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Restaurants, fleurs, courses, laverie..."
            style={{ width:"100%", padding:"13px 14px 13px 44px", background:C.white, border:`1px solid ${C.gray2}`, borderRadius:16, color:C.dark, fontSize:13, fontWeight:500, outline:"none", boxShadow:"0 2px 12px rgba(0,0,0,.08)" }}/>
        </div>
      </div>

      <div style={{ padding:"18px 18px 0" }}>
        {/* Promos */}
        <div style={{ marginBottom:22 }}>
          <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:6, scrollbarWidth:"none" }}>
            {PROMOS.map((p, i) => (
              <div key={i} style={{ minWidth:230, flex:"0 0 230px", borderRadius:18, padding:"16px", position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${p.c1},${p.c2})`, boxShadow:i===promoIdx?`0 8px 28px ${p.c1}55`:`0 3px 12px ${p.c1}33`, transform:i===promoIdx?"scale(1.03)":"scale(1)", transition:"all .3s" }}>
                <div style={{ position:"absolute", right:-6, top:-6, fontSize:55, opacity:.15 }}>{p.emoji}</div>
                <div style={{ fontSize:26, marginBottom:7 }}>{p.emoji}</div>
                <div style={{ fontWeight:900, fontSize:16, color:p.dark?C.dark:C.white, lineHeight:1.2 }}>{p.title}</div>
                <div style={{ color:p.dark?"rgba(0,0,0,.6)":"rgba(255,255,255,.75)", fontSize:11, marginTop:2 }}>{p.sub}</div>
                <div style={{ marginTop:10, display:"inline-flex", background:"rgba(255,255,255,.25)", borderRadius:20, padding:"3px 12px" }}>
                  <span style={{ color:p.dark?C.dark:C.white, fontWeight:900, fontSize:11, letterSpacing:1 }}>{p.code}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:5, justifyContent:"center", marginTop:10 }}>
            {PROMOS.map((_,i) => <div key={i} style={{ width:i===promoIdx?20:6, height:6, borderRadius:3, background:i===promoIdx?C.green:C.gray3, transition:"all .3s" }}/>)}
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:11 }}>Nos Services</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, scrollbarWidth:"none" }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={()=>setCat(c.id)} style={{ whiteSpace:"nowrap", padding:"8px 14px", borderRadius:99, background:cat===c.id?C.green:C.white, color:cat===c.id?C.white:C.gray4, fontWeight:cat===c.id?700:500, fontSize:12, border:cat===c.id?`none`:`1px solid ${C.gray2}`, boxShadow:cat===c.id?`0 4px 14px rgba(27,122,62,.4)`:"none", transition:"all .2s", cursor:"pointer" }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:900, color:C.dark }}>{q?`"${q}"`:cat==="all"?"🌍 Tous les partenaires":CATEGORIES.find(c=>c.id===cat)?.label}</div>
            <div style={{ fontSize:11, color:C.gray4, marginTop:1 }}>{filtered.length} partenaire{filtered.length>1?"s":""}</div>
          </div>
          <span style={{ fontSize:12, color:C.green, fontWeight:700 }}>Tout voir →</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, paddingBottom:20 }}>
          {filtered.map((p,i) => <PartnerCard key={p.id} p={p} idx={i} onSelect={onSelect}/>)}
          {!filtered.length && <div style={{ textAlign:"center", padding:"40px 0", color:C.gray4 }}>Aucun résultat 😕</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CART SHEET
═══════════════════════════════════════ */
function CartSheet({ cart, allItems, onClose, onAdd, onRemove, onOrder, onClear }) {
  const total = allItems.reduce((s,i) => s + i.price*(cart[i.id]||0), 0);
  const count = Object.values(cart).reduce((s,v)=>s+v,0);
  const [payMethod, setPayMethod] = useState("mtn");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const discount = promoApplied ? Math.round(total*0.2) : 0;
  const delivery = total >= 5000 ? 0 : 300;

  return (
    <div style={{ position:"absolute", inset:0, zIndex:500, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.5)", backdropFilter:"blur(4px)" }}/>
      <div style={{ position:"relative", zIndex:1, background:C.white, borderRadius:"24px 24px 0 0", boxShadow:"0 -8px 40px rgba(0,0,0,.15)", animation:"sheetUp .32s cubic-bezier(.4,0,.2,1)", maxHeight:"92vh", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"10px 0 0", display:"flex", justifyContent:"center" }}>
          <div style={{ width:36, height:4, borderRadius:2, background:C.gray2 }}/>
        </div>
        <div style={{ padding:"12px 18px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${C.gray2}` }}>
          <div>
            <div style={{ fontWeight:900, fontSize:18, color:C.dark }}>Mon Panier 🛒</div>
            <div style={{ color:C.gray4, fontSize:11, marginTop:1 }}>{count} article{count>1?"s":""}</div>
          </div>
          {count>0 && <button onClick={onClear} style={{ background:"rgba(229,57,53,.1)", border:"1px solid rgba(229,57,53,.2)", borderRadius:10, padding:"5px 12px", color:C.danger, fontSize:12, fontWeight:700, cursor:"pointer" }}>Vider</button>}
        </div>

        {count===0 ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 20px" }}>
            <div style={{ fontSize:60, marginBottom:14 }}>🛒</div>
            <div style={{ color:C.gray4, fontSize:16, fontWeight:500 }}>Votre panier est vide</div>
            <button onClick={onClose} style={{ marginTop:18, background:G.main, color:C.white, padding:"12px 30px", borderRadius:30, fontWeight:700, fontSize:15, border:"none", cursor:"pointer" }}>Parcourir les services</button>
          </div>
        ) : (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:"0 18px" }}>
              {allItems.filter(i=>cart[i.id]>0).map(item => (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${C.gray2}` }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:C.dark, fontSize:13 }}>{item.name}</div>
                    <div style={{ color:C.green, fontWeight:900, marginTop:2, fontSize:13 }}>{fmt(item.price*(cart[item.id]||0))} FCFA</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <button onClick={()=>onRemove(item.id)} style={{ width:26, height:26, borderRadius:"50%", background:C.greenL, color:C.green, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                    <span style={{ color:C.dark, fontWeight:900, fontSize:14, minWidth:18, textAlign:"center" }}>{cart[item.id]}</span>
                    <button onClick={()=>onAdd(item)} style={{ width:26, height:26, borderRadius:"50%", background:G.main, color:C.white, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                  </div>
                </div>
              ))}

              {/* Promo code */}
              <div style={{ margin:"14px 0", display:"flex", gap:8 }}>
                <input value={promo} onChange={e=>setPromo(e.target.value.toUpperCase())} placeholder="Code promo (ex: ZEWA20)" style={{ flex:1, padding:"10px 12px", background:C.gray1, border:`1px solid ${promoApplied?C.green:C.gray2}`, borderRadius:12, fontSize:12, color:C.dark, outline:"none" }}/>
                <button onClick={()=>{if(promo==="ZEWA20")setPromoApplied(true);}} style={{ padding:"10px 16px", background:promoApplied?C.greenL:G.main, color:promoApplied?C.green:C.white, borderRadius:12, fontWeight:700, fontSize:12, border:promoApplied?`1px solid ${C.green}`:"none", cursor:"pointer" }}>
                  {promoApplied?"✓ Appliqué":"Valider"}
                </button>
              </div>
            </div>

            <div style={{ padding:"14px 18px 28px", borderTop:`1px solid ${C.gray2}` }}>
              {/* Summary */}
              <div style={{ background:C.gray1, borderRadius:14, padding:"12px 14px", marginBottom:14 }}>
                {[["Sous-total",`${fmt(total)} FCFA`,C.dark],[`Livraison`,delivery===0?`Gratuite !`:`${fmt(delivery)} FCFA`,delivery===0?C.green:C.gray4],promoApplied?["Promo ZEWA20",`−${fmt(discount)} FCFA`,C.ok]:null].filter(Boolean).map(([l,v,col]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                    <span style={{ color:C.gray4, fontSize:12 }}>{l}</span>
                    <span style={{ color:col, fontSize:12, fontWeight:600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ height:1, background:C.gray2, margin:"8px 0" }}/>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:C.dark, fontWeight:900, fontSize:15 }}>Total à payer</span>
                  <span style={{ fontWeight:900, fontSize:19, color:C.green }}>{fmt(total + delivery - discount)} FCFA</span>
                </div>
              </div>

              {/* Payment methods */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.dark, marginBottom:9 }}>Mode de paiement</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {PAYMENT_METHODS.map(pm => (
                    <div key={pm.id} onClick={()=>setPayMethod(pm.id)} style={{ display:"flex", alignItems:"center", gap:8, background:payMethod===pm.id?C.greenL:C.gray1, border:`1px solid ${payMethod===pm.id?C.green:C.gray2}`, borderRadius:12, padding:"10px 10px", cursor:"pointer", transition:"all .2s" }}>
                      <span style={{ fontSize:18 }}>{pm.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:payMethod===pm.id?C.green:C.dark, lineHeight:1.2 }}>{pm.label}</div>
                        <div style={{ fontSize:9, color:C.gray4 }}>{pm.sub}</div>
                      </div>
                      {payMethod===pm.id && <div style={{ width:8, height:8, borderRadius:"50%", background:C.green, flexShrink:0 }}/>}
                    </div>
                  ))}
                </div>
              </div>

              {/* ORDER BUTTON — bien visible */}
              <button onClick={onOrder} style={{ width:"100%", padding:"17px 20px", borderRadius:20, background:G.main, color:C.white, fontWeight:900, fontSize:17, border:"none", cursor:"pointer", boxShadow:`0 8px 28px rgba(27,122,62,.5)`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ background:"rgba(255,255,255,.25)", borderRadius:10, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15 }}>{count}</span>
                <span>🛵 COMMANDER</span>
                <span>{fmt(total+delivery-discount)} F</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ORDERS TAB
═══════════════════════════════════════ */
function OrdersTab({ ordered, step }) {
  return (
    <div style={{ background:C.offW, paddingBottom:90 }}>
      {/* Header */}
      <div style={{ background:G.hero, padding:"50px 18px 20px" }}>
        <div style={{ fontSize:20, fontWeight:900, color:C.white }}>Mes Commandes 📦</div>
        <div style={{ color:"rgba(255,255,255,.6)", fontSize:12, marginTop:2 }}>Suivi & Historique</div>
      </div>

      <div style={{ padding:"18px 18px 20px" }}>
        {/* Active tracking */}
        {ordered && (
          <div style={{ background:C.white, borderRadius:20, padding:18, marginBottom:20, border:`1px solid ${C.green}33`, boxShadow:`0 6px 24px rgba(27,122,62,.12)`, animation:"scaleIn .4s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:11, color:C.green, fontWeight:700, letterSpacing:1 }}>🟢 EN COURS</div>
                <div style={{ fontWeight:900, fontSize:15, color:C.dark, marginTop:2 }}>Commande #ZW-4022</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:900, fontSize:16, color:C.green }}>{step<3?`~${25-step*7} min`:"Livré! 🎉"}</div>
                <div style={{ color:C.gray4, fontSize:10 }}>Temps restant</div>
              </div>
            </div>
            <div style={{ position:"relative", marginBottom:14 }}>
              <div style={{ position:"absolute", left:13, top:14, bottom:14, width:2, background:C.gray2 }}/>
              <div style={{ position:"absolute", left:13, top:14, width:2, height:`${(step/3)*100}%`, background:G.main, transition:"height 1.2s ease" }}/>
              {TRACK_STEPS.map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:i<3?13:0, position:"relative" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:i<step?C.greenL:i===step?C.green:"rgba(0,0,0,.05)", border:i<step?`2px solid ${C.green}`:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, zIndex:1, color:i===step?C.white:C.dark, boxShadow:i===step?`0 0 14px rgba(27,122,62,.5)`:"none" }}>
                    {i<step?"✓":s.icon}
                  </div>
                  <div style={{ color:i<=step?C.dark:C.gray3, fontWeight:i===step?700:500, fontSize:13 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ height:76, borderRadius:14, background:C.greenL, border:`1px solid ${C.green}22`, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <span style={{ fontSize:22 }}>🗺️</span>
              <div><div style={{ fontSize:12, color:C.dark, fontWeight:600 }}>Suivi GPS en direct</div><div style={{ fontSize:10, color:C.green }}>Livreur : Dossou Anicet ★ 4.9</div></div>
            </div>
          </div>
        )}

        {/* History */}
        <div style={{ fontSize:12, fontWeight:700, color:C.gray4, marginBottom:11, letterSpacing:1 }}>HISTORIQUE</div>
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
          {ORDER_HIST.map(o => {
            const cat = CATEGORIES.find(c=>c.id===o.cat);
            return (
              <div key={o.id} style={{ background:C.white, borderRadius:18, padding:15, border:`1px solid ${C.gray2}`, boxShadow:"0 1px 6px rgba(0,0,0,.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                      <span style={{ fontSize:10, color:C.green, fontWeight:700 }}>{o.id}</span>
                      <span style={{ fontSize:10, background:C.greenL, color:C.green, padding:"1px 7px", borderRadius:8, fontWeight:700 }}>✓ {o.status}</span>
                    </div>
                    <div style={{ fontWeight:800, color:C.dark, fontSize:13 }}>{o.partner}</div>
                    <div style={{ color:C.gray4, fontSize:10, marginTop:1 }}>{cat?.icon} {cat?.label}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:900, fontSize:15, color:C.green }}>{fmt(o.total)} F</div>
                    <div style={{ color:C.gray3, fontSize:10 }}>{o.date}</div>
                  </div>
                </div>
                <div style={{ height:1, background:C.gray2, marginBottom:10 }}/>
                <div style={{ display:"flex", gap:8 }}>
                  <button style={{ flex:1, background:C.greenL, border:`1px solid ${C.green}33`, borderRadius:12, padding:"8px 0", color:C.green, fontSize:12, fontWeight:700, cursor:"pointer" }}>🔁 Recommander</button>
                  <button style={{ flex:1, background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:12, padding:"8px 0", color:C.gray4, fontSize:12, fontWeight:600, cursor:"pointer" }}>📄 Détails</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SEARCH TAB
═══════════════════════════════════════ */
function SearchTab({ onSelect }) {
  const [q, setQ] = useState("");
  const results = PARTNERS.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.sub.toLowerCase().includes(q.toLowerCase()) || p.items.some(i=>i.name.toLowerCase().includes(q.toLowerCase())));
  return (
    <div style={{ background:C.offW, paddingBottom:90 }}>
      <div style={{ background:G.hero, padding:"50px 18px 20px" }}>
        <div style={{ fontSize:20, fontWeight:900, color:C.white, marginBottom:12 }}>Rechercher 🔍</div>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, color:C.gray4 }}>🔍</span>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Plat, service, restaurant..."
            style={{ width:"100%", padding:"13px 14px 13px 44px", background:C.white, border:"none", borderRadius:16, color:C.dark, fontSize:13, outline:"none", boxShadow:"0 2px 12px rgba(0,0,0,.1)" }}/>
        </div>
      </div>
      <div style={{ padding:"18px 18px 0" }}>
        {!q && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, color:C.gray4, fontWeight:700, marginBottom:10, letterSpacing:1 }}>SERVICES POPULAIRES</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["Amiwo","Burger","Roses","Chocolat","Lavage","Courses","Colis","Gâteau"].map(t => (
                <button key={t} onClick={()=>setQ(t)} style={{ padding:"7px 15px", borderRadius:30, border:`1px solid ${C.gray2}`, background:C.white, color:C.gray4, fontSize:12, cursor:"pointer" }}>{t}</button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
          {results.map((p,i) => <PartnerCard key={p.id} p={p} idx={i} onSelect={onSelect}/>)}
          {q && !results.length && <div style={{ textAlign:"center", padding:"40px 0", color:C.gray4 }}>Aucun résultat pour "{q}" 😕</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PROFILE TAB
═══════════════════════════════════════ */
function ProfileTab({ onBO }) {
  const items = [
    {icon:"📍", label:"Mes adresses",      sub:"Cadjehoun, Cotonou"        },
    {icon:"💳", label:"Paiement",           sub:"MTN MoMo · ●●●● 1234"     },
    {icon:"🔔", label:"Notifications",      sub:"Activées"                  },
    {icon:"🎁", label:"Mes codes promo",    sub:"1 code actif · ZEWA20"     },
    {icon:"⭐", label:"Mes avis",           sub:"8 avis donnés"             },
    {icon:"💬", label:"Support client",     sub:"Chat & Téléphone 24h/7j"   },
    {icon:"🖥", label:"Administration",     sub:"Gérer la plateforme",       click:onBO, hi:true },
    {icon:"⚙️", label:"Paramètres",         sub:"Langue, sécurité, compte"  },
    {icon:"🚪", label:"Déconnexion",        sub:"",                          danger:true },
  ];
  return (
    <div style={{ background:C.offW, paddingBottom:90 }}>
      {/* Header */}
      <div style={{ background:G.hero, padding:"50px 18px 30px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-20, top:-20, width:130, height:130, borderRadius:"50%", background:"rgba(245,197,24,.1)" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:G.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, boxShadow:`0 6px 20px rgba(245,197,24,.4)` }}>👤</div>
          <div>
            <div style={{ fontWeight:900, fontSize:19, color:C.white }}>Kofi Mensah</div>
            <div style={{ color:"rgba(255,255,255,.7)", fontSize:12 }}>+229 97 00 11 22</div>
            <div style={{ marginTop:5, display:"inline-flex", alignItems:"center", gap:4, background:"rgba(245,197,24,.2)", border:"1px solid rgba(245,197,24,.4)", padding:"3px 12px", borderRadius:20 }}>
              <span style={{ color:C.yellow, fontSize:11, fontWeight:700 }}>⭐ Client Gold</span>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, margin:"16px 16px 0" }}>
        {[["18","Commandes"],["4.8","Note"],["5 200 F","Économisés"]].map(([v,l]) => (
          <div key={l} style={{ background:C.white, borderRadius:14, padding:"12px 8px", textAlign:"center", border:`1px solid ${C.gray2}` }}>
            <div style={{ fontWeight:900, fontSize:17, color:C.green }}>{v}</div>
            <div style={{ color:C.gray3, fontSize:10, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Menu */}
      <div style={{ padding:"14px 16px 20px" }}>
        {items.map(it => (
          <div key={it.label} onClick={it.click} style={{ background:C.white, borderRadius:16, padding:"13px 14px", marginBottom:9, display:"flex", alignItems:"center", gap:12, cursor:it.click?"pointer":"default", border:it.hi?`1px solid ${C.green}44`:it.danger?`1px solid rgba(229,57,53,.2)`:`1px solid ${C.gray2}`, boxShadow:"0 1px 4px rgba(0,0,0,.03)" }}>
            <div style={{ width:40, height:40, borderRadius:12, flexShrink:0, background:it.hi?C.greenL:it.danger?"rgba(229,57,53,.1)":C.gray1, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:it.hi?`0 3px 10px rgba(27,122,62,.2)`:"none" }}>{it.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, color:it.hi?C.green:it.danger?C.danger:C.dark, fontSize:13 }}>{it.label}</div>
              {it.sub && <div style={{ color:C.gray4, fontSize:11, marginTop:1 }}>{it.sub}</div>}
            </div>
            <span style={{ color:C.gray3, fontSize:16 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN / BACK OFFICE
═══════════════════════════════════════ */
function AdminPanel({ onBack }) {
  const [tab, setTab] = useState("dash");
  const [editPartner, setEditPartner] = useState(null);
  const [partners, setPartners] = useState(PARTNERS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPartner, setNewPartner] = useState({ name:"", cat:"food", sub:"", fee:300 });

  const BO_TABS = [
    {id:"dash",      icon:"📊", label:"Dashboard"   },
    {id:"partners",  icon:"🏪", label:"Partenaires" },
    {id:"orders",    icon:"🛒", label:"Commandes"   },
    {id:"riders",    icon:"🏍️", label:"Livreurs"    },
    {id:"promo",     icon:"🎁", label:"Promos"      },
    {id:"finance",   icon:"💰", label:"Finances"    },
  ];

  const ORDERS_BO = [
    {id:"#ZW-4025", cust:"Fatoumata D.",  partner:"Chez Mama Afrique",   total:5200, status:"En livraison", time:"14:38", rider:"Dossou A."},
    {id:"#ZW-4024", cust:"Rodrigue A.",   partner:"FreshMart Express",   total:8300, status:"Préparation",  time:"14:31", rider:"—"},
    {id:"#ZW-4023", cust:"Brice H.",      partner:"LavoExpress",         total:5500, status:"Livré",        time:"14:10", rider:"Kpodo F."},
    {id:"#ZW-4022", cust:"Kofi M.",       partner:"Jardins d'Afrique",   total:8500, status:"Livré",        time:"12:30", rider:"Agossa M."},
    {id:"#ZW-4021", cust:"Aïcha T.",      partner:"Cacao Royale",        total:4500, status:"Annulé",       time:"11:55", rider:"—"},
  ];
  const SS = {
    "En livraison":{ bg:"rgba(27,122,62,.1)",  col:C.green   },
    "Préparation": { bg:"rgba(245,127,23,.1)",  col:C.warn    },
    "Livré":       { bg:"rgba(27,122,62,.1)",   col:C.ok      },
    "Annulé":      { bg:"rgba(229,57,53,.1)",   col:C.danger  },
  };

  return (
    <div style={{ position:"absolute", inset:0, background:C.offW, display:"flex", flexDirection:"column", zIndex:700 }}>
      {/* Header */}
      <div style={{ background:G.hero, padding:"50px 16px 0", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <Logo size={28}/>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ display:"flex", gap:5, alignItems:"center", background:"rgba(245,197,24,.2)", border:"1px solid rgba(245,197,24,.4)", borderRadius:20, padding:"4px 12px" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:C.yellow, animation:"dotPulse 1.5s ease-in-out infinite" }}/>
              <span style={{ color:C.yellow, fontSize:11, fontWeight:700 }}>Système OK</span>
            </div>
            <button onClick={onBack} style={{ background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.3)", borderRadius:10, padding:"6px 12px", color:C.white, fontSize:11, fontWeight:700, cursor:"pointer" }}>← App</button>
          </div>
        </div>
        <div style={{ display:"flex", overflowX:"auto", scrollbarWidth:"none", paddingBottom:0 }}>
          {BO_TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"9px 12px", background:"none", color:tab===t.id?C.yellow:"rgba(255,255,255,.5)", fontWeight:tab===t.id?700:500, fontSize:11, borderBottom:tab===t.id?`2px solid ${C.yellow}`:"2px solid transparent", whiteSpace:"nowrap", transition:"all .2s", border:"none", cursor:"pointer" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 30px" }}>

        {/* DASHBOARD */}
        {tab==="dash" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ fontWeight:900, fontSize:17, color:C.dark, marginBottom:3 }}>Tableau de Bord</div>
            <div style={{ color:C.gray4, fontSize:11, marginBottom:14 }}>Live · {new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11, marginBottom:18 }}>
              {[["📦","428","+22%","Commandes",C.green],["💰","₣2.1M","+15%","Revenus",C.green],["🏪","10/10","actifs","Partenaires",C.warn],["⭐","4.82★","Excellent","Satisfaction",C.yellow]].map(([ic,v,sub,l,col]) => (
                <div key={l} style={{ background:C.white, borderRadius:18, padding:14, border:`1px solid ${col}22`, boxShadow:`0 2px 12px rgba(0,0,0,.05)` }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{ic}</div>
                  <div style={{ fontWeight:900, fontSize:20, color:col }}>{v}</div>
                  <div style={{ color:C.dark, fontWeight:700, fontSize:10, marginTop:2 }}>{l}</div>
                  <div style={{ color:C.gray4, fontSize:9, marginTop:1 }}>{sub}</div>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div style={{ fontWeight:700, color:C.dark, fontSize:13, marginBottom:9 }}>Activité hebdomadaire</div>
            <div style={{ background:C.white, borderRadius:16, padding:14, marginBottom:16, border:`1px solid ${C.gray2}` }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:70, marginBottom:8 }}>
                {[50,68,42,95,78,100,88].map((h,i) => (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{ width:"100%", height:h*.65, borderRadius:"6px 6px 0 0", background:i===5?G.main:`${C.green}${Math.round(20+h/2).toString(16)}`, position:"relative" }}>
                      {i===5 && <div style={{ position:"absolute", top:-15, left:"50%", transform:"translateX(-50%)", fontSize:7, color:C.green, fontWeight:900, whiteSpace:"nowrap" }}>MAX</div>}
                    </div>
                    <span style={{ fontSize:7, color:C.gray4 }}>{"LMMJVSD"[i]}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:9, color:C.gray4 }}>Min: 42 cmd</span>
                <span style={{ fontSize:9, color:C.green, fontWeight:700 }}>Max: 428 (ven.)</span>
              </div>
            </div>
            {/* Categories breakdown */}
            <div style={{ fontWeight:700, color:C.dark, fontSize:13, marginBottom:9 }}>Commandes par catégorie</div>
            {[["🍽️","Restaurants","45%",0.45],["🛒","Supermarché","20%",0.20],["👕","Laverie","12%",0.12],["💐","Fleuriste","9%",0.09],["🏍️","Coursier","8%",0.08]].map(([ic,l,pct,ratio]) => (
              <div key={l} style={{ background:C.white, borderRadius:12, padding:"10px 14px", marginBottom:7, border:`1px solid ${C.gray2}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:12, color:C.dark, fontWeight:600 }}>{ic} {l}</span>
                  <span style={{ fontSize:12, color:C.green, fontWeight:700 }}>{pct}</span>
                </div>
                <div style={{ height:5, background:C.gray2, borderRadius:3, overflow:"hidden" }}>
                  <div style={{ width:`${ratio*100}%`, height:"100%", background:G.main, borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PARTNERS */}
        {tab==="partners" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontWeight:900, fontSize:17, color:C.dark }}>Partenaires ({partners.length})</div>
              <button onClick={()=>setShowAddForm(true)} style={{ background:G.main, color:C.white, padding:"7px 14px", borderRadius:16, fontWeight:700, fontSize:12, border:"none", cursor:"pointer", boxShadow:`0 3px 12px rgba(27,122,62,.35)` }}>+ Ajouter</button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div style={{ background:C.white, borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${C.green}44`, boxShadow:`0 4px 16px rgba(27,122,62,.1)` }}>
                <div style={{ fontWeight:700, color:C.green, fontSize:13, marginBottom:12 }}>➕ Nouveau partenaire</div>
                {[["Nom","text","name","Nom du partenaire"],["Description","text","sub","Courte description"]].map(([l,t,k,ph]) => (
                  <div key={k} style={{ marginBottom:10 }}>
                    <div style={{ fontSize:11, color:C.gray4, fontWeight:600, marginBottom:4 }}>{l}</div>
                    <input value={newPartner[k]} onChange={e=>setNewPartner(p=>({...p,[k]:e.target.value}))} placeholder={ph}
                      style={{ width:"100%", padding:"9px 12px", background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:11, fontSize:12, color:C.dark, outline:"none" }}/>
                  </div>
                ))}
                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:11, color:C.gray4, fontWeight:600, marginBottom:4 }}>Catégorie</div>
                  <select value={newPartner.cat} onChange={e=>setNewPartner(p=>({...p,cat:e.target.value}))}
                    style={{ width:"100%", padding:"9px 12px", background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:11, fontSize:12, color:C.dark, outline:"none" }}>
                    {CATEGORIES.filter(c=>c.id!=="all").map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>{setShowAddForm(false);}} style={{ flex:1, padding:"9px 0", background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:11, color:C.gray4, fontSize:12, fontWeight:700, cursor:"pointer" }}>Annuler</button>
                  <button onClick={()=>{setShowAddForm(false);}} style={{ flex:2, padding:"9px 0", background:G.main, color:C.white, border:"none", borderRadius:11, fontSize:12, fontWeight:700, cursor:"pointer" }}>✓ Enregistrer</button>
                </div>
              </div>
            )}

            {partners.map(p => {
              const cat = CATEGORIES.find(c=>c.id===p.cat);
              return (
                <div key={p.id} style={{ background:C.white, borderRadius:16, padding:14, marginBottom:10, border:`1px solid ${C.gray2}`, boxShadow:"0 1px 6px rgba(0,0,0,.04)" }}>
                  <div style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                    <div style={{ width:48, height:48, borderRadius:12, background:`${p.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{p.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ fontWeight:800, color:C.dark, fontSize:13 }}>{p.name}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:p.open?C.ok:C.danger }}/>
                          <span style={{ fontSize:10, fontWeight:700, color:p.open?C.ok:C.danger }}>{p.open?"Ouvert":"Fermé"}</span>
                        </div>
                      </div>
                      <div style={{ color:C.gray4, fontSize:10, marginTop:1 }}>{cat?.icon} {cat?.label} · ★ {p.rating} · {p.items.length} articles</div>
                      <div style={{ display:"flex", gap:8, marginTop:8 }}>
                        <button onClick={()=>setEditPartner(p)} style={{ flex:1, padding:"6px 0", background:C.greenL, border:`1px solid ${C.green}33`, borderRadius:10, color:C.green, fontSize:11, fontWeight:700, cursor:"pointer" }}>✏️ Modifier</button>
                        <button style={{ flex:1, padding:"6px 0", background:"rgba(229,57,53,.08)", border:"1px solid rgba(229,57,53,.2)", borderRadius:10, color:C.danger, fontSize:11, fontWeight:700, cursor:"pointer" }}>🗑️ Supprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ORDERS */}
        {tab==="orders" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ fontWeight:900, fontSize:17, color:C.dark, marginBottom:13 }}>Commandes en direct</div>
            <div style={{ display:"flex", gap:8, marginBottom:13 }}>
              {[["En livraison","2",C.green],["Préparation","1",C.warn],["Aujourd'hui","428",C.ok]].map(([l,v,col]) => (
                <div key={l} style={{ flex:1, background:C.white, border:`1px solid ${col}22`, borderRadius:11, padding:"8px 6px", textAlign:"center" }}>
                  <div style={{ fontWeight:900, fontSize:16, color:col }}>{v}</div>
                  <div style={{ fontSize:9, color:C.gray4, marginTop:1 }}>{l}</div>
                </div>
              ))}
            </div>
            {ORDERS_BO.map(o => { const s=SS[o.status]; return (
              <div key={o.id} style={{ background:C.white, borderRadius:16, padding:14, marginBottom:9, border:`1px solid ${C.gray2}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div>
                    <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:4 }}>
                      <span style={{ color:C.green, fontWeight:800, fontSize:11 }}>{o.id}</span>
                      <div style={{ background:s.bg, borderRadius:15, padding:"2px 8px", display:"flex", alignItems:"center", gap:3 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:s.col }}/>
                        <span style={{ color:s.col, fontSize:9, fontWeight:700 }}>{o.status}</span>
                      </div>
                    </div>
                    <div style={{ fontWeight:700, color:C.dark, fontSize:13 }}>{o.cust}</div>
                    <div style={{ color:C.gray4, fontSize:10 }}>🏪 {o.partner} · 🏍 {o.rider} · {o.time}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:900, color:C.green, fontSize:14 }}>{fmt(o.total)} F</div>
                  </div>
                </div>
              </div>
            );})}
          </div>
        )}

        {/* RIDERS */}
        {tab==="riders" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
              <div style={{ fontWeight:900, fontSize:17, color:C.dark }}>Livreurs ({RIDERS.length})</div>
              <button style={{ background:G.main, color:C.white, padding:"7px 14px", borderRadius:16, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>+ Recruter</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:14 }}>
              {[["5","Total",C.dark],["4","Actifs",C.ok],["1","En pause",C.warn]].map(([v,l,col]) => (
                <div key={l} style={{ background:C.white, borderRadius:12, padding:11, textAlign:"center", border:`1px solid ${C.gray2}` }}>
                  <div style={{ fontWeight:900, fontSize:18, color:col }}>{v}</div>
                  <div style={{ color:C.gray3, fontSize:9 }}>{l}</div>
                </div>
              ))}
            </div>
            {RIDERS.map(r => (
              <div key={r.name} style={{ background:C.white, borderRadius:16, padding:14, marginBottom:10, border:`1px solid ${C.gray2}` }}>
                <div style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:C.greenL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{r.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <div style={{ fontWeight:800, color:C.dark, fontSize:13 }}>{r.name}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:4, background:r.status==="Actif"?"rgba(27,122,62,.08)":"rgba(245,127,23,.08)", borderRadius:15, padding:"2px 8px" }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:r.status==="Actif"?C.ok:C.warn }}/>
                        <span style={{ color:r.status==="Actif"?C.ok:C.warn, fontSize:9, fontWeight:700 }}>{r.status}</span>
                      </div>
                    </div>
                    <div style={{ color:C.gray4, fontSize:10, marginTop:1 }}>📍 {r.zone}</div>
                    <div style={{ display:"flex", gap:12, marginTop:6 }}>
                      <span style={{ color:C.green, fontWeight:700, fontSize:11 }}>📦 {r.orders} cmd/j</span>
                      <span style={{ color:C.warn, fontWeight:700, fontSize:11 }}>★ {r.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROMOS */}
        {tab==="promo" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontWeight:900, fontSize:17, color:C.dark }}>Codes Promo</div>
              <button style={{ background:G.gold, color:C.dark, padding:"7px 14px", borderRadius:16, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>+ Créer</button>
            </div>
            {[{code:"ZEWA20",desc:"−20% première commande",uses:234,max:500,active:true},{code:"FREELIV",desc:"Livraison gratuite >5000F",uses:891,max:null,active:true},{code:"EXPRESS",desc:"Coursier prioritaire",uses:45,max:100,active:false}].map(p => (
              <div key={p.code} style={{ background:C.white, borderRadius:16, padding:15, marginBottom:10, border:`1px solid ${C.gray2}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div>
                    <div style={{ fontWeight:900, fontSize:14, color:C.dark, letterSpacing:1 }}>{p.code}</div>
                    <div style={{ color:C.gray4, fontSize:11, marginTop:2 }}>{p.desc}</div>
                  </div>
                  <div style={{ background:p.active?C.greenL:"rgba(229,57,53,.1)", border:`1px solid ${p.active?C.green+"44":"rgba(229,57,53,.3)"}`, borderRadius:10, padding:"3px 10px" }}>
                    <span style={{ color:p.active?C.green:C.danger, fontSize:10, fontWeight:700 }}>{p.active?"Actif":"Inactif"}</span>
                  </div>
                </div>
                <div style={{ fontSize:11, color:C.gray4 }}>Utilisé {p.uses} fois{p.max?` / max ${p.max}`:""}</div>
                {p.max && <div style={{ height:5, background:C.gray2, borderRadius:3, marginTop:6, overflow:"hidden" }}><div style={{ width:`${(p.uses/p.max)*100}%`, height:"100%", background:G.main, borderRadius:3 }}/></div>}
              </div>
            ))}
          </div>
        )}

        {/* FINANCES */}
        {tab==="finance" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            <div style={{ fontWeight:900, fontSize:17, color:C.dark, marginBottom:3 }}>Finances</div>
            <div style={{ color:C.gray4, fontSize:11, marginBottom:14 }}>Mars 2026</div>
            <div style={{ background:G.main, borderRadius:20, padding:"20px 18px", marginBottom:16, boxShadow:`0 8px 28px rgba(27,122,62,.4)`, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", right:-10, top:-10, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,.08)" }}/>
              <div style={{ color:"rgba(255,255,255,.8)", fontSize:11, marginBottom:4 }}>Revenus ce mois</div>
              <div style={{ fontWeight:900, fontSize:30, color:C.white }}>₣ 2 147 500</div>
              <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, marginTop:4 }}>↑ +28% vs Février</div>
            </div>
            {[["Commissions partenaires (18%)","1 247 500 FCFA",C.green],["Frais de livraison","612 000 FCFA",C.yellow],["Abonnements partenaires","288 000 FCFA","#6A1B9A"]].map(([l,v,col]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.white, borderRadius:12, padding:"12px 14px", marginBottom:7, border:`1px solid ${C.gray2}` }}>
                <span style={{ color:C.gray4, fontSize:11 }}>{l}</span>
                <span style={{ fontWeight:800, color:col, fontSize:12 }}>{v}</span>
              </div>
            ))}
            <div style={{ fontWeight:700, color:C.dark, fontSize:13, marginTop:14, marginBottom:10 }}>Paiements Livreurs — MTN MoMo</div>
            {RIDERS.map(r => (
              <div key={r.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.white, borderRadius:12, padding:"11px 14px", marginBottom:7, border:`1px solid ${C.gray2}` }}>
                <div>
                  <div style={{ fontWeight:700, color:C.dark, fontSize:12 }}>{r.name}</div>
                  <div style={{ color:C.gray4, fontSize:10 }}>{r.orders} livraisons · ★ {r.rating}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontWeight:800, color:C.green, fontSize:13 }}>{fmt(r.orders*1500)} F</div>
                  <button style={{ fontSize:10, color:C.yellow, fontWeight:700, background:"none", border:"none", cursor:"pointer" }}>💛 Payer MoMo →</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Edit Partner Modal */}
      {editPartner && (
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.5)", zIndex:800, display:"flex", alignItems:"flex-end" }}>
          <div style={{ background:C.white, borderRadius:"24px 24px 0 0", width:"100%", padding:"20px 18px 32px", animation:"sheetUp .3s ease" }}>
            <div style={{ fontWeight:900, fontSize:16, color:C.dark, marginBottom:14 }}>✏️ Modifier : {editPartner.name}</div>
            {[["Nom","name"],["Description","sub"]].map(([l,k]) => (
              <div key={k} style={{ marginBottom:11 }}>
                <div style={{ fontSize:11, color:C.gray4, fontWeight:600, marginBottom:4 }}>{l}</div>
                <input defaultValue={editPartner[k]} style={{ width:"100%", padding:"9px 12px", background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:11, fontSize:12, color:C.dark, outline:"none" }}/>
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <button onClick={()=>setEditPartner(null)} style={{ flex:1, padding:"11px 0", background:C.gray1, border:`1px solid ${C.gray2}`, borderRadius:14, color:C.gray4, fontSize:13, fontWeight:700, cursor:"pointer" }}>Annuler</button>
              <button onClick={()=>setEditPartner(null)} style={{ flex:2, padding:"11px 0", background:G.main, color:C.white, border:"none", borderRadius:14, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 14px rgba(27,122,62,.4)` }}>✓ Sauvegarder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   APP ROOT
═══════════════════════════════════════ */
export default function App() {
  const [splash, setSplash] = useState(true);
  const [tab, setTab]       = useState("home");
  const [partner, setPartner] = useState(null);
  const [cart, setCart]     = useState({});
  const [allItems, setAllItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [ordered, setOrdered]   = useState(false);
  const [step, setStep]         = useState(0);
  const [q, setQ]               = useState("");
  const [cat, setCat]           = useState("all");
  const [promoIdx, setPromoIdx] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => { setTimeout(() => setSplash(false), 2800); }, []);
  useEffect(() => { const t = setInterval(() => setPromoIdx(i => (i+1)%PROMOS.length), 3800); return () => clearInterval(t); }, []);
  useEffect(() => {
    if (ordered) {
      setStep(0);
      stepRef.current = setInterval(() => {
        setStep(s => { if(s<3){return s+1;} clearInterval(stepRef.current); return s; });
      }, 2500);
      return () => clearInterval(stepRef.current);
    }
  }, [ordered]);

  const cartCount = Object.values(cart).reduce((s,v)=>s+v,0);
  const cartTotal = allItems.reduce((s,i)=>s+i.price*(cart[i.id]||0),0);

  const addItem = useCallback((item) => {
    setCart(p => ({...p,[item.id]:(p[item.id]||0)+1}));
    setAllItems(p => p.find(i=>i.id===item.id)?p:[...p,item]);
  },[]);

  const removeItem = useCallback((id) => {
    setCart(p => {
      const nv=(p[id]||0)-1;
      if(nv<=0){const n={...p};delete n[id];return n;}
      return{...p,[id]:nv};
    });
  },[]);

  const placeOrder = () => {
    setCart({}); setAllItems([]); setShowCart(false);
    setOrdered(true); setStep(0); setTab("orders");
  };

  if (splash) return (
    <div style={{ width:"100%", maxWidth:430, margin:"0 auto", height:"100vh", background:G.hero, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInX{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes dotPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5);opacity:.5}}
        @keyframes barFill{from{width:0}to{width:100%}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes popIn{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
        @keyframes ring{0%{transform:scale(.4);opacity:.8}100%{transform:scale(2.6);opacity:0}}
      `}</style>
      {/* Adinkra bg pattern */}
      <div style={{ position:"absolute", opacity:.06 }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          {[0,60,120,180,240,300].map((y,i) => [0,60,120,180,240,300].map((x,j) => (
            <polygon key={`${i}-${j}`} points={`${x+30},${y} ${x+60},${y+15} ${x+60},${y+45} ${x+30},${y+60} ${x},${y+45} ${x},${y+15}`} fill="none" stroke="white" strokeWidth="1"/>
          )))}
        </svg>
      </div>
      {/* Rings */}
      {[1,2,3].map(i => <div key={i} style={{ position:"absolute", width:80+i*120, height:80+i*120, borderRadius:"50%", border:`1px solid rgba(245,197,24,${.15-i*.04})`, animation:`ring ${1.8+i*.5}s ease-out infinite`, animationDelay:`${i*.3}s` }}/>)}
      <div style={{ animation:"popIn .7s cubic-bezier(.34,1.56,.64,1) both, floatY 3s ease-in-out 1s infinite", zIndex:2 }}>
        <Logo size={80}/>
      </div>
      <div style={{ animation:"cardIn .6s ease .5s both", marginTop:20, color:"rgba(255,255,255,.5)", fontSize:12, letterSpacing:4, zIndex:2 }}>RAPIDE · FIABLE · BÉNINOIS</div>
      <div style={{ animation:"cardIn .6s ease .8s both", fontSize:28, marginTop:8, zIndex:2 }}>🇧🇯</div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4, background:"rgba(255,255,255,.1)" }}>
        <div style={{ height:"100%", background:G.gold, animation:"barFill 2.5s ease-out both", borderRadius:2 }}/>
      </div>
    </div>
  );

  return (
    <div style={{ width:"100%", maxWidth:430, margin:"0 auto", height:"100vh", background:C.offW, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(27,122,62,.3);border-radius:2px}
        input,button,select{font-family:inherit}
        @keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInX{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes dotPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5);opacity:.5}}
      `}</style>

      {/* Admin panel */}
      {showAdmin && <AdminPanel onBack={() => setShowAdmin(false)}/>}

      {/* Cart */}
      {showCart && (
        <CartSheet cart={cart} allItems={allItems} onClose={()=>setShowCart(false)}
          onAdd={addItem} onRemove={removeItem} onOrder={placeOrder} onClear={()=>{setCart({});setAllItems([]);}}/>
      )}

      {/* Partner detail */}
      {partner && tab==="home" && (
        <PartnerDetail p={partner} cart={cart} onAdd={addItem} onRemove={removeItem} onBack={()=>setPartner(null)}/>
      )}

      {/* Floating cart */}
      {!showCart && !partner && !showAdmin && cartCount>0 && (
        <div style={{ position:"absolute", bottom:80, left:16, right:16, zIndex:200, animation:"cardIn .35s ease" }}>
          <button onClick={()=>setShowCart(true)} style={{ width:"100%", padding:"14px 20px", borderRadius:20, background:G.main, boxShadow:`0 10px 30px rgba(27,122,62,.45)`, display:"flex", alignItems:"center", justifyContent:"space-between", border:"none", cursor:"pointer" }}>
            <div style={{ background:"rgba(255,255,255,.3)", borderRadius:10, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:C.white, fontSize:14 }}>{cartCount}</div>
            <span style={{ color:C.white, fontWeight:900, fontSize:15 }}>Voir mon panier</span>
            <span style={{ color:C.yellow, fontWeight:900, fontSize:14 }}>{fmt(cartTotal)} F</span>
          </button>
        </div>
      )}

      {/* Main screens */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
        {tab==="home"    && !partner && <HomeTab q={q} setQ={setQ} cat={cat} setCat={setCat} promoIdx={promoIdx} onSelect={p=>setPartner(p)}/>}
        {tab==="search"  && !partner && <SearchTab onSelect={p=>setPartner(p)}/>}
        {tab==="orders"  && <OrdersTab ordered={ordered} step={step}/>}
        {tab==="profile" && <ProfileTab onBO={()=>setShowAdmin(true)}/>}
      </div>

      {/* Bottom nav */}
      {!showAdmin && <BottomNav tab={tab} setTab={t=>{setTab(t);setPartner(null);}} cartCount={cartCount}/>}
    </div>
  );
}
