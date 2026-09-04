import { Link } from 'react-router-dom';
import './PageHeader.css';

/**
 * Reusable PageHeader component for inner pages
 * 
 * @param {string} title - Main header title
 * @param {string} subtitle - Descriptive subtitle / context
 * @param {string} badge - Optional badge text
 * @param {string} backTo - Path to navigate back
 * @param {string} backLabel - Label for the back button
 * @param {React.ReactNode} actions - Optional right-aligned action buttons
 */
export default function PageHeader({
  title,
  subtitle,
  badge,
  backTo = '/',
  backLabel = 'Back to Home',
  actions,
  className = '',
}) {
  return (
    <div className={`govi-page-header ${className}`}>
      <div className="container">
        <div className="govi-header-inner">
          <div className="govi-header-content">
            <div className="govi-header-top">
              {backTo && (
                <Link to={backTo} className="govi-header-back">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  {backLabel}
                </Link>
              )}
              {badge && <span className="badge badge-green">{badge}</span>}
            </div>

            <h1 className="govi-header-title">{title}</h1>
            {subtitle && <p className="govi-header-subtitle">{subtitle}</p>}
          </div>

          {actions && <div className="govi-header-actions">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
