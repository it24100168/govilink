import Button from './Button';
import './ProduceCard.css';

/**
 * ProduceCard Component for displaying 5–20 kg small harvest batches in GoviLink
 * 
 * @param {string} title - Produce item name (e.g. "Fresh Gotukola", "Red Papaya")
 * @param {string} localName - Local Sinhala / Tamil name (e.g. "ගොටුකොළ / வல்லாரை")
 * @param {string} category - Category tag (e.g. "Leafy Greens", "Fruits", "Spices")
 * @param {number|string} quantityKg - Harvest batch quantity (e.g. "8 kg")
 * @param {number|string} pricePerKg - Price in LKR (e.g. 250)
 * @param {string} location - Neighbourhood / Town (e.g. "Kaduwela", "Maharagama")
 * @param {string} distance - Calculated distance (e.g. "1.2 km away")
 * @param {string} freshness - Harvest status (e.g. "Harvested Today", "Ready for Pickup")
 * @param {string} grower - Grower label (e.g. "Home Garden - Kamal")
 * @param {string} emoji - Icon representation
 * @param {Function} onSelect - Optional click handler
 */
export default function ProduceCard({
  title = 'Organic Produce',
  localName,
  category = 'Vegetables',
  quantityKg = '10 kg',
  pricePerKg = 250,
  location = 'Colombo District',
  distance = 'Nearby',
  freshness = 'Harvested Today',
  grower = 'Home Grower',
  emoji = '🌱',
  onSelect,
  className = '',
}) {
  return (
    <article className={`produce-card ${className}`}>
      {/* Visual Header */}
      <div className="produce-card-header">
        <div className="produce-card-badge-top">
          <span className="badge badge-green">{category}</span>
        </div>
        <div className="produce-card-freshness">
          <span className="badge badge-amber">{freshness}</span>
        </div>
        <div className="produce-card-emoji-wrap" aria-hidden="true">
          {emoji}
        </div>
      </div>

      {/* Body Details */}
      <div className="produce-card-body">
        <div className="produce-card-title-row">
          <h3 className="produce-card-title">{title}</h3>
          {localName && <span className="produce-card-local-name">{localName}</span>}
        </div>

        {/* Pricing & Hyperlocal Quantity Breakdown */}
        <div className="produce-card-metrics">
          <div className="produce-card-price">
            <span className="produce-card-price-val">Rs. {pricePerKg}</span>
            <span className="produce-card-price-unit">per kg</span>
          </div>
          <div className="produce-card-qty">
            <span className="produce-card-qty-val">{quantityKg}</span>
            <span className="produce-card-qty-label">Batch Size</span>
          </div>
        </div>

        {/* Local Meta Info */}
        <div className="produce-card-meta">
          <div className="produce-card-meta-item">
            <svg className="produce-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location} • <strong style={{ color: 'var(--primary-800)' }}>{distance}</strong></span>
          </div>

          <div className="produce-card-meta-item">
            <svg className="produce-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{grower}</span>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="produce-card-footer">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={onSelect}
          to="/listings"
        >
          View Batch Details
        </Button>
      </div>
    </article>
  );
}
