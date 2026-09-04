import { useState } from 'react';
import { getCurrentLocation } from './locationUtils';
import './location.css';

/**
 * Location Badge Component
 * Allocated for Developer / Branch: features/location (Pubudini)
 * 
 * Reusable location badge and interactive location detector.
 */
export default function LocationBadgePlaceholder({ currentArea = 'Colombo District (Hyperlocal)', onLocationDetected }) {
  const [loading, setLoading] = useState(false);
  const [locationState, setLocationState] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleDetectLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    const result = await getCurrentLocation();
    setLoading(false);

    if (result.success) {
      const locData = {
        latitude: result.latitude,
        longitude: result.longitude,
        displayText: `${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}`
      };
      setLocationState(locData);
      if (onLocationDetected) {
        onLocationDetected(locData);
      }
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="location-badge-wrapper" style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <div 
        className={`location-badge-pill ${loading ? 'loading' : ''}`}
        onClick={handleDetectLocation}
        title="Click to detect current GPS location"
        style={{ cursor: 'pointer' }}
      >
        <span className="location-pin-icon">{loading ? '⏳' : '📍'}</span>
        <span className="location-text">
          {locationState ? `GPS: ${locationState.displayText}` : currentArea}
        </span>
        <span className="location-dev-tag">features/location</span>
      </div>
      {errorMsg && (
        <div className="location-error-msg" style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', fontWeight: 500 }}>
          ⚠️ {errorMsg}
        </div>
      )}
    </div>
  );
}

