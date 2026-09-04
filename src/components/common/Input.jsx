import { forwardRef } from 'react';
import './Input.css';

/**
 * Reusable Form Input Component for GoviLink
 * 
 * @param {string} label - Input label
 * @param {string} helper - Helper/hint text
 * @param {string} error - Validation error message
 * @param {React.ReactNode} prefix - Prefix icon or text (e.g., "LKR")
 * @param {React.ReactNode} suffix - Suffix icon or text (e.g., "kg")
 * @param {boolean} required - Displays required indicator
 */
const Input = forwardRef(function Input(
  {
    id,
    label,
    helper,
    error,
    prefix,
    suffix,
    required = false,
    disabled = false,
    className = '',
    wrapperClassName = '',
    type = 'text',
    ...props
  },
  ref
) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`govi-input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="govi-input-label">
          {label}
          {required && <span className="govi-input-required">*</span>}
        </label>
      )}

      <div
        className={`govi-input-wrapper ${error ? 'govi-input-error' : ''} ${
          disabled ? 'govi-input-disabled' : ''
        } ${wrapperClassName}`}
      >
        {prefix && <span className="govi-input-prefix">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          className="govi-input-field"
          {...props}
        />
        {suffix && <span className="govi-input-suffix">{suffix}</span>}
      </div>

      {error ? (
        <span id={`${inputId}-error`} className="govi-input-error-msg" role="alert">
          {error}
        </span>
      ) : helper ? (
        <span id={`${inputId}-helper`} className="govi-input-helper">
          {helper}
        </span>
      ) : null}
    </div>
  );
});

export default Input;
