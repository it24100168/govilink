import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Common Footer for GoviLink
 */
export default function Footer() {
  return (
    <footer className="govi-footer">
      <div className="container">
        <div className="govi-footer-grid">
          {/* Brand & Mission */}
          <div className="govi-footer-brand">
            <div className="govi-footer-title">
              Govi<span>Link</span>
            </div>
            <p className="govi-footer-desc">
              Sri Lanka’s hyperlocal agriculture network connecting home-level growers and small-scale farmers having 5–20 kg surplus with nearby households, local eateries, and community buyers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="govi-footer-col">
            <h4 className="govi-footer-heading">Platform</h4>
            <ul className="govi-footer-links">
              <li><Link to="/" className="govi-footer-link">Home</Link></li>
              <li><Link to="/listings" className="govi-footer-link">Available Produce</Link></li>
              <li><Link to="/post-harvest" className="govi-footer-link">Post Harvest (Growers)</Link></li>
              <li><Link to="/find-produce" className="govi-footer-link">Find Produce (Buyers)</Link></li>
            </ul>
          </div>

          {/* Problem & Vision */}
          <div className="govi-footer-col">
            <h4 className="govi-footer-heading">Sri Lanka Hyperlocal</h4>
            <ul className="govi-footer-links">
              <li className="govi-footer-link">5–20 kg Batch Direct Trade</li>
              <li className="govi-footer-link">Zero Wholesale Intermediaries</li>
              <li className="govi-footer-link">Fresh Within Hours of Harvest</li>
              <li className="govi-footer-link">Neighbourhood Pickups</li>
            </ul>
          </div>
        </div>

        <div className="govi-footer-bottom">
          <p>© {new Date().getFullYear()} GoviLink Sri Lanka. Shared Foundation Base.</p>
          <p>Built for collaborative development across 4 modular feature branches.</p>
        </div>
      </div>
    </footer>
  );
}
