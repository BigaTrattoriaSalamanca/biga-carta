import { useState, useEffect, useCallback, useRef } from "react";

const LOGO_URL = "/mnt/user-data/uploads/LOGO_BIGA_TRATTORIA_MODERNA.png";

// ─── MENU DATA (Spanish only — translations auto-generated) ───
const MENU_DATA = [
  {cat:"antipasti",name:"Pane de Focaccia",desc:"Solo o con crema de queso azul",price:"3,5—4,5",extra:"",allergens:["gluten","lacteos","sulfitos"]},
  {cat:"antipasti",name:"Burrata",desc:"Pesto, albahaca y tomates cherrys",price:"9",extra:"",allergens:["lacteos","frutos_secos"]},
  {cat:"antipasti",name:"Pastrami de cabecero ibérico",desc:"Vinagreta de mostaza y encurtidos",price:"8",extra:"",allergens:["mostaza","sulfitos"]},
  {cat:"antipasti",name:"Grissini con guanciale",desc:"Queso curado rallado",price:"3",extra:"",allergens:["gluten","lacteos","sulfitos"]},
  {cat:"antipasti",name:"Ensalada de tomate",desc:"Con aliño de tomate",price:"9",extra:"Burrata +4,5 / Anchoas +12",allergens:["sulfitos"]},
  {cat:"antipasti",name:"Anchoa sobre focaccia",desc:"Tomates secos",price:"4",extra:"",allergens:["gluten","pescado","sulfitos"]},
  {cat:"antipasti",name:"Mortadela italiana DOC",desc:"Ralladura de lima y praliné de pistachos",price:"9",extra:"",allergens:["frutos_secos","sulfitos"]},
  {cat:"antipasti",name:"Ensalada César",desc:"Cogollos frescos, salsa césar casera, anchoas del cantábrico y queso curado",price:"13",extra:"",allergens:["gluten","lacteos","huevo","pescado","mostaza","sulfitos"]},
  {cat:"antipasti",name:"Berenjena escalivada",desc:"Stracciatella con pesto, tomate seco y avellanas",price:"12",extra:"",allergens:["lacteos","frutos_secos","sulfitos"]},

  {cat:"pasta",name:"Spaguetti Carbonara",desc:"Con la carbonara auténtica: queso curado, yema, guanciale y pimienta",price:"14",extra:"",allergens:["gluten","lacteos","huevo","sulfitos"]},
  {cat:"pasta",name:"Tagliatelli con polpette",desc:"En salsa arrabiatta",price:"14",extra:"",allergens:["gluten","huevo","apio","sulfitos"]},
  {cat:"pasta",name:"Caramella de gorgonzola",desc:"Gorgonzola y pera con salsa pesto",price:"15",extra:"",allergens:["gluten","lacteos","frutos_secos","sulfitos"]},
  {cat:"pasta",name:"Falso Risotto de puntalete",desc:"Con boletus y tartufata",price:"15",extra:"",allergens:["gluten","sulfitos"]},

  {cat:"pizza",name:"Margarita",desc:"Mozzarella, albahaca, tomate",price:"11",extra:"",allergens:["gluten","lacteos"]},
  {cat:"pizza",name:"Chorizo Picante",desc:"Chorizo ibérico picante, mozzarella, orégano y tomate",price:"15",extra:"",allergens:["gluten","lacteos","sulfitos"]},
  {cat:"pizza",name:"Stracciatella",desc:"Stracciatella, queso zamorano, albahaca y tomate",price:"14",extra:"",allergens:["gluten","lacteos"]},
  {cat:"pizza",name:"Anchoas",desc:"Anchoas del cantábrico, mozzarella y cebolla roja",price:"18",extra:"",allergens:["gluten","lacteos","pescado"]},
  {cat:"pizza",name:"Ibérica",desc:"Paleta ibérica, mozzarella y tomate",price:"17",extra:"",allergens:["gluten","lacteos","sulfitos"]},
  {cat:"pizza",name:"Barbacoa",desc:"Costilla ibérica con barbacoa casera, pepinillos, cebolla encurtida, cebolla crujiente y queso",price:"16",extra:"",allergens:["gluten","lacteos","mostaza","sulfitos"]},
  {cat:"pizza",name:"Alitas de Pollo",desc:"Alitas de pollo deshuesadas, limón, ajo, albahaca y queso",price:"14",extra:"",allergens:["gluten","lacteos"]},
  {cat:"pizza",name:"Carbonara",desc:"Champiñón, panceta ibérica adobada, queso ahumado y yema de huevo a baja temperatura",price:"15",extra:"",allergens:["gluten","lacteos","huevo","sulfitos"]},

  {cat:"dolci",name:"Pannacotta de vainilla",desc:"",price:"6",extra:"",allergens:["lacteos","huevo","sulfitos"]},
  {cat:"dolci",name:"Tiramisú",desc:"",price:"6",extra:"",allergens:["gluten","lacteos","huevo"]},
  {cat:"dolci",name:"Tarta de Nutella y Helado de Chocolate",desc:"",price:"7",extra:"",allergens:["gluten","lacteos","huevo","frutos_secos","soja"]},
  {cat:"dolci",name:"Limón Helado",desc:"",price:"6",extra:"",allergens:[]},
  {cat:"dolci",name:"Helados",desc:"Vainilla, chocolate o pistacho",price:"4",extra:"+2 bola extra",allergens:["lacteos","frutos_secos"]},
  {cat:"dolci",name:"Limoncello casero",desc:"",price:"6",extra:"",allergens:["sulfitos"]},

  {cat:"cockteles",name:"Aperol Spritz",desc:"Prosecco, aperol, soda",price:"6",extra:"",allergens:["sulfitos"]},
  {cat:"cockteles",name:"Negroni",desc:"Campari, ginebra, vermut rojo",price:"6",extra:"",allergens:["sulfitos"]},
  {cat:"cockteles",name:"Bellini",desc:"Prosecco, zumo de melocotón",price:"6",extra:"",allergens:["sulfitos"]},
  {cat:"cockteles",name:"Limoncello Spritz",desc:"Prosecco, limoncello, soda",price:"6",extra:"",allergens:["sulfitos"]},
  {cat:"cockteles",name:"Garibaldi",desc:"Campari, zumo de naranja",price:"6",extra:"",allergens:["sulfitos"]},
  {cat:"cockteles",name:"Hugo",desc:"Licor de flor de saúco, prosecco, soda y hoja de menta",price:"6",extra:"",allergens:["sulfitos"]},

  {cat:"vini",name:"Prosecco Valdo Extra Dry",desc:"Cuvée i Magredi — Veneto, Glera",price:"22",extra:"Copa 4€",allergens:["sulfitos"]},
  {cat:"vini",name:"Prosecco Valdo DOC Biologico",desc:"Veneto, Glera",price:"25",extra:"",allergens:["sulfitos"]},
  {cat:"vini",name:"Pinot Grigio BIO Campagnola",desc:"Veneto, Pinot Grigio",price:"19",extra:"Copa 3,3€",allergens:["sulfitos"]},
  {cat:"vini",name:"Soave San Michele Ca' Rugate",desc:"Veneto, Garganega",price:"29",extra:"",allergens:["sulfitos"]},
  {cat:"vini",name:"Merlot Castelfirmian DOC",desc:"Trentino Alto, Merlot",price:"22",extra:"Copa 4€",allergens:["sulfitos"]},
  {cat:"vini",name:"Lambrusco Grasparossa Villa Cialdini DOC",desc:"Emilia Romagna, Lambrusco",price:"20",extra:"Copa 3,6€",allergens:["sulfitos"]},
  {cat:"vini",name:"Negroamaro Santoro IGP",desc:"Puglia, Negroamaro",price:"18",extra:"Copa 3,3€",allergens:["sulfitos"]},
  {cat:"vini",name:"Nero d'Avola Feudo Arancio DOC",desc:"Sicilia, Nero d'Avola",price:"20",extra:"Copa 3,6€",allergens:["sulfitos"]},
  {cat:"vini",name:"Vermentino Cala Reale DOC",desc:"Sicilia, Vermentino",price:"21",extra:"",allergens:["sulfitos"]},
  {cat:"vini",name:"Grillo Feudo Arancio DOC",desc:"Sicilia, Grillo",price:"20",extra:"Copa 3,6€",allergens:["sulfitos"]},
  {cat:"vini",name:"Pinot Nero Antonutti DOC",desc:"Friuli Venezia Giulia, Pinot Nero",price:"30",extra:"",allergens:["sulfitos"]},
];

