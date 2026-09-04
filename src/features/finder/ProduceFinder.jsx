import { useState } from 'react';
import { Button, Input, ProduceCard } from '../../components';
import { getCurrentLocation, sortByNearest } from '../location';
import supabaseClient, { supabase as namedSupabase } from '../../lib/supabase';
import './finder.css';

// Support both named and default exports from src/lib/supabase.js
const supabase = namedSupabase || supabaseClient;

/**
 * Helper to pick a produce emoji based on crop name
 */
function getProduceEmoji(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('gotukola') || lower.includes('leaf') || lower.includes('green')) return '🌿';
  if (lower.includes('papaya') || lower.includes('mango') || lower.includes('fruit')) return '🥭';
  if (lower.includes('chilli') || lower.includes('miris') || lower.includes('pepper')) return '🌶️';
  if (lower.includes('banana') || lower.includes('kesel')) return '🍌';
  if (lower.includes('bean') || lower.includes('dambala')) return '🥬';
  if (lower.includes('kohila') || lower.includes('root') || lower.includes('ala')) return '🌱';
  if (lower.includes('murunga') || lower.includes('drumstick')) return '🥦';
  return '🌱';
}

/**
 * Quick search suggestion tags for buyers
 */
const QUICK_BUYER_SUGGESTIONS = [
  'Gotukola',
  'Organic Papaya',
  'Green Chilli',
  'Kohila',
  'Ambul Banana',
  'Winged Beans',
];

