import { PageHeader } from '../components';
import { PostHarvestPlaceholder } from '../features/harvest';

/**
 * Route: /post-harvest
 * Entry page for home growers to submit 5–20 kg surplus produce
 */
export default function PostHarvestPage() {
  return (
    <div className="post-harvest-page">
      <PageHeader
        badge="Grower Portal"
        title="Post Your Harvest"
        subtitle="List your fresh 5–20 kg surplus yield for nearby buyers and small eateries in your neighbourhood."
        backTo="/"
        backLabel="Back to Home"
      />

      <div className="section section-white">
        <div className="container">
          <PostHarvestPlaceholder />
        </div>
      </div>
    </div>
  );
}
