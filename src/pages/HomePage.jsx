import { Button, ProduceCard } from '../components';
import './HomePage.css';

// Curated preview items for landing page showcase
const PREVIEW_PRODUCE = [
  {
    id: 'p1',
    title: 'Gotukola (Centella Asiatica)',
    localName: 'ගොටුකොළ / வல்லாரை',
    category: 'Leafy Greens',
    quantityKg: '6 kg batch',
    pricePerKg: 180,
    location: 'Kaduwela',
    distance: '1.2 km away',
    freshness: 'Harvested at 6 AM',
    grower: 'Nimali • Backyard Garden',
    emoji: '🌿',
  },
  {
    id: 'p2',
    title: 'Red Lady Papaya',
    localName: 'රතු පැපොල් / பப்பாளி',
    category: 'Fruits',
    quantityKg: '15 kg batch',
    pricePerKg: 220,
    location: 'Maharagama',
    distance: '2.4 km away',
    freshness: 'Tree Ripe Today',
    grower: 'Kamal • Home Garden',
    emoji: '🥭',
  },
  {
    id: 'p3',
    title: 'Jaffna Green Chillies',
    localName: 'අමු මිරිස් / பச்சை மிளகாய்',
    category: 'Spices',
    quantityKg: '8 kg batch',
    pricePerKg: 450,
    location: 'Gampaha',
    distance: '3.1 km away',
    freshness: 'Fresh Picked',
    grower: 'Ranjith • Backyard Plot',
    emoji: '🌶️',
  },
];

/**
 * Landing Page for GoviLink
 */
