import { Button, Input } from '../../components';
import './finder.css';

/**
 * Feature Placeholder: Find Produce
 * Allocated for Developer / Branch: features/finder
 * 
 * Future logic to implement by finder team:
 * - Search query filtering
 * - Distance radius calculation (e.g. 1km - 5km nearby)
 * - Matching buyers with small 5–20 kg harvests
 * - Dynamic list rendering from Supabase
 */
export default function FindProducePlaceholder() {
  return (
    <div className="finder-placeholder-container">
      {/* Dev Branch Notice */}
      <div className="feature-dev-notice">
        <span className="badge badge-amber">Branch: features/finder</span>
        <p className="feature-dev-text">
          <strong>Buyer Search & Match Module:</strong> This UI is a ready-to-extend scaffolding. Developer working on the finder feature can implement radius filtering, search query handling, and buyer matching algorithms here.
        </p>
      </div>

      {/* Scaffolding Search Bar Card */}
      <div className="card finder-search-card">
        <div className="finder-card-header">
          <div className="finder-icon-bubble">🔍</div>
          <div>
            <h2 className="finder-form-title">Find Nearby Fresh Harvests</h2>
            <p>Discover 5–20 kg batches within walking or short driving distance</p>
          </div>
        </div>

        <form className="finder-mock-form" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="What produce are you looking for?"
            placeholder="e.g. Gotukola, Green Chilli, Papaya, Drumstick (Murunga)"
            prefix={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
            helper="Search by common local names in English, Sinhala, or Tamil"
            disabled
          />

          <div className="finder-grid-row">
            <Input
              label="Location / Area"
              placeholder="e.g. Kaduwela, Maharagama, Kandy"
              prefix="📍"
              helper="Enter your neighbourhood or town"
              disabled
            />

            <div className="govi-input-group">
              <label className="govi-input-label">Distance Radius (Hyperlocal)</label>
              <div className="finder-mock-radius-tabs">
                <button type="button" className="radius-tab active" disabled>Within 3 km</button>
                <button type="button" className="radius-tab" disabled>Within 5 km</button>
                <button type="button" className="radius-tab" disabled>Within 10 km</button>
              </div>
              <span className="govi-input-helper">Radius filtering ready for geolocation integration</span>
            </div>
          </div>

          <div className="finder-form-actions">
            <Button variant="primary" size="lg" disabled fullWidth>
              Search Fresh Batches (Feature Under Development)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
