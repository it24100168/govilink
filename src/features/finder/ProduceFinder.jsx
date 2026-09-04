import { useState } from 'react';
import { Button, Input, ProduceCard } from '../../components';
import { supabase } from '../../lib/supabase';
import './finder.css';

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
  return '🥦';
}

export default function ProduceFinder() {
  const [produceQuery, setProduceQuery] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
      const requiredQty = Number(quantityKg);
      const searchTerm = produceQuery.trim().toLowerCase();

      // Query harvest_listings from Supabase where available = true
      const { data, error } = await supabase
        .from('harvest_listings')
        .select('*')
        .eq('available', true);

      if (error) {
        throw error;
      }

      // Filter results:
      // 1. Matching selected/entered produce case-insensitively
      // 2. Only keep listings where quantity_kg >= buyer required quantity
      const matched = (data || []).filter((item) => {
        const matchesProduce = item.produce && item.produce.toLowerCase().includes(searchTerm);
        const matchesQty = Number(item.quantity_kg) >= requiredQty;
        return matchesProduce && matchesQty;
      });

      setResults(matched);
    } catch (err) {
      console.error('Error fetching produce listings:', err);
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
            <h2 className="finder-form-title">Find Fresh Produce</h2>
            <p>Connect directly with small-batch harvests in your area</p>
          </div>
        </div>

        <form className="finder-form" onSubmit={handleSearch} noValidate>
          <Input
            id="finder-produce-input"
            label="Produce required"
            placeholder="e.g. Gotukola, Green Chilli, Papaya, Drumstick"
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
              min="1"
              step="any"
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
              helper="Specify batch quantity required"
            />
          </div>

          <div className="finder-form-actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Searching Harvests...' : 'Find Produce'}
            </Button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="finder-state-box card finder-loading-box">
          <div className="finder-spinner" role="status" aria-label="Loading"></div>
          <p className="finder-state-title">Searching available harvest listings...</p>
          <p className="finder-state-desc">Fetching small-batch farmers matching your criteria</p>
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
          <h3 className="finder-state-title">No matching produce found</h3>
          <p className="finder-state-desc">
            We couldn't find any available harvest of <strong>"{produceQuery}"</strong> with at least{' '}
            <strong>{quantityKg} kg</strong> available.
          </p>
          <p className="finder-state-subtext">
            Try adjusting your produce search term or lowering the required quantity.
          </p>
        </div>
      )}

      {/* Matching Results State */}
      {!loading && !apiError && hasSearched && results.length > 0 && (
        <div className="finder-results-section">
          <div className="finder-results-header">
            <h3 className="finder-results-title">
              Matching Harvests ({results.length})
            </h3>
            <span className="badge badge-green">Available Now</span>
          </div>

          <div className="grid-3 finder-results-grid">
            {results.map((item) => (
              <ProduceCard
                key={item.id}
                title={item.produce}
                grower={item.farmer_name || 'Local Farmer'}
                quantityKg={`${item.quantity_kg} kg available`}
                pricePerKg={item.price_per_kg}
                location={item.location_name || 'Local District'}
                distance="Distance pending"
                freshness={item.harvest_date ? `Harvested ${item.harvest_date}` : 'Available'}
                emoji={getProduceEmoji(item.produce)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
