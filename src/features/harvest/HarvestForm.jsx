import { useState } from 'react';
import { Button, Input } from '../../components';
import supabaseClient, { supabase as namedSupabase } from '../../lib/supabase';
import './harvest.css';

// Support both named and default exports from src/lib/supabase.js
const supabase = namedSupabase || supabaseClient;

// Common Sri Lankan produce shortcuts for quick selection
const QUICK_PRODUCE_SUGGESTIONS = [
  'Gotukola (ගොටුකොළ)',
  'Organic Papaya (පැපොල්)',
  'Green Chilli (අමු මිරිස්)',
  'Kohila (කොහිල)',
  'Ambul Banana (ඇඹුල් කෙසෙල්)',
  'Winged Beans (දඹල)',
  'Drumstick / Murunga (මුරුංගා)',
  'Curry Leaves (කරපිංචා)',
];

const INITIAL_FORM_STATE = {
  farmerName: '',
  produce: '',
  quantityKg: '',
  pricePerKg: '',
  locationName: '',
  phone: '',
  harvestDate: new Date().toISOString().split('T')[0], // Default to today
  latitude: '',
  longitude: '',
};

/**
 * Validates Sri Lankan phone numbers:
 * - 07XXXXXXXX (10 digits starting with 0)
 * - +947XXXXXXXX, 947XXXXXXXX, 00947XXXXXXXX
 * - Landline prefixes (011, 081, 033, etc.)
 */
function isValidSriLankanPhone(phone) {
  if (!phone) return false;
  const clean = phone.replace(/[\s\-()]/g, '');
  // Matches Sri Lankan mobile (07X) or landlines, with or without +94 / 94 / 0094 / 0
  const lkRegex = /^(?:(?:\+94|0094|94)?(?:7[0-9]|11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)\d{7}|0\d{9})$/;
  return lkRegex.test(clean);
}

/**
 * Farmer Harvest Submission Form Component
 * Handles validation, coordinate readiness, and Supabase insertion to `harvest_listings`
 */
