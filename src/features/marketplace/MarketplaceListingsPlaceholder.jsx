import { useState, useEffect } from 'react';
import { ProduceCard, Button } from '../../components';
import supabaseClient, { supabase as namedSupabase } from '../../lib/supabase';
import './marketplace.css';

const supabase = namedSupabase || supabaseClient;

// Sample curated mock data representing small Sri Lankan 5–20 kg harvests
const MOCK_PRODUCE_LISTINGS = [
  {
    id: 'mock-1',
    title: 'Gotukola (Centella Asiatica)',
    localName: 'ගොටුකොළ / வல்லாரை',
    category: 'Leafy Greens',
    quantityKg: '6 kg batch',
    quantityNum: 6,
    pricePerKg: 180,
    location: 'Kaduwela',
    distance: '1.2 km away',
    freshness: 'Harvested at 6 AM',
    grower: 'Nimali • Backyard Garden',
    phone: '0771234567',
    emoji: '🌿',
  },
  {
    id: 'mock-2',
    title: 'Red Lady Papaya',
    localName: 'රතු පැපොල් / பப்பாளி',
    category: 'Fruits',
    quantityKg: '15 kg batch',
    quantityNum: 15,
    pricePerKg: 220,
    location: 'Maharagama',
    distance: '2.4 km away',
    freshness: 'Fresh Tree Ripe',
    grower: 'Kamal • Home Garden',
    phone: '0712345678',
    emoji: '🥭',
  },
  {
    id: 'mock-3',
    title: 'Jaffna Green Chillies',
    localName: 'අමු මිරිස් / பச்சை மிளகாய்',
    category: 'Spices',
    quantityKg: '8 kg batch',
    quantityNum: 8,
    pricePerKg: 450,
    location: 'Gampaha',
    distance: '3.1 km away',
    freshness: 'Picked Today',
    grower: 'Ranjith • Small Plot',
    phone: '0779876543',
    emoji: '🌶️',
  },
  {
    id: 'mock-4',
    title: 'Organic Kohila Ala & Dalu',
    localName: 'කොහිල / கோகிலா',
    category: 'Leafy Greens',
    quantityKg: '12 kg batch',
    quantityNum: 12,
    pricePerKg: 280,
    location: 'Malabe',
    distance: '1.8 km away',
    freshness: 'Fresh Harvest',
    grower: 'Sarath • Wetlands Garden',
    phone: '0751122334',
    emoji: '🌱',
  },
  {
    id: 'mock-5',
    title: 'Ambul Banana (Kolikuttu)',
    localName: 'ඇඹුල් කෙසෙල් / வாழைப்பழம்',
    category: 'Fruits',
    quantityKg: '18 kg batch',
    quantityNum: 18,
    pricePerKg: 200,
    location: 'Homagama',
    distance: '4.2 km away',
    freshness: 'Harvested Yesterday',
    grower: 'Priyani • Home Garden',
    phone: '0785566778',
    emoji: '🍌',
  },
  {
    id: 'mock-6',
    title: 'Winged Beans (Dambala)',
    localName: 'දඹල / சிறகு அவரை',
    category: 'Vegetables',
    quantityKg: '9 kg batch',
    quantityNum: 9,
    pricePerKg: 260,
    location: 'Pannipitiya',
    distance: '2.9 km away',
    freshness: 'Picked This Morning',
    grower: 'Bandara • Trellis Garden',
    phone: '0724455667',
    emoji: '🥬',
  },
];

function getCategoryForProduce(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('gotukola') || lower.includes('leaf') || lower.includes('kohila') || lower.includes('spinach')) return 'Leafy Greens';
  if (lower.includes('papaya') || lower.includes('mango') || lower.includes('banana') || lower.includes('fruit')) return 'Fruits';
  if (lower.includes('chilli') || lower.includes('miris') || lower.includes('pepper') || lower.includes('ginger')) return 'Spices';
  return 'Vegetables';
}

function getProduceEmoji(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('gotukola') || lower.includes('leaf') || lower.includes('green')) return '🌿';
  if (lower.includes('papaya') || lower.includes('mango') || lower.includes('fruit')) return '🥭';
  if (lower.includes('chilli') || lower.includes('miris') || lower.includes('pepper')) return '🌶️';
  if (lower.includes('banana') || lower.includes('kesel')) return '🍌';
  if (lower.includes('bean') || lower.includes('dambala')) return '🥬';
  if (lower.includes('carrot')) return '🥕';
  if (lower.includes('kohila') || lower.includes('root') || lower.includes('ala')) return '🌱';
  return '🥦';
}

