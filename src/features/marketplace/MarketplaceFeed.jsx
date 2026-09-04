import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { ProduceCard, Button } from '../../components';
import './marketplace.css';

// Predefined Sri Lankan produce metadata dictionary to enrich listings
const PRODUCE_METADATA = {
  gotukola: { category: 'Leafy Greens', localName: 'ගොටුකොළ / வல்லாரை', emoji: '🌿' },
  mukunuwenna: { category: 'Leafy Greens', localName: 'මුකුණුවැන්න / பொன்னாங்கண்ணි', emoji: '🥗' },
  kankun: { category: 'Leafy Greens', localName: 'කන්කුන් / கங்கூன்', emoji: '🥬' },
  kathurumurunga: { category: 'Leafy Greens', localName: 'කතුරුමුරුංගා / அகத்தி', emoji: '🌿' },
  papaya: { category: 'Fruits', localName: 'පැපොල් / பப்பாளி', emoji: '🥭' },
  banana: { category: 'Fruits', localName: 'කෙසෙල් / வாழைப்பழம்', emoji: '🍌' },
  kesel: { category: 'Fruits', localName: 'කෙසෙල් / வாழைப்பழம்', emoji: '🍌' },
  mango: { category: 'Fruits', localName: 'අඹ / மாம்பழம்', emoji: '🥭' },
  avocado: { category: 'Fruits', localName: 'අලිගැටපේර / வெண்ணெய் பழம்', emoji: '🥑' },
  passion: { category: 'Fruits', localName: 'පැෂන් / கொடித்தோடை', emoji: '🍈' },
  guava: { category: 'Fruits', localName: 'පේර / கொய்யா', emoji: '🍐' },
  chilli: { category: 'Spices', localName: 'අමු මිරිස් / பச்சை மிளகாய்', emoji: '🌶️' },
  chillies: { category: 'Spices', localName: 'අමු මිරිස් / பச்சை மிளகாய்', emoji: '🌶️' },
  miris: { category: 'Spices', localName: 'මිරිස් / மிளகாய்', emoji: '🌶️' },
  ginger: { category: 'Spices', localName: 'ඉඟුරු / இஞ்சி', emoji: '🫚' },
  turmeric: { category: 'Spices', localName: 'කහ / மஞ்சள்', emoji: '🫚' },
  lime: { category: 'Spices', localName: 'දෙහි / எலுமிச்சை', emoji: '🍋' },
  kohila: { category: 'Traditional', localName: 'කොහිල / கோகிலா', emoji: '🌱' },
  manioc: { category: 'Traditional', localName: 'මඤ්ඤොක්කා / மரவள்ளிக்கிழங்கு', emoji: '🥔' },
  cassava: { category: 'Traditional', localName: 'මඤ්ඤොක්කා / மரவள்ளிக்கிழங்கு', emoji: '🥔' },
  manyokka: { category: 'Traditional', localName: 'මඤ්ඤොක්කා / மரவள்ளிக்கிழங்கு', emoji: '🥔' },
  innala: { category: 'Traditional', localName: 'ඉන්නල / சிறுகிழங்கு', emoji: '🥔' },
  dambala: { category: 'Vegetables', localName: 'දඹල / சிறகு அவரை', emoji: '🥬' },
  winged: { category: 'Vegetables', localName: 'දඹල / சிறகு அவரை', emoji: '🥬' },
  brinjal: { category: 'Vegetables', localName: 'වම්බටු / கத்தரிக்காய்', emoji: '🍆' },
  eggplant: { category: 'Vegetables', localName: 'වම්බටු / கத்தரிக்காய்', emoji: '🍆' },
  tomato: { category: 'Vegetables', localName: 'තක්කාලි / தக்காளி', emoji: '🍅' },
  beans: { category: 'Vegetables', localName: 'බෝංචි / பீன்ஸ்', emoji: '🫛' },
  carrot: { category: 'Vegetables', localName: 'කැරට් / கேரட்', emoji: '🥕' },
  pumpkin: { category: 'Vegetables', localName: 'වට්ටක්කා / பூசணிக்காய்', emoji: '🎃' },
  okra: { category: 'Vegetables', localName: 'බණ්ඩක්කා / வெண்டைக்காய்', emoji: '🥗' },
  bandakka: { category: 'Vegetables', localName: 'බණ්ඩක්කා / வெண்டைக்காய்', emoji: '🥗' },
  cucumber: { category: 'Vegetables', localName: 'පිපිඤ්ඤා / வெள்ளரிக்காய்', emoji: '🥒' },
};

/**
 * Helper to enrich listing with categories, Sinhala/Tamil names, and emoji
 */
function enrichListing(item) {
  const nameLower = (item.produce || item.title || '').toLowerCase();
  let matchedMeta = { category: 'Vegetables', localName: '', emoji: '🌱' };

  for (const [key, meta] of Object.entries(PRODUCE_METADATA)) {
    if (nameLower.includes(key)) {
      matchedMeta = meta;
      break;
    }
  }

  return {
    ...item,
    id: item.id,
    produce: item.produce || item.title || 'Fresh Produce',
    farmer_name: item.farmer_name || item.grower || 'Home Grower',
    quantity_kg: item.quantity_kg ?? item.quantity ?? item.available_quantity ?? 10,
    price_per_kg: item.price_per_kg ?? item.price ?? 200,
    location: item.location_name || item.location || 'Sri Lanka',
    harvest_date: item.harvest_date || item.created_at,
    phone: item.phone || item.phone_number || item.contact_number || '',
    category: matchedMeta.category,
    localName: matchedMeta.localName,
    emoji: matchedMeta.emoji,
  };
}

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Spices', 'Traditional'];