const CAT_ORDER = ["antipasti","pasta","pizza","dolci","cockteles","vini"];

const CAT_META = {
  antipasti:{title:"Antipasti",sub:"¿Empezamos con un buen antipasto?"},
  pasta:{title:"Pasta Fresca",sub:"Hecha a mano, cada día"},
  pizza:{title:"Pizza Napoletana",sub:"",note:"Dejamos reposar las masas durante más de tres días, luego la cocinamos en nuestro horno napolitano a 480° durante setenta segundos. El resultado: una pizza completamente natural, ligera y muy fácil de digerir."},
  dolci:{title:"Dolci della Casa",sub:"¡No te vayas sin probarlos!"},
  cockteles:{title:"Cócteles",sub:"Todos 6€"},
  vini:{title:"Vini Italiani",sub:""},
};

const UI_STRINGS = {
  es:{tagline:"Benvenuti a una auténtica trattoria moderna",filter:"Filtrar por alérgenos",footer1:"Todos nuestros platos los realizamos con productos de proximidad.",footer2:"Todo el producto de cerdo ibérico es de ARTURO SÁNCHEZ.",footer3:"Precios en euros con IVA incluido.",translating:"Traduciendo...",glass:"Copa"},
  en:{tagline:"Welcome to an authentic modern trattoria",filter:"Filter by allergens",footer1:"All our dishes are made with locally sourced products.",footer2:"All Iberian pork products are from ARTURO SÁNCHEZ.",footer3:"Prices in euros, VAT included.",translating:"Translating...",glass:"Glass"},
  fr:{tagline:"Bienvenue dans une authentique trattoria moderne",filter:"Filtrer par allergènes",footer1:"Tous nos plats sont préparés avec des produits de proximité.",footer2:"Tout le porc ibérique provient d'ARTURO SÁNCHEZ.",footer3:"Prix en euros, TVA incluse.",translating:"Traduction en cours...",glass:"Verre"},
  it:{tagline:"Benvenuti in un'autentica trattoria moderna",filter:"Filtra per allergeni",footer1:"Tutti i nostri piatti sono preparati con prodotti a km zero.",footer2:"Tutto il maiale iberico proviene da ARTURO SÁNCHEZ.",footer3:"Prezzi in euro, IVA inclusa.",translating:"Traduzione in corso...",glass:"Bicchiere"},
  pt:{tagline:"Bem-vindos a uma autêntica trattoria moderna",filter:"Filtrar por alérgenos",footer1:"Todos os nossos pratos são feitos com produtos de proximidade.",footer2:"Todo o porco ibérico é de ARTURO SÁNCHEZ.",footer3:"Preços em euros com IVA incluído.",translating:"Traduzindo...",glass:"Copo"},
};

