import { PageHeader } from '../components';
import { ProduceFinder } from '../features/finder';

/**
 * Route: /find-produce
 * Entry page for buyers to search and match with nearby small harvests
 */
export default function FindProducePage() {
  return (
    <div className="find-produce-page">
      <PageHeader
        badge="Buyer Discovery"
        title="Find Nearby Produce"
        subtitle="Search fresh 5–20 kg crops harvested right around your neighbourhood with minimal food miles."
        backTo="/"
        backLabel="Back to Home"
      />

      <div className="section section-white">
        <div className="container">
          <ProduceFinder />
        </div>
      </div>
    </div>
  );
}
