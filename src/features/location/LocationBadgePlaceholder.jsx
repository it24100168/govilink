import './location.css';

/**
 * Feature Placeholder: Location & Geolocation
 * Allocated for Developer / Branch: features/location
 * 
 * Future logic to implement by location team:
 * - Browser Geolocation API integration
 * - Sri Lankan Grama Niladhari / Town / District picker
 * - Haversine distance calculator between grower and buyer
 * - Radius matching utilities
 */
export default function LocationBadgePlaceholder({ currentArea = 'Colombo District (Hyperlocal)' }) {
  return (
    <div className="location-badge-wrapper">
      <div className="location-badge-pill">
        <span className="location-pin-icon">📍</span>
        <span className="location-text">{currentArea}</span>
        <span className="location-dev-tag">features/location</span>
      </div>
    </div>
  );
}