export default function HarvestForm({
  initialLatitude = null,
  initialLongitude = null,
  onSuccessCallback,
}) {
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_STATE,
    latitude: initialLatitude ?? '',
    longitude: initialLongitude ?? '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showCoordinateSettings, setShowCoordinateSettings] = useState(false);

  // Field change handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on edit if it was present
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Single field validation
  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case 'farmerName':
        if (!value || !value.trim()) {
          error = 'Farmer name is required';
        } else if (value.trim().length < 2) {
          error = 'Farmer name must be at least 2 characters';
        }
        break;

      case 'produce':
        if (!value || !value.trim()) {
          error = 'Produce name is required';
        }
        break;

      case 'quantityKg': {
        const qty = parseFloat(value);
        if (value === '' || value === null || value === undefined) {
          error = 'Available quantity is required';
        } else if (isNaN(qty) || qty <= 0) {
          error = 'Quantity must be greater than 0 kg';
        }
        break;
      }

      case 'pricePerKg': {
        const price = parseFloat(value);
        if (value === '' || value === null || value === undefined) {
          error = 'Price per kg is required';
        } else if (isNaN(price) || price <= 0) {
          error = 'Price must be greater than 0 LKR';
        }
        break;
      }

      case 'locationName':
        if (!value || !value.trim()) {
          error = 'Location name is required (e.g. Kaduwela, Maharagama)';
        }
        break;

      case 'phone':
        if (!value || !value.trim()) {
          error = 'Phone number is required for buyers to contact you';
        } else if (!isValidSriLankanPhone(value)) {
          error = 'Please enter a valid Sri Lankan phone number (e.g. 0771234567 or +94771234567)';
        }
        break;

      case 'harvestDate':
        if (!value) {
          error = 'Harvest date is required';
        } else if (isNaN(new Date(value).getTime())) {
          error = 'Please enter a valid date';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.farmerName || !formData.farmerName.trim()) {
      newErrors.farmerName = 'Farmer name is required';
    }

    if (!formData.produce || !formData.produce.trim()) {
      newErrors.produce = 'Produce name is required';
    }

    const qty = parseFloat(formData.quantityKg);
    if (formData.quantityKg === '' || isNaN(qty) || qty <= 0) {
      newErrors.quantityKg = 'Quantity must be greater than 0 kg';
    }

    const price = parseFloat(formData.pricePerKg);
    if (formData.pricePerKg === '' || isNaN(price) || price <= 0) {
      newErrors.pricePerKg = 'Price must be greater than 0 LKR';
    }

    if (!formData.locationName || !formData.locationName.trim()) {
      newErrors.locationName = 'Location name is required';
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidSriLankanPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Sri Lankan phone number (e.g. 0771234567 or +94771234567)';
    }

    if (!formData.harvestDate) {
      newErrors.harvestDate = 'Harvest date is required';
    } else if (isNaN(new Date(formData.harvestDate).getTime())) {
      newErrors.harvestDate = 'Please select a valid date';
    }

    setErrors(newErrors);
    // Mark all as touched
    setTouched({
      farmerName: true,
      produce: true,
      quantityKg: true,
      pricePerKg: true,
      locationName: true,
      phone: true,
      harvestDate: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Gracefully verify Supabase client
      if (!supabase || typeof supabase.from !== 'function') {
        throw new Error(
          'Supabase client is not initialized in src/lib/supabase.js. Please check your Supabase credentials or environment variables.'
        );
      }

      const payload = {
        farmer_name: formData.farmerName.trim(),
        produce: formData.produce.trim(),
        quantity_kg: parseFloat(formData.quantityKg),
        price_per_kg: parseFloat(formData.pricePerKg),
        location_name: formData.locationName.trim(),
        latitude:
          formData.latitude !== '' && formData.latitude !== null && !isNaN(parseFloat(formData.latitude))
            ? parseFloat(formData.latitude)
            : null,
        longitude:
          formData.longitude !== '' && formData.longitude !== null && !isNaN(parseFloat(formData.longitude))
            ? parseFloat(formData.longitude)
            : null,
        phone: formData.phone.trim(),
        harvest_date: formData.harvestDate,
        available: true,
      };

      const { data, error } = await supabase.from('harvest_listings').insert([payload]).select();

      if (error) {
        throw error;
      }

      // Record submitted data for success view
      setSubmittedData({
        ...payload,
        id: data && data[0] ? data[0].id : null,
      });

      // Clear the form after successful submission
      setFormData({
        ...INITIAL_FORM_STATE,
        harvestDate: new Date().toISOString().split('T')[0],
      });
      setErrors({});
      setTouched({});

      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    } catch (err) {
      console.error('Error inserting harvest listing:', err);
      setSubmitError(
        err.message || 'An unexpected error occurred while submitting your harvest. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setSubmitError(null);
    setFormData({
      ...INITIAL_FORM_STATE,
      harvestDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="harvest-form-container">
      {/* SUCCESS STATE BANNER */}
      {submittedData && (
        <div className="card harvest-success-card animate-fade-in" role="status">
          <div className="harvest-success-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <div className="harvest-success-content">
            <h3 className="harvest-success-title">Harvest Listed Successfully!</h3>
            <p className="harvest-success-desc">
              Your <strong>{submittedData.quantity_kg} kg</strong> batch of <strong>{submittedData.produce}</strong> is now live for nearby buyers in <strong>{submittedData.location_name}</strong>.
            </p>

            <div className="harvest-success-details-pill">
              <span>🌾 <strong>{submittedData.produce}</strong></span>
              <span>⚖️ <strong>{submittedData.quantity_kg} kg</strong></span>
              <span>💰 <strong>Rs. {submittedData.price_per_kg}/kg</strong></span>
              <span>📍 <strong>{submittedData.location_name}</strong></span>
              <span>📞 <strong>{submittedData.phone}</strong></span>
            </div>

            <div className="harvest-success-actions">
              <Button variant="primary" size="md" onClick={handleReset}>
                + Post Another Harvest
              </Button>
              <Button to="/listings" variant="outline" size="md">
                Browse Produce Marketplace
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FORM CARD */}
      <div className="card harvest-form-card">
        <div className="harvest-card-header">
          <div className="harvest-icon-bubble">🌱</div>
          <div>
            <h2 className="harvest-form-title">List Your Fresh Produce</h2>
            <p>Connect directly with nearby households and small buyers</p>
          </div>
        </div>

        {/* SUPABASE ERROR ALERT */}
        {submitError && (
          <div className="harvest-error-alert" role="alert">
            <div className="harvest-error-icon">⚠️</div>
            <div className="harvest-error-text">
              <strong>Submission Failed:</strong>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <form className="harvest-form" onSubmit={handleSubmit} noValidate>
          {/* Quick Produce Suggestions */}
          <div className="harvest-quick-suggestions">
            <span className="quick-suggestion-label">Quick Suggestions:</span>
            <div className="quick-chip-group">
              {QUICK_PRODUCE_SUGGESTIONS.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`quick-chip ${formData.produce === item ? 'active' : ''}`}
                  onClick={() => handleChange('produce', item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Row 1: Farmer Name & Produce */}
          <div className="harvest-grid-row">
            <Input
              id="harvest-farmer-name"
              label="Farmer / Grower Name"
              placeholder="e.g. Kamal Perera, Nimali Silva"
              value={formData.farmerName}
              onChange={(e) => handleChange('farmerName', e.target.value)}
              onBlur={() => handleBlur('farmerName')}
              error={touched.farmerName ? errors.farmerName : undefined}
              helper="Your name or farm garden name"
              required
            />

            <Input
              id="harvest-produce"
              label="Produce Name"
              placeholder="e.g. Organic Papaya, Gotukola, Green Chilli"
              value={formData.produce}
              onChange={(e) => handleChange('produce', e.target.value)}
              onBlur={() => handleBlur('produce')}
              error={touched.produce ? errors.produce : undefined}
              helper="Enter the crop name in English, Sinhala, or Tamil"
              required
            />
          </div>

          {/* Row 2: Quantity in kg & Price per kg */}
          <div className="harvest-grid-row">
            <Input
              id="harvest-quantity"
              label="Available Quantity"
              type="number"
              step="0.1"
              min="0.1"
              placeholder="e.g. 10"
              suffix="kg"
              value={formData.quantityKg}
              onChange={(e) => handleChange('quantityKg', e.target.value)}
              onBlur={() => handleBlur('quantityKg')}
              error={touched.quantityKg ? errors.quantityKg : undefined}
              helper="Ideal for 5–20 kg surplus home harvests"
              required
            />

            <Input
              id="harvest-price"
              label="Price per kg"
              type="number"
              step="1"
              min="1"
              placeholder="e.g. 250"
              prefix="Rs."
              value={formData.pricePerKg}
              onChange={(e) => handleChange('pricePerKg', e.target.value)}
              onBlur={() => handleBlur('pricePerKg')}
              error={touched.pricePerKg ? errors.pricePerKg : undefined}
              helper="Fair price in Sri Lankan Rupees"
              required
            />
          </div>

          {/* Row 3: Location Name & Phone Number */}
          <div className="harvest-grid-row">
            <Input
              id="harvest-location-name"
              label="Location / Area Name"
              placeholder="e.g. Kaduwela, Maharagama, Gampaha"
              prefix="📍"
              value={formData.locationName}
              onChange={(e) => handleChange('locationName', e.target.value)}
              onBlur={() => handleBlur('locationName')}
              error={touched.locationName ? errors.locationName : undefined}
              helper="Your village, town, or neighbourhood"
              required
            />

            <Input
              id="harvest-phone"
              label="Contact Phone Number"
              type="tel"
              placeholder="e.g. 0771234567 or +94771234567"
              prefix="📞"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              error={touched.phone ? errors.phone : undefined}
              helper="Sri Lankan mobile / landline for buyer pickup coordination"
              required
            />
          </div>

          {/* Row 4: Harvest Date */}
          <div className="harvest-grid-row">
            <Input
              id="harvest-date"
              label="Harvest Date"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => handleChange('harvestDate', e.target.value)}
              onBlur={() => handleBlur('harvestDate')}
              error={touched.harvestDate ? errors.harvestDate : undefined}
              helper="Date harvested or scheduled to be picked"
              required
            />

            {/* Hyperlocal 5–20 kg Benefit Banner */}
            <div className="harvest-info-callout">
              <span className="info-callout-icon">💡</span>
              <div className="info-callout-text">
                <strong>Hyperlocal Direct Benefit:</strong> Small 5–20 kg batches save you from transport costs to distant wholesale markets like Dambulla or Manning.
              </div>
            </div>
          </div>

          {/* COORDINATE READINESS SECTION (For Location Module Integration) */}
          <div className="harvest-coords-section">
            <div className="coords-header" onClick={() => setShowCoordinateSettings((p) => !p)}>
              <div className="coords-title-wrap">
                <span className="badge badge-blue">Location Ready</span>
                <span className="coords-title">
                  Coordinates: {formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : 'Not specified (Ready for location module)'}
                </span>
              </div>
              <button
                type="button"
                className="coords-toggle-btn"
                aria-label="Toggle Coordinates"
                aria-expanded={showCoordinateSettings}
              >
                {showCoordinateSettings ? 'Hide' : 'Configure (Optional)'}
              </button>
            </div>

            {showCoordinateSettings && (
              <div className="coords-body animate-fade-in">
                <p className="coords-helper-text">
                  These fields store GPS latitude and longitude for the location matching algorithm. They will be automatically populated once the location module is integrated.
                </p>
                <div className="harvest-grid-row">
                  <Input
                    label="Latitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 6.9271"
                    value={formData.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                    helper="Decimal degrees (e.g. 6.9271)"
                  />
                  <Input
                    label="Longitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 79.8612"
                    value={formData.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                    helper="Decimal degrees (e.g. 79.8612)"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="harvest-form-actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              icon={
                isSubmitting ? (
                  <svg className="govi-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                )
              }
              iconPosition="right"
            >
              {isSubmitting ? 'Publishing Harvest Listing...' : 'Publish 5–20 kg Harvest Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