export default function HomePage() {
  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge-pill">
              <span className="badge badge-green">Sri Lanka Hyperlocal</span>
              <span>Direct 5–20 kg Farm-to-Table</span>
            </div>

            <h1 className="hero-title">
              Fresh Local Produce,{' '}
              <span className="hero-title-highlight">Direct From Backyard To Table</span>
            </h1>

            <p className="hero-description">
              Connecting Sri Lankan home-level growers and small-scale farmers having <strong>5–20 kg surplus harvests</strong> directly with nearby households, local eateries, and community buyers.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="hero-actions">
              <Button
                to="/post-harvest"
                variant="primary"
                size="lg"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                }
              >
                I Have Produce
              </Button>

              <Button
                to="/find-produce"
                variant="secondary"
                size="lg"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              >
                I Need Produce
              </Button>
            </div>

            {/* Key Value Metric Highlights */}
            <div className="hero-highlights-strip">
              <div className="highlight-item">
                <span className="highlight-icon">⚖️</span>
                <div className="highlight-text">
                  <h4>5–20 kg Focus</h4>
                  <p>Right-sized for home garden harvests</p>
                </div>
              </div>

              <div className="highlight-item">
                <span className="highlight-icon">📍</span>
                <div className="highlight-text">
                  <h4>1–5 km Radius</h4>
                  <p>Fresh pickups in your neighbourhood</p>
                </div>
              </div>

              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <div className="highlight-text">
                  <h4>Zero Intermediaries</h4>
                  <p>Fair price for grower & local buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SRI LANKAN PROBLEM & SOLUTION */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Why GoviLink?</span>
            <h2>Solving Sri Lanka's Small-Harvest Dilemma</h2>
            <p>
              Millions of home growers across Sri Lanka produce top-quality, organic crops in quantities that traditional supply chains ignore.
            </p>
          </div>

          <div className="problem-solution-grid">
            {/* The Problem */}
            <div className="problem-card">
              <div className="problem-header">
                <div className="problem-icon-wrap">⚠️</div>
                <h3 className="problem-title">The Traditional Challenge</h3>
              </div>

              <ul className="problem-list">
                <li className="problem-list-item">
                  <span className="problem-bullet-cross">✕</span>
                  <div>
                    <strong>Too small for wholesale markets:</strong> Large economic centres (Dambulla, Manning, Meegoda) cater to 500+ kg consignments. A 10 kg harvest is impractical to transport.
                  </div>
                </li>
                <li className="problem-list-item">
                  <span className="problem-bullet-cross">✕</span>
                  <div>
                    <strong>High post-harvest spoilage:</strong> Surplus fruits and vegetables from home gardens often rot or get discarded because finding local buyers quickly is difficult.
                  </div>
                </li>
                <li className="problem-list-item">
                  <span className="problem-bullet-cross">✕</span>
                  <div>
                    <strong>Expensive middleman markups:</strong> Nearby consumers pay inflated prices at retail stalls for produce that travelled hundreds of kilometres and lost freshness.
                  </div>
                </li>
              </ul>
            </div>

            {/* The GoviLink Solution */}
            <div className="solution-card">
              <div className="solution-header">
                <div className="solution-icon-wrap">✅</div>
                <h3 className="solution-title">The GoviLink Solution</h3>
              </div>

              <ul className="solution-list">
                <li className="solution-list-item">
                  <span className="solution-bullet-check">✓</span>
                  <div>
                    <strong>Designed for 5–20 kg batches:</strong> Purpose-built for home gardens, rooftop plots, and small backyard growers to easily list their seasonal yield.
                  </div>
                </li>
                <li className="solution-list-item">
                  <span className="solution-bullet-check">✓</span>
                  <div>
                    <strong>Hyperlocal neighbourhood discovery:</strong> Connect with families, boarding houses, local kaddes, and small restaurants within 1–5 km.
                  </div>
                </li>
                <li className="solution-list-item">
                  <span className="solution-bullet-check">✓</span>
                  <div>
                    <strong>Hours-fresh farm-to-table:</strong> Buyers receive freshly harvested produce on the same day at fair rates, supporting the local community.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Simple & Direct</span>
            <h2>How GoviLink Works</h2>
            <p>No complex logistics. Just straightforward neighbourhood connections.</p>
          </div>

          <div className="grid-3">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3 className="step-title">Grower Lists 5–20 kg</h3>
              <p className="step-desc">
                Harvested papayas, chillies, or gotukola from your garden? Take a moment to list the quantity, location, and your expected price.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">2</div>
              <h3 className="step-title">Nearby Buyers Match</h3>
              <p className="step-desc">
                Households and eateries in your immediate area discover your fresh harvest before it loses vitality or spoils.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">3</div>
              <h3 className="step-title">Local Pickup & Fresh Taste</h3>
              <p className="step-desc">
                Quick neighbourhood handover. Grower gets paid directly, and buyer gets unmatched, freshly picked nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECENT HARVEST SHOWCASE */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Fresh In Your Area</span>
            <h2>Sample Fresh Batches</h2>
            <p>Live examples of 5–20 kg community harvests available across Sri Lanka</p>
          </div>

          <div className="grid-3">
            {PREVIEW_PRODUCE.map((item) => (
              <ProduceCard
                key={item.id}
                title={item.title}
                localName={item.localName}
                category={item.category}
                quantityKg={item.quantityKg}
                pricePerKg={item.pricePerKg}
                location={item.location}
                distance={item.distance}
                freshness={item.freshness}
                grower={item.grower}
                emoji={item.emoji}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button to="/listings" variant="outline" size="md">
              View All Available Produce
            </Button>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dual-cta-banner">
            <span className="badge badge-amber">Empowering Small Growers</span>
            <h2 className="dual-cta-title">Ready to Join the Hyperlocal Food Movement?</h2>
            <p className="dual-cta-desc">
              Whether you have a backyard harvest to share or you are searching for pesticide-free, freshly harvested vegetables nearby.
            </p>

            <div className="dual-cta-buttons">
              <Button to="/post-harvest" variant="amber" size="lg" fullWidth>
                Post 5–20 kg Harvest
              </Button>
              <Button to="/find-produce" variant="secondary" size="lg" fullWidth>
                Find Produce Nearby
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