export default function ProduceFinder() {
  const [produceQuery, setProduceQuery] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [errors, setErrors] = useState({});

  // Geolocation states
  const [buyerCoords, setBuyerCoords] = useState({ latitude: null, longitude: null });
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);
  const [locationNotice, setLocationNotice] = useState(null);

  // Search execution states
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Trigger manual location capture
  const handleCaptureLocation = async () => {
    setDetectingLocation(true);
    setLocationNotice(null);

    try {
      const loc = await getCurrentLocation();
      if (loc.success && loc.latitude && loc.longitude) {
        setBuyerCoords({ latitude: loc.latitude, longitude: loc.longitude });
        setLocationStatus(`📍 Location active (${loc.latitude.toFixed(3)}, ${loc.longitude.toFixed(3)})`);
        setLocationNotice(null);
        return { latitude: loc.latitude, longitude: loc.longitude };
      } else {
        setLocationNotice(loc.error || 'Location access denied. Listings will be displayed without distance sorting.');
        return null;
      }
    } catch (err) {
      setLocationNotice('Unable to access geolocation. Please check browser permissions.');
      return null;
    } finally {
      setDetectingLocation(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!produceQuery || !produceQuery.trim()) {
      newErrors.produce = 'Please enter the produce required.';
    }

    const qtyNum = Number(quantityKg);
    if (!quantityKg || isNaN(qtyNum) || qtyNum <= 0) {
      newErrors.quantity = 'Required quantity must be greater than 0 kg.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError(null);
    setHasSearched(true);
    setResults([]);

    try {
      // 1. Check or retrieve buyer location for Haversine distance calculations
      let currentLat = buyerCoords.latitude;
      let currentLon = buyerCoords.longitude;

      if (!currentLat || !currentLon) {
        setDetectingLocation(true);
        const loc = await getCurrentLocation();
        setDetectingLocation(false);

        if (loc.success && loc.latitude && loc.longitude) {
          currentLat = loc.latitude;
          currentLon = loc.longitude;
          setBuyerCoords({ latitude: loc.latitude, longitude: loc.longitude });
          setLocationStatus(`📍 Location active (${loc.latitude.toFixed(3)}, ${loc.longitude.toFixed(3)})`);
        } else {
          setLocationNotice(loc.error || 'Location access unavailable. Displaying results without distance sorting.');
        }
      }

      // 2. Fetch available listings from Supabase where available = true
      if (!supabase || typeof supabase.from !== 'function') {
        throw new Error('Supabase client is not configured. Please check your Supabase environment variables in .env.');
      }

      const { data, error } = await supabase
        .from('harvest_listings')
        .select('*')
        .eq('available', true);

      if (error) {
        throw error;
      }

      const requiredQty = Number(quantityKg);
      const searchTerm = produceQuery.trim().toLowerCase();

      // 3. Filter listings:
      // - Matches produce name (case-insensitive substring)
      // - Available quantity >= required quantity
      const matched = (data || []).filter((item) => {
        const matchesProduce = item.produce && item.produce.toLowerCase().includes(searchTerm);
        const matchesQty = Number(item.quantity_kg) >= requiredQty;
        return matchesProduce && matchesQty;
      });

      // 4. Calculate Haversine distance and sort nearest to farthest
      if (currentLat && currentLon && matched.length > 0) {
        const sortedListings = sortByNearest(matched, currentLat, currentLon);
        setResults(sortedListings);
      } else {
        setResults(matched);
      }
    } catch (err) {
      console.error('Error searching produce listings:', err);
      setApiError(err.message || 'Failed to search produce listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finder-container">
      {/* Search Form Card */}
      <div className="card finder-search-card">
        <div className="finder-card-header">
          <div className="finder-icon-bubble">🔍</div>
          <div>
            <h2 className="finder-form-title">Find Nearby Fresh Produce</h2>
            <p>Connect directly with small-batch harvests in your immediate area</p>
          </div>
        </div>

        <form className="finder-form" onSubmit={handleSearch} noValidate>
          {/* Quick Suggestions */}
          <div className="finder-quick-tags">
            <span className="finder-quick-label">Popular in Sri Lanka:</span>
            <div className="finder-tag-group">
              {QUICK_BUYER_SUGGESTIONS.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`finder-tag ${produceQuery.toLowerCase().includes(item.toLowerCase()) ? 'active' : ''}`}
                  onClick={() => {
                    setProduceQuery(item);
                    if (errors.produce) {
                      setErrors((prev) => ({ ...prev, produce: null }));
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Input
            id="finder-produce-input"
            label="Produce required"
            placeholder="e.g. Gotukola, Green Chilli, Papaya, Drumstick (Murunga)"
            value={produceQuery}
            onChange={(e) => {
              setProduceQuery(e.target.value);
              if (errors.produce) {
                setErrors((prev) => ({ ...prev, produce: null }));
              }
            }}
            error={errors.produce}
            required
            prefix={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
            helper="Enter produce name in English, Sinhala, or Tamil"
          />

          <div className="finder-grid-row">
            <Input
              id="finder-quantity-input"
              label="Required quantity in kg"
              type="number"
              min="0.5"
              step="0.5"
              placeholder="e.g. 5"
              value={quantityKg}
              onChange={(e) => {
                setQuantityKg(e.target.value);
                if (errors.quantity) {
                  setErrors((prev) => ({ ...prev, quantity: null }));
                }
              }}
              error={errors.quantity}
              required
              suffix="kg"
              helper="We will only show harvests with at least this quantity available"
            />
          </div>

          {/* Location Capture Strip */}
          <div className="finder-location-strip">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCaptureLocation}
              disabled={detectingLocation}
              icon={
                detectingLocation ? (
                  <span className="govi-spinner" style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }}></span>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                  </svg>
                )
              }
            >
              {detectingLocation ? 'Detecting Location...' : buyerCoords.latitude ? 'Update My Location' : 'Use My Current Location'}
            </Button>

            {locationStatus && (
              <span className="badge badge-green">
                {locationStatus}
              </span>
            )}
          </div>

          {locationNotice && (
            <div className="finder-location-notice" role="status">
              <span>ℹ️ {locationNotice}</span>
            </div>
          )}

          <div className="finder-form-actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              icon={
                loading ? (
                  <span className="govi-spinner" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }}></span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )
              }
            >
              {loading ? 'Searching Nearest Harvests...' : 'Find Nearest Produce'}
            </Button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="finder-state-box card finder-loading-box">
          <div className="finder-spinner" role="status" aria-label="Loading"></div>
          <p className="finder-state-title">Searching available harvest listings...</p>
          <p className="finder-state-desc">Calculating nearest small-batch growers matching your required quantity</p>
        </div>
      )}

      {/* Error State */}
      {!loading && apiError && (
        <div className="finder-state-box card finder-error-box" role="alert">
          <div className="finder-state-icon">⚠️</div>
          <h3 className="finder-state-title">Unable to complete search</h3>
          <p className="finder-state-desc">{apiError}</p>
          <Button variant="outline" size="sm" onClick={handleSearch} className="finder-retry-btn">
            Try Again
          </Button>
        </div>
      )}

      {/* No Results State */}
      {!loading && !apiError && hasSearched && results.length === 0 && (
        <div className="finder-state-box card finder-no-results-box">
          <div className="finder-state-icon">🌱</div>
          <h3 className="finder-state-title">No matching harvests found</h3>
          <p className="finder-state-desc">
            We couldn't find any available harvest of <strong>"{produceQuery}"</strong> with at least{' '}
            <strong>{quantityKg} kg</strong> available right now.
          </p>
          <p className="finder-state-subtext">
            Try searching for a broader term or lowering the required quantity to match smaller home garden batches.
          </p>
        </div>
      )}

      {/* Matching Results State (Sorted Nearest to Farthest) */}
      {!loading && !apiError && hasSearched && results.length > 0 && (
        <div className="finder-results-section animate-fade-in">
          <div className="finder-results-header">
            <div>
              <h3 className="finder-results-title">
                Matching Harvests ({results.length})
              </h3>
              <p className="finder-results-subtitle">
                {buyerCoords.latitude && buyerCoords.longitude
                  ? 'Sorted nearest to farthest based on your GPS location'
                  : 'Filtered by required quantity and availability'}
              </p>
            </div>
            <span className="badge badge-green">Ready for Direct Pickup</span>
          </div>

          <div className="grid-3 finder-results-grid">
            {results.map((item) => {
              const distanceDisplay =
                typeof item.distance === 'number'
                  ? `${item.distance} km away`
                  : item.location_name
                  ? 'Location on record'
                  : 'Distance pending';

              return (
                <ProduceCard
                  key={item.id || `${item.farmer_name}-${item.produce}-${item.created_at}`}
                  title={item.produce}
                  grower={item.farmer_name || 'Local Home Grower'}
                  quantityKg={`${item.quantity_kg} kg available`}
                  pricePerKg={item.price_per_kg}
                  location={item.location_name || 'Sri Lanka'}
                  distance={distanceDisplay}
                  freshness={item.harvest_date ? `Harvested ${item.harvest_date}` : 'Fresh Harvest'}
                  phone={item.phone}
                  emoji={getProduceEmoji(item.produce)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
