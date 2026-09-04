import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Reusable Button Component for GoviLink
 * Supports navigation via React Router (if `to` prop is provided) or native button
 * 
 * @param {'primary' | 'secondary' | 'amber' | 'outline' | 'ghost'} variant - Visual style variant
 * @param {'sm' | 'md' | 'lg'} size - Button size
 * @param {boolean} fullWidth - Whether button takes 100% width
 * @param {React.ReactNode} icon - Optional icon
 * @param {'left' | 'right'} iconPosition - Placement of the icon
 * @param {string} to - React Router destination path
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  to,
  href,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const classNames = [
    'govi-btn',
    `govi-btn-${variant}`,
    `govi-btn-${size}`,
    fullWidth ? 'govi-btn-full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="govi-btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="govi-btn-icon">{icon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classNames} {...props}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classNames} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