export default function MarketplaceFeed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('harvest_listings')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      const enriched = (data || []).map(enrichListing);
      setListings(enriched);
    } catch (err) {
      console.error('Error fetching marketplace listings:', err);
      setError(err.message || 'Failed to connect to the harvest database. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('harvest_listings')
          .select('*')
          .eq('available', true)
          .order('created_at', { ascending: false });

        if (!isMounted) return;

        if (supabaseError) {
          throw supabaseError;
        }

        const enriched = (data || []).map(enrichListing);
        setListings(enriched);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching marketplace listings:', err);
        setError(err.message || 'Failed to connect to the harvest database. Please try again.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);


  // Filter listings based on search term and selected category
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

      // Search filter (searches produce name, farmer name, local name, and location)
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.produce.toLowerCase().includes(query) ||
        (item.localName && item.localName.toLowerCase().includes(query)) ||
        item.farmer_name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [listings, selectedCategory, searchTerm]);

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="marketplace-container">
      {/* Search and Category Filter Section */}
      <div className="marketplace-controls-card">
        <div className="marketplace-search-row">
          <div className="search-input-wrapper">
            <svg
              className="search-input-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="marketplace-search-input"
              className="marketplace-search-input"
              placeholder="Search by produce (e.g. Papaya, Gotukola, Chillies)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search produce by name"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchListings}
            disabled={loading}
            title="Refresh listings"
            aria-label="Refresh produce listings"
          >
            <svg
              className={`refresh-icon ${loading ? 'spin' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span className="refresh-btn-text">Refresh</span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="marketplace-categories-row">
          <div className="filter-pill-group" role="tablist" aria-label="Produce Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? '🌱 All Produce' : cat}
              </button>
            ))}
          </div>

          <div className="marketplace-meta-summary">
            {!loading && !error && (
              <span className="filter-status-text">
                Showing <strong>{filteredListings.length}</strong> available {filteredListings.length === 1 ? 'batch' : 'batches'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Database Error State */}
      {error && (
        <div className="marketplace-error-state" role="alert">
          <div className="marketplace-error-icon">⚠️</div>
          <div className="marketplace-error-content">
            <h3 className="marketplace-error-title">Unable to Load Harvest Marketplace</h3>
            <p className="marketplace-error-msg">{error}</p>
            <Button
              variant="primary"
              size="sm"
              onClick={fetchListings}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Loading Skeleton Grid State */}
      {loading && (
        <div className="grid-3" aria-label="Loading produce listings">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="produce-skeleton-card">
              <div className="skeleton-header shimmer" />
              <div className="skeleton-body">
                <div className="skeleton-line shimmer title" />
                <div className="skeleton-line shimmer subtitle" />
                <div className="skeleton-metrics shimmer" />
                <div className="skeleton-line shimmer meta" />
                <div className="skeleton-line shimmer meta" />
                <div className="skeleton-button shimmer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State - No listings or no search results */}
      {!loading && !error && filteredListings.length === 0 && (
        <div className="marketplace-empty-state">
          <div className="marketplace-empty-icon" aria-hidden="true">🌾</div>
          <h3 className="marketplace-empty-title">
            {searchTerm || selectedCategory !== 'All'
              ? 'No Matching Produce Found'
              : 'No Active Harvest Batches Right Now'}
          </h3>
          <p className="marketplace-empty-desc">
            {searchTerm || selectedCategory !== 'All'
              ? `We couldn't find any produce matching "${searchTerm || selectedCategory}". Try clearing your filters or search for another item.`
              : 'Small-scale home growers post fresh 5–20 kg surplus harvests daily. Check back soon or be the first to post your harvest!'}
          </p>
          <div className="marketplace-empty-actions">
            {(searchTerm || selectedCategory !== 'All') ? (
              <Button
                variant="secondary"
                size="md"
                onClick={handleResetFilters}
              >
                Clear All Filters
              </Button>
            ) : (
              <Button
                to="/post-harvest"
                variant="primary"
                size="md"
              >
                Post Your 5–20 kg Harvest
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Produce Cards Grid */}
      {!loading && !error && filteredListings.length > 0 && (
        <div className="grid-3">
          {filteredListings.map((item) => (
            <ProduceCard
              key={item.id}
              id={item.id}
              produce={item.produce}
              title={item.produce}
              localName={item.localName}
              category={item.category}
              quantityKg={item.quantity_kg}
              pricePerKg={item.price_per_kg}
              location={item.location}
              harvestDate={item.harvest_date}
              farmerName={item.farmer_name}
              phone={item.phone}
              emoji={item.emoji}
            />
          ))}
        </div>
      )}
    </div>
  );
}
