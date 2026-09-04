import { ProduceCard } from '../../components';
import './marketplace.css';

// Sample curated mock data representing small Sri Lankan 5–20 kg harvests
const MOCK_PRODUCE_LISTINGS = [
  {
    id: 'prod-1',
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
    id: 'prod-2',
    title: 'Red Lady Papaya',
    localName: 'රතු පැපොල් / பப்பாளி',
    category: 'Fruits',
    quantityKg: '15 kg batch',
    pricePerKg: 220,
    location: 'Maharagama',
    distance: '2.4 km away',
    freshness: 'Fresh Tree Ripe',
    grower: 'Kamal • Home Garden',
    emoji: '🥭',
  },
  {
    id: 'prod-3',
    title: 'Jaffna Green Chillies',
    localName: 'අමු මිරිස් / பச்சை மிளகாய்',
    category: 'Spices',
    quantityKg: '8 kg batch',
    pricePerKg: 450,
    location: 'Gampaha',
    distance: '3.1 km away',
    freshness: 'Picked Today',
    grower: 'Ranjith • Small Plot',
    emoji: '🌶️',
  },
  {
    id: 'prod-4',
    title: 'Organic Kohila Ala & Dalu',
    localName: 'කොහිල / கோகிலா',
    category: 'Traditional Greens',
    quantityKg: '12 kg batch',
    pricePerKg: 280,
    location: 'Malabe',
    distance: '1.8 km away',
    freshness: 'Fresh Harvest',
    grower: 'Sarath • Wetlands Garden',
    emoji: '🌱',
  },
  {
    id: 'prod-5',
    title: 'Ambul Banana (Kolikuttu)',
    localName: 'ඇඹුල් කෙසෙල් / வாழைப்பழம்',
    category: 'Fruits',
    quantityKg: '18 kg (2 Bunches)',
    pricePerKg: 200,
    location: 'Homagama',
    distance: '4.2 km away',
    freshness: 'Harvested Yesterday',
    grower: 'Priyani • Home Garden',
    emoji: '🍌',
  },
  {
    id: 'prod-6',
    title: 'Winged Beans (Dambala)',
    localName: 'දඹල / சிறகு அவரை',
    category: 'Vegetables',
    quantityKg: '9 kg batch',
    pricePerKg: 260,
    location: 'Pannipitiya',
    distance: '2.9 km away',
    freshness: 'Picked This Morning',
    grower: 'Bandara • Trellis Garden',
    emoji: '🥬',
  },
];

/**
 * Feature Placeholder: Available Produce Listings
 * Allocated for Developer / Branch: features/marketplace
 * 
 * Future logic to implement by marketplace team:
 * - Supabase real-time queries for produce listings
 * - Category and price range filtering
 * - Stock reserve / batch claiming flow
 */
export default function MarketplaceListingsPlaceholder() {
  return (
    <div className="marketplace-container">
      {/* Dev Branch Notice */}
      <div className="feature-dev-notice">
        <span className="badge badge-amber">Branch: features/marketplace</span>
        <p className="feature-dev-text">
          <strong>Marketplace & Feed Module:</strong> This UI is a ready-to-extend scaffolding. Developer working on the marketplace feature can integrate Supabase database queries, real-time live updates, and sorting filters here.
        </p>
      </div>

      {/* Filter Bar Scaffolding */}
      <div className="marketplace-filter-bar">
        <div className="filter-pill-group">
          <button type="button" className="filter-pill active" disabled>All Produce</button>
          <button type="button" className="filter-pill" disabled>Vegetables</button>
          <button type="button" className="filter-pill" disabled>Fruits</button>
          <button type="button" className="filter-pill" disabled>Leafy Greens</button>
          <button type="button" className="filter-pill" disabled>Spices</button>
        </div>
        <span className="filter-status-text">Showing 6 sample 5–20 kg batches</span>
      </div>

      {/* Produce Grid */}
      <div className="grid-3">
        {MOCK_PRODUCE_LISTINGS.map((item) => (
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
    </div>
  );
}
