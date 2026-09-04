import { PageHeader, Button } from '../components';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <PageHeader
        badge="404"
        title="Page Not Found"
        subtitle="The requested page could not be located in GoviLink."
        backTo="/"
        backLabel="Return to Home"
      />
      <div className="section section-white">
        <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Looking for fresh produce or want to post your 5–20 kg harvest?
          </p>
          <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button to="/" variant="primary">Go to Home</Button>
            <Button to="/listings" variant="outline">Browse Listings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
