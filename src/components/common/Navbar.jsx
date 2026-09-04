import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

/**
 * Shared Responsive Navigation Bar for GoviLink
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="govi-navbar">
      <div className="container">
        <div className="govi-navbar-inner">
          {/* Logo / Brand */}
          <Link to="/" className="govi-brand" onClick={closeMobileMenu}>
            <div className="govi-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4" />
                <path d="M12 2a10 10 0 0 1 10 10c0 4-2.5 7.5-6.1 9" />
                <path d="M12 22V12" />
                <path d="M12 12c2.5-2.5 6-3 6-3s-.5 3.5-3 6" />
                <path d="M12 16c-2 0-4-1-4-3s2-2 4-2" />
              </svg>
            </div>
            <div className="govi-brand-text">
              <span className="govi-brand-title">Govi<span>Link</span></span>
              <span className="govi-brand-subtitle">Hyperlocal LK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="govi-nav-links" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `govi-nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/listings"
              className={({ isActive }) => `govi-nav-link ${isActive ? 'active' : ''}`}
            >
              Available Produce
            </NavLink>
            <NavLink
              to="/find-produce"
              className={({ isActive }) => `govi-nav-link ${isActive ? 'active' : ''}`}
            >
              Find Produce
            </NavLink>
            <NavLink
              to="/post-harvest"
              className={({ isActive }) => `govi-nav-link ${isActive ? 'active' : ''}`}
            >
              Post Harvest
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="govi-nav-actions">
            <Button to="/find-produce" variant="outline" size="sm">
              Find Nearby
            </Button>
            <Button
              to="/post-harvest"
              variant="primary"
              size="sm"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              }
            >
              Post Harvest
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="govi-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="govi-mobile-menu">
          <NavLink
            to="/"
            className={({ isActive }) => `govi-mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) => `govi-mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Available Produce
          </NavLink>
          <NavLink
            to="/find-produce"
            className={({ isActive }) => `govi-mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Find Produce
          </NavLink>
          <NavLink
            to="/post-harvest"
            className={({ isActive }) => `govi-mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Post Harvest
          </NavLink>

          <div className="govi-mobile-actions">
            <Button
              to="/post-harvest"
              variant="primary"
              size="md"
              fullWidth
              onClick={closeMobileMenu}
            >
              I Have Produce (Sell 5–20 kg)
            </Button>
            <Button
              to="/find-produce"
              variant="outline"
              size="md"
              fullWidth
              onClick={closeMobileMenu}
            >
              I Need Produce (Find Local)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