const ALLERGEN_INFO = {
  gluten:{es:"Gluten",en:"Gluten",fr:"Gluten",it:"Glutine",pt:"Glúten",emoji:"🌾"},
  lacteos:{es:"Lácteos",en:"Dairy",fr:"Laitiers",it:"Latticini",pt:"Lácteos",emoji:"🥛"},
  huevo:{es:"Huevo",en:"Egg",fr:"Œuf",it:"Uovo",pt:"Ovo",emoji:"🥚"},
  pescado:{es:"Pescado",en:"Fish",fr:"Poisson",it:"Pesce",pt:"Peixe",emoji:"🐟"},
  frutos_secos:{es:"Frutos secos",en:"Nuts",fr:"Fruits à coque",it:"Frutta a guscio",pt:"Frutos secos",emoji:"🥜"},
  moluscos:{es:"Moluscos",en:"Mollusks",fr:"Mollusques",it:"Molluschi",pt:"Moluscos",emoji:"🦑"},
  soja:{es:"Soja",en:"Soy",fr:"Soja",it:"Soia",pt:"Soja",emoji:"🫘"},
  apio:{es:"Apio",en:"Celery",fr:"Céleri",it:"Sedano",pt:"Aipo",emoji:"🥬"},
  mostaza:{es:"Mostaza",en:"Mustard",fr:"Moutarde",it:"Senape",pt:"Mostarda",emoji:"🟡"},
  sesamo:{es:"Sésamo",en:"Sesame",fr:"Sésame",it:"Sesamo",pt:"Sésamo",emoji:"⚪"},
  sulfitos:{es:"Sulfitos",en:"Sulphites",fr:"Sulfites",it:"Solfiti",pt:"Sulfitos",emoji:"🍷"},
  altramuces:{es:"Altramuces",en:"Lupin",fr:"Lupin",it:"Lupini",pt:"Tremoços",emoji:"🌿"},
};

const LANG_NAMES = {en:"English",fr:"Français",it:"Italiano",pt:"Português"};