export default function MarketplaceListingsPlaceholder() {
  const [selectedCategory, setSelectedCategory] = useState('All Produce');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [dbListings, setDbListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live Supabase listings and combine
  useEffect(() => {
    async function fetchListings() {
      try {
        if (supabase && typeof supabase.from === 'function') {
          const { data, error } = await supabase
            .from('harvest_listings')
            .select('*')
            .eq('available', true)
            .order('created_at', { ascending: false });

          if (!error && Array.isArray(data)) {
            const formatted = data.map((item) => ({
              id: item.id || `db-${item.created_at}`,
              title: item.produce,
              localName: item.produce,
              category: getCategoryForProduce(item.produce),
              quantityKg: `${item.quantity_kg} kg batch`,
              quantityNum: Number(item.quantity_kg),
              pricePerKg: Number(item.price_per_kg),
              location: item.location_name || 'Sri Lanka',
              distance: 'Nearby (Direct Harvest)',
              freshness: item.harvest_date ? `Harvested ${item.harvest_date}` : 'Fresh Today',
              grower: `${item.farmer_name || 'Home Farmer'} • Local Grower`,
              phone: item.phone,
              emoji: getProduceEmoji(item.produce),
              isLive: true,
            }));
            setDbListings(formatted);
          }
        }
      } catch (err) {
        console.error('Error loading marketplace listings from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // Merge DB listings first, then mock items
  const allListings = [...dbListings, ...MOCK_PRODUCE_LISTINGS];

  // Filter by selected category
  const filteredListings = allListings.filter((item) => {
    if (selectedCategory === 'All Produce') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="marketplace-container">
      {/* Filter Bar */}
      <div className="marketplace-filter-bar">
        <div className="filter-pill-group">
          {['All Produce', 'Vegetables', 'Fruits', 'Leafy Greens', 'Spices'].map((cat) => (
            <button
              type="button"
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="filter-status-text">
          Showing {filteredListings.length} {selectedCategory.toLowerCase()} batches
        </span>
      </div>

      {/* Produce Grid */}
      <div className="grid-3">
        {filteredListings.map((item) => (
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
            onSelect={() => setActiveModalItem(item)}
          />
        ))}
      </div>

      {/* BATCH DETAILS MODAL DIALOG */}
      {activeModalItem && (
        <div className="govi-modal-backdrop" onClick={() => setActiveModalItem(null)}>
          <div
            className="govi-modal-content animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-produce-title"
          >
            {/* Modal Header */}
            <div className="govi-modal-header">
              <div className="modal-title-group">
                <span className="modal-emoji-icon">{activeModalItem.emoji}</span>
                <div>
                  <h3 id="modal-produce-title" className="modal-title">
                    {activeModalItem.title}
                  </h3>
                  <div className="modal-badge-row">
                    <span className="badge badge-green">{activeModalItem.category}</span>
                    <span className="badge badge-amber">{activeModalItem.freshness}</span>
                    {activeModalItem.isLive && <span className="badge badge-blue">Live Listing</span>}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="govi-modal-close-btn"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="govi-modal-body">
              <div className="modal-details-grid">
                <div className="modal-detail-card">
                  <span className="modal-detail-label">Batch Size</span>
                  <span className="modal-detail-value highlight">{activeModalItem.quantityKg}</span>
                  <span className="modal-detail-sub">5–20 kg Hyperlocal batch</span>
                </div>

                <div className="modal-detail-card">
                  <span className="modal-detail-label">Price per kg</span>
                  <span className="modal-detail-value">Rs. {activeModalItem.pricePerKg}</span>
                  <span className="modal-detail-sub">
                    Total batch: Rs. {activeModalItem.pricePerKg * (activeModalItem.quantityNum || 10)}
                  </span>
                </div>
              </div>

              <div className="modal-info-list">
                <div className="modal-info-item">
                  <span className="modal-info-icon">📍</span>
                  <div>
                    <strong>Location & Proximity:</strong>
                    <p>{activeModalItem.location} ({activeModalItem.distance})</p>
                  </div>
                </div>

                <div className="modal-info-item">
                  <span className="modal-info-icon">👨‍🌾</span>
                  <div>
                    <strong>Farmer / Grower:</strong>
                    <p>{activeModalItem.grower}</p>
                  </div>
                </div>

                {activeModalItem.phone && (
                  <div className="modal-info-item">
                    <span className="modal-info-icon">📞</span>
                    <div>
                      <strong>Contact Number:</strong>
                      <p>{activeModalItem.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="govi-modal-footer">
              {activeModalItem.phone ? (
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  href={`tel:${activeModalItem.phone}`}
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                >
                  Call Farmer ({activeModalItem.phone})
                </Button>
              ) : (
                <Button to="/find-produce" variant="primary" size="md" fullWidth>
                  Find Nearby Pickups
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                onClick={() => setActiveModalItem(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
