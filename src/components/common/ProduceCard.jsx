import Button from './Button';
import './ProduceCard.css';

/**
 * ProduceCard Component for displaying 5–20 kg small harvest batches in GoviLink
 * 
 * @param {string} id - Unique identifier for the listing
 * @param {string} produce - Produce item name (e.g. "Fresh Gotukola", "Red Papaya")
 * @param {string} title - Alias for produce
 * @param {string} localName - Local Sinhala / Tamil name (e.g. "ගොටුකොළ / வல்லாரை")
 * @param {string} category - Category tag (e.g. "Leafy Greens", "Fruits", "Spices")
 * @param {number|string} quantityKg - Harvest batch quantity (e.g. "8 kg")
 * @param {number|string} quantity - Alias for quantityKg
 * @param {number|string} availableQuantity - Alias for quantityKg
 * @param {number|string} pricePerKg - Price in LKR (e.g. 250)
 * @param {number|string} price - Alias for pricePerKg
 * @param {string} location - Neighbourhood / Town (e.g. "Kaduwela", "Maharagama")
 * @param {string} locationName - Alias for location
 * @param {string} distance - Calculated distance in km (e.g. "1.2 km away")
 * @param {string} freshness - Harvest status (e.g. "Harvested Today", "Ready for Pickup")
 * @param {string} harvestDate - Date of harvest (e.g. "2026-09-04")
 * @param {string} farmerName - Farmer / Grower name (e.g. "Kamal • Home Garden")
 * @param {string} grower - Alias for farmerName
 * @param {string} phone - Farmer phone number (for tel: direct call link)
 * @param {string} phoneNumber - Alias for phone
 * @param {string} emoji - Icon representation
 * @param {Function} onSelect - Optional click handler
 * @param {React.ReactNode} action - Optional custom action node
 * @param {string} actionText - Label for default action button
 * @param {string} actionTo - Destination path if navigating
 */
export default function ProduceCard({
  id,
  produce,
  title,
  localName,
  category = 'Vegetables',
  quantityKg,
  quantity,
  availableQuantity,
  pricePerKg,
  price,
  location,
  locationName,
  distance,
  freshness,
  harvestDate,
  farmerName,
  grower,
  phone,
  phoneNumber,
  emoji = '🌱',
  onSelect,
  action,
  actionText,
  actionTo,
  className = '',
}) {
  const displayTitle = produce || title || 'Fresh Produce';
  const displayFarmer = farmerName || grower || 'Local Grower';
  const displayLocation = location || locationName || 'Sri Lanka';
  const displayPrice = pricePerKg ?? price ?? 0;
  
  const rawQty = availableQuantity ?? quantityKg ?? quantity ?? '10';
  const displayQty = typeof rawQty === 'number' || (!isNaN(rawQty) && !rawQty.toString().includes('kg'))
    ? `${rawQty} kg batch`
    : rawQty.toString().includes('batch')
      ? rawQty
      : `${rawQty} batch`;

  const contactPhone = phone || phoneNumber;

  // Format harvest date if present
  const formatHarvestDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formattedDate = formatHarvestDate(harvestDate);

  return (
    <article className={`produce-card ${className}`}>
      {/* Visual Header */}
      <div className="produce-card-header">
        <div className="produce-card-badge-top">
          <span className="badge badge-green">{category}</span>
        </div>
        {(freshness || formattedDate) && (
          <div className="produce-card-freshness">
            <span className="badge badge-amber">{freshness || `Harvest: ${formattedDate}`}</span>
          </div>
        )}
        <div className="produce-card-emoji-wrap" aria-hidden="true">
          {emoji}
        </div>
      </div>

      {/* Body Details */}
      <div className="produce-card-body">
        <div className="produce-card-title-row">
          <h3 className="produce-card-title">{displayTitle}</h3>
          {localName && <span className="produce-card-local-name">{localName}</span>}
        </div>

        {/* Pricing & Hyperlocal Quantity Breakdown */}
        <div className="produce-card-metrics">
          <div className="produce-card-price">
            <span className="produce-card-price-val">Rs. {displayPrice}</span>
            <span className="produce-card-price-unit">per kg</span>
          </div>
          <div className="produce-card-qty">
            <span className="produce-card-qty-val">{displayQty}</span>
            <span className="produce-card-qty-label">Available Qty</span>
          </div>
        </div>

        {/* Local Meta Info */}
        <div className="produce-card-meta">
          <div className="produce-card-meta-item">
            <svg className="produce-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              {displayLocation}
              {distance && <> • <strong style={{ color: 'var(--primary-800)' }}>{distance}</strong></>}
            </span>
          </div>

          <div className="produce-card-meta-item">
            <svg className="produce-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{displayFarmer}</span>
          </div>

          {formattedDate && (
            <div className="produce-card-meta-item">
              <svg className="produce-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Harvested: <strong>{formattedDate}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Card Action */}
      <div className="produce-card-footer">
        {action ? (
          action
        ) : contactPhone ? (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            href={`tel:${contactPhone}`}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
          >
            Call Farmer ({contactPhone})
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onSelect}
            to={onSelect ? undefined : (actionTo || '/listings')}
          >
            {actionText || 'View Batch Details'}
          </Button>
        )}
      </div>
    </article>
  );
}