// ─── TRANSLATION ENGINE ───
async function translateBatch(items, targetLang) {
  const langName = LANG_NAMES[targetLang];
  const toTranslate = items.map((it, i) => `${i+1}. NAME: ${it.name}${it.desc ? `\nDESC: ${it.desc}` : ""}${it.extra ? `\nEXTRA: ${it.extra}` : ""}${it.note ? `\nNOTE: ${it.note}` : ""}${it.sub ? `\nSUB: ${it.sub}` : ""}`).join("\n\n");

  const prompt = `You are a professional restaurant menu translator. Translate the following Spanish restaurant menu items to ${langName}. Keep proper nouns (brand names, wine names, region names, grape varieties) unchanged. Keep it natural and appetizing.

For each item, return ONLY a JSON array (no markdown, no backticks) where each element has:
- "name": translated name (or original if it's a proper noun like wine names)
- "desc": translated description (empty string if none)
- "extra": translated extra info (empty string if none)
- "note": translated note (empty string if none)  
- "sub": translated subtitle (empty string if none)

Items to translate:
${toTranslate}

Return ONLY the JSON array, nothing else.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    const text = data.content.map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error("Translation error:", err);
    return null;
  }
}

// ─── COMPONENTS ───

function AllergenTag({ code, lang, highlight }) {
  const info = ALLERGEN_INFO[code];
  if (!info) return null;
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:3,
      fontSize:11,padding:"2px 8px",borderRadius:10,
      background: highlight ? "#FFF0F0" : "#F5F3EE",
      color: highlight ? "#E53935" : "#7A7A7A",
      fontWeight: highlight ? 600 : 400,
      transition:"all 0.2s",
    }}>
      {info.emoji} {info[lang] || info.es}
    </span>
  );
}

function MenuItem({ item, lang, translations, activeAllergens }) {
  const t = translations[lang]?.[item.name];
  const name = t?.name || item.name;
  const desc = t?.desc || (lang === "es" ? item.desc : item.desc);
  const extra = t?.extra || (lang === "es" ? item.extra : item.extra);
  const hasConflict = item.allergens.some(a => activeAllergens.has(a));

  if (hasConflict && activeAllergens.size > 0) return null;

  return (
    <div style={{
      padding:"16px 0",borderBottom:"1px solid #EDEBE6",
      animation:"fadeIn 0.3s ease",
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12,marginBottom:4}}>
        <span style={{fontWeight:600,fontSize:16,color:"#2C2C2C",letterSpacing:"-0.2px"}}>{name}</span>
        <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,color:"#78BE20",whiteSpace:"nowrap",flexShrink:0}}>
          {item.price}€
        </span>
      </div>
      {desc && <div style={{fontSize:14,color:"#7A7A7A",fontWeight:300,lineHeight:1.5}}>{desc}</div>}
      {extra && <div style={{fontSize:12,color:"#5a9a10",fontStyle:"italic",marginTop:4,fontWeight:500}}>{extra}</div>}
      {item.allergens.length > 0 && (
        <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>
          {item.allergens.map(a => (
            <AllergenTag key={a} code={a} lang={lang} highlight={activeAllergens.has(a)} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategorySection({ catKey, lang, translations, activeAllergens, catTranslations }) {
  const meta = CAT_META[catKey];
  const items = MENU_DATA.filter(i => i.cat === catKey);
  const ct = catTranslations[lang]?.[catKey];
  const title = ct?.title || meta.title;
  const sub = ct?.sub || (lang === "es" ? meta.sub : "");
  const note = ct?.note || (lang === "es" ? meta.note : "");

  const visibleItems = items.filter(item => {
    if (activeAllergens.size === 0) return true;
    return !item.allergens.some(a => activeAllergens.has(a));
  });

  if (visibleItems.length === 0) return null;

  return (
    <div style={{marginBottom:44}} id={`cat-${catKey}`}>
      <h2 style={{
        fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,
        color:"#78BE20",marginBottom:4,letterSpacing:"-0.5px",
      }}>{title}</h2>
      {sub && <p style={{fontFamily:"'Caveat',cursive",fontSize:16,color:"#B0B0B0",marginBottom:16}}>{sub}</p>}
      {note && (
        <div style={{
          fontFamily:"'Caveat',cursive",fontSize:15,color:"#7A7A7A",
          marginBottom:16,lineHeight:1.5,padding:"12px 16px",
          background:"rgba(120,190,32,0.06)",borderRadius:12,
          borderLeft:"3px solid #78BE20",
        }}>{note}</div>
      )}
      {items.map((item, i) => (
        <MenuItem key={i} item={item} lang={lang} translations={translations} activeAllergens={activeAllergens} />
      ))}
    </div>
  );
}

// ─── MAIN APP ───
export default function BigaMenu() {
  const [lang, setLang] = useState("es");
  const [translations, setTranslations] = useState({});
  const [catTranslations, setCatTranslations] = useState({});
  const [translating, setTranslating] = useState(false);
  const [activeAllergens, setActiveAllergens] = useState(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const translatingRef = useRef(new Set());

  const doTranslate = useCallback(async (targetLang) => {
    if (targetLang === "es" || translations[targetLang] || translatingRef.current.has(targetLang)) return;
    translatingRef.current.add(targetLang);
    setTranslating(true);

    // Translate menu items
    const itemsToTranslate = MENU_DATA.map(it => ({
      name: it.name, desc: it.desc, extra: it.extra,
    }));
    // Also translate category metadata
    const catItems = CAT_ORDER.map(k => ({
      name: CAT_META[k].title,
      desc: "",
      extra: "",
      note: CAT_META[k].note || "",
      sub: CAT_META[k].sub || "",
    }));

    const [menuResults, catResults] = await Promise.all([
      translateBatch(itemsToTranslate, targetLang),
      translateBatch(catItems, targetLang),
    ]);

    if (menuResults) {
      const map = {};
      MENU_DATA.forEach((item, i) => {
        if (menuResults[i]) map[item.name] = menuResults[i];
      });
      setTranslations(prev => ({ ...prev, [targetLang]: map }));
    }

    if (catResults) {
      const catMap = {};
      CAT_ORDER.forEach((k, i) => {
        if (catResults[i]) {
          catMap[k] = {
            title: catResults[i].name || CAT_META[k].title,
            sub: catResults[i].sub || "",
            note: catResults[i].note || "",
          };
        }
      });
      setCatTranslations(prev => ({ ...prev, [targetLang]: catMap }));
    }

    translatingRef.current.delete(targetLang);
    setTranslating(false);
  }, [translations]);

  const switchLang = useCallback((newLang) => {
    setLang(newLang);
    if (newLang !== "es") doTranslate(newLang);
  }, [doTranslate]);

  const toggleAllergen = useCallback((code) => {
    setActiveAllergens(prev => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code); else next.add(code);
      return next;
    });
  }, []);

  const usedAllergens = [...new Set(MENU_DATA.flatMap(i => i.allergens))].sort();
  const ui = UI_STRINGS[lang] || UI_STRINGS.es;

  return (
    <div style={{
      minHeight:"100vh",background:"#FDFBF7",
      fontFamily:"'DM Sans',sans-serif",color:"#2C2C2C",
      WebkitFontSmoothing:"antialiased",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
      `}</style>

      {/* HEADER */}
      <header style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(253,251,247,0.92)",
        backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        borderBottom:"1px solid #EDEBE6",padding:"12px 0",
      }}>
        <div style={{maxWidth:680,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#78BE20",letterSpacing:"-0.5px"}}>
            biga
          </div>
          <div style={{display:"flex",gap:4}}>
            {["es","en","fr","it","pt"].map(l => (
              <button key={l} onClick={() => switchLang(l)} style={{
                background: l===lang ? "#78BE20" : "none",
                color: l===lang ? "#fff" : "#7A7A7A",
                border: `1.5px solid ${l===lang ? "#78BE20" : "#EDEBE6"}`,
                borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:500,
                cursor:"pointer",textTransform:"uppercase",letterSpacing:0.5,
                fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
              }}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{textAlign:"center",padding:"44px 20px 28px",maxWidth:680,margin:"0 auto"}}>
        <div style={{
          fontFamily:"'Playfair Display',serif",fontSize:42,fontWeight:700,
          color:"#78BE20",letterSpacing:"-1px",lineHeight:1,marginBottom:8,
        }}>biga</div>
        <div style={{
          fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,
          letterSpacing:4,textTransform:"uppercase",color:"#B0B0B0",marginBottom:16,
        }}>TRATTORIA MODERNA</div>
        <p style={{fontFamily:"'Caveat',cursive",fontSize:20,color:"#7A7A7A"}}>{ui.tagline}</p>
      </div>

      {/* TRANSLATING INDICATOR */}
      {translating && (
        <div style={{
          textAlign:"center",padding:"8px 20px",
          animation:"pulse 1.5s infinite",
        }}>
          <span style={{
            display:"inline-flex",alignItems:"center",gap:8,
            fontSize:13,color:"#78BE20",fontWeight:500,
            background:"rgba(120,190,32,0.08)",padding:"6px 16px",borderRadius:20,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:"spin 1s linear infinite"}}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
            {ui.translating}
          </span>
        </div>
      )}

      {/* CATEGORY NAV */}
      <nav style={{
        maxWidth:680,margin:"0 auto",padding:"0 20px 16px",
        display:"flex",gap:8,overflowX:"auto",
        scrollbarWidth:"none",msOverflowStyle:"none",
      }}>
        {CAT_ORDER.map(k => {
          const ct = catTranslations[lang]?.[k];
          const title = ct?.title || CAT_META[k].title;
          return (
            <button key={k} onClick={() => document.getElementById(`cat-${k}`)?.scrollIntoView({behavior:"smooth",block:"start"})} style={{
              flexShrink:0,padding:"7px 16px",borderRadius:20,
              border:"1.5px solid #EDEBE6",background:"#fff",
              fontSize:13,fontWeight:500,color:"#7A7A7A",cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background="#78BE20"; e.target.style.color="#fff"; e.target.style.borderColor="#78BE20" }}
            onMouseLeave={e => { e.target.style.background="#fff"; e.target.style.color="#7A7A7A"; e.target.style.borderColor="#EDEBE6" }}
            >{title}</button>
          );
        })}
      </nav>

      {/* ALLERGEN FILTER */}
      <div style={{maxWidth:680,margin:"0 auto 8px",padding:"0 20px"}}>
        <button onClick={() => setFiltersOpen(!filtersOpen)} style={{
          display:"flex",alignItems:"center",gap:8,cursor:"pointer",
          padding:"12px 0",fontSize:14,fontWeight:500,color:"#7A7A7A",
          border:"none",background:"none",fontFamily:"'DM Sans',sans-serif",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transition:"transform 0.3s",transform:filtersOpen?"rotate(180deg)":"rotate(0deg)"}}>
            <path d="M3 4h18M7 9h10M10 14h4M11 19h2"/>
          </svg>
          {ui.filter}
          {activeAllergens.size > 0 && (
            <span style={{
              background:"#E53935",color:"#fff",borderRadius:"50%",
              width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:700,
            }}>{activeAllergens.size}</span>
          )}
        </button>
        {filtersOpen && (
          <div style={{display:"flex",flexWrap:"wrap",gap:8,paddingBottom:16,animation:"fadeIn 0.2s ease"}}>
            {usedAllergens.map(code => {
              const info = ALLERGEN_INFO[code];
              if (!info) return null;
              const isActive = activeAllergens.has(code);
              return (
                <button key={code} onClick={() => toggleAllergen(code)} style={{
                  display:"flex",alignItems:"center",gap:5,
                  padding:"6px 12px",borderRadius:20,
                  border:`1.5px solid ${isActive ? "#E53935" : "#EDEBE6"}`,
                  fontSize:12,fontWeight:500,cursor:"pointer",
                  background: isActive ? "#FFF5F5" : "#fff",
                  color: isActive ? "#E53935" : "#7A7A7A",
                  fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
                }}>
                  <span style={{fontSize:14}}>{info.emoji}</span>
                  {info[lang] || info.es}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* MENU */}
      <main style={{maxWidth:680,margin:"0 auto",padding:"0 20px 60px"}}>
        {CAT_ORDER.map(k => (
          <CategorySection
            key={k} catKey={k} lang={lang}
            translations={translations}
            catTranslations={catTranslations}
            activeAllergens={activeAllergens}
          />
        ))}
      </main>

      {/* FOOTER */}
      <footer style={{textAlign:"center",padding:"32px 20px 48px",maxWidth:680,margin:"0 auto",borderTop:"1px solid #EDEBE6"}}>
        <p style={{fontSize:12,color:"#B0B0B0",lineHeight:1.7}}>{ui.footer1}</p>
        <p style={{fontSize:12,color:"#7A7A7A",fontWeight:600,lineHeight:1.7}}>{ui.footer2}</p>
        <p style={{fontSize:12,color:"#B0B0B0",lineHeight:1.7}}>{ui.footer3}</p>
      </footer>
    </div>
  );
}
