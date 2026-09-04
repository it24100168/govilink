import { PageHeader, Button } from '../components';
import { MarketplaceFeed } from '../features/marketplace';

/**
 * Route: /listings
 * Available Produce Directory
 */
export default function ListingsPage() {
  return (
    <div className="listings-page">
      <PageHeader
        badge="Hyperlocal Market"
        title="Available Produce"
        subtitle="Explore active 5–20 kg batches harvested by home growers and small farmers across Sri Lanka."
        backTo="/"
        backLabel="Back to Home"
        actions={
          <Button
            to="/post-harvest"
            variant="primary"
            size="md"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
          >
            Post Your Harvest
          </Button>
        }
      />

      <div className="section section-white">
        <div className="container">
          <MarketplaceFeed />
        </div>
      </div>
    </div>
  );
}

