import { Button, Input } from '../../components';
import './harvest.css';

/**
 * Feature Placeholder: Post Harvest
 * Allocated for Developer / Branch: features/harvest
 * 
 * Future logic to implement by harvest team:
 * - Small grower crop registration (5–20 kg)
 * - Harvest date and freshness tagging
 * - Produce photo capture/upload
 * - Supabase database submission
 */
export default function PostHarvestPlaceholder() {
  return (
    <div className="harvest-placeholder-container">
      {/* Dev Branch Notice */}
      <div className="feature-dev-notice">
        <span className="badge badge-amber">Branch: features/harvest</span>
        <p className="feature-dev-text">
          <strong>Grower Submission Module:</strong> This UI is a ready-to-extend scaffolding. Developer working on harvest features can implement form validation, image upload, and Supabase database mutations here.
        </p>
      </div>

      {/* Scaffolding Form Card */}
      <div className="card harvest-form-card">
        <div className="harvest-card-header">
          <div className="harvest-icon-bubble">🌱</div>
          <div>
            <h2 className="harvest-form-title">Post Your Fresh Harvest</h2>
            <p>Ideal for home growers with 5–20 kg surplus batches</p>
          </div>
        </div>

        <form className="harvest-mock-form" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Produce Name / Crop"
            placeholder="e.g. Organic Papaya (පැපොල්), Green Chillies"
            helper="Enter the crop name in English, Sinhala, or Tamil"
            disabled
          />

          <div className="harvest-grid-row">
            <Input
              label="Surplus Quantity"
              type="number"
              placeholder="10"
              suffix="kg (5–20 kg batch)"
              helper="Small-batch hyperlocal harvest"
              disabled
            />
            <Input
              label="Price per kg"
              type="number"
              placeholder="350"
              prefix="Rs."
              helper="Fair price without middleman fee"
              disabled
            />
          </div>

          <Input
            label="Harvest Date / Freshness"
            placeholder="Harvested this morning"
            helper="e.g. Freshly picked today / Ready tomorrow morning"
            disabled
          />

          <div className="harvest-form-actions">
            <Button variant="primary" size="lg" disabled fullWidth>
              Submit 5–20 kg Produce (Feature Under Development)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
