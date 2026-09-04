/**
 * Location & Distance Matching Module for GoviLink
 * Developer: Pubudini
 * 
 * Simple, clean, and reusable utilities for:
 * 1. Browser Geolocation API integration (getCurrentLocation)
 * 2. Haversine Distance calculation in km (calculateDistance)
 * 3. Sorting harvest listings by nearest to farthest (sortByNearest)
 */

/**
 * Requests the user's current location using the browser Geolocation API.
 * Handles permission denied, location unavailable, timeout, and unsupported browser cases.
 * 
 * @param {PositionOptions} [options] - Geolocation configuration options
 * @returns {Promise<{success: boolean, latitude?: number, longitude?: number, coords?: {latitude: number, longitude: number}, error?: string, code?: string}>}
 */
export function getCurrentLocation(options = { timeout: 10000, enableHighAccuracy: true }) {
  return new Promise((resolve) => {
    // Check if Geolocation API is supported in the current environment
    if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
      return resolve({
        success: false,
        error: 'Geolocation is not supported by your browser.',
        code: 'NOT_SUPPORTED',
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        resolve({
          success: true,
          latitude: lat,
          longitude: lon,
          coords: {
            latitude: lat,
            longitude: lon,
          },
        });
      },
      (error) => {
        let errorMessage = 'An error occurred while retrieving your location.';
        let errorCode = 'UNKNOWN';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in browser settings.';
            errorCode = 'PERMISSION_DENIED';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is currently unavailable.';
            errorCode = 'POSITION_UNAVAILABLE';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            errorCode = 'TIMEOUT';
            break;
          default:
            errorMessage = error.message || errorMessage;
            break;
        }

        resolve({
          success: false,
          error: errorMessage,
          code: errorCode,
        });
      },
      options
    );
  });
}

/**
 * Calculates the Haversine distance between two geographic coordinates in kilometers.
 * 
 * Formula:
 * a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
 * c = 2 * atan2(√a, √(1-a))
 * d = R * c (where R = 6371 km)
 * 
 * @param {number|string} lat1 - Latitude of origin
 * @param {number|string} lon1 - Longitude of origin
 * @param {number|string} lat2 - Latitude of destination
 * @param {number|string} lon2 - Longitude of destination
 * @returns {number} Approximate distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const p1Lat = parseFloat(lat1);
  const p1Lon = parseFloat(lon1);
  const p2Lat = parseFloat(lat2);
  const p2Lon = parseFloat(lon2);

  // Return 0 if coordinates are invalid
  if (isNaN(p1Lat) || isNaN(p1Lon) || isNaN(p2Lat) || isNaN(p2Lon)) {
    return 0;
  }

  const EARTH_RADIUS_KM = 6371;

  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const dLat = toRadians(p2Lat - p1Lat);
  const dLon = toRadians(p2Lon - p1Lon);

  const radLat1 = toRadians(p1Lat);
  const radLat2 = toRadians(p2Lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_KM * c;

  // Return rounded to 1 decimal place
  return Math.round(distance * 10) / 10;
}

/**
 * Takes an array of harvest listings plus buyer coordinates and returns listings sorted from nearest to farthest.
 * Appends a `distance` property (in km) to each returned listing item.
 * 
 * @param {Array<Object>} listings - Array of harvest listing objects
 * @param {number|string|Object} buyerLatOrCoords - Buyer latitude OR buyer coordinates object ({ latitude, longitude })
 * @param {number|string} [buyerLon] - Buyer longitude (if buyerLatOrCoords is latitude number)
 * @returns {Array<Object>} Array of listings sorted by nearest distance
 */
export function sortByNearest(listings, buyerLatOrCoords, buyerLon) {
  if (!Array.isArray(listings)) return [];

  let bLat, bLon;

  if (typeof buyerLatOrCoords === 'object' && buyerLatOrCoords !== null) {
    bLat = buyerLatOrCoords.latitude ?? buyerLatOrCoords.lat;
    bLon = buyerLatOrCoords.longitude ?? buyerLatOrCoords.lng ?? buyerLatOrCoords.lon;
  } else {
    bLat = buyerLatOrCoords;
    bLon = buyerLon;
  }

  const buyerLatNum = parseFloat(bLat);
  const buyerLonNum = parseFloat(bLon);

  // If buyer coordinates are invalid, return listings copy as-is with distance 0
  if (isNaN(buyerLatNum) || isNaN(buyerLonNum)) {
    return listings.map((listing) => ({ ...listing, distance: 0 }));
  }

  // Calculate distance for each listing
  const listingsWithDistance = listings.map((listing) => {
    const itemLat =
      listing.latitude ??
      listing.lat ??
      (listing.location && (listing.location.latitude ?? listing.location.lat));

    const itemLon =
      listing.longitude ??
      listing.lng ??
      listing.lon ??
      (listing.location && (listing.location.longitude ?? listing.location.lng ?? listing.location.lon));

    const distance = calculateDistance(buyerLatNum, buyerLonNum, itemLat, itemLon);

    return {
      ...listing,
      distance,
    };
  });

  // Sort ascending by distance (nearest to farthest)
  return listingsWithDistance.sort((a, b) => a.distance - b.distance);
}

// Aliases for intuitive imports in other modules
export const sortListingsByDistance = sortByNearest;
export const getNearestListings = sortByNearest;
