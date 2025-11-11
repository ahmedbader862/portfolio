import React from 'react';
import './AnimatedButton.css';

function AnimatedButton({ 
  text, 
  onClick, 
  ariaLabel, 
  className = '', 
  disabled = false,
  type = 'button',
  initialOpacity = 1, // درجة اللون الأولية (قبل الأيفيكت)
  hoverOpacity = 0.7    // درجة اللون عند الhover (بعد الأيفيكت)
}) {
  const buttonStyle = {
    '--btn-initial-opacity': initialOpacity,
    '--btn-hover-opacity': hoverOpacity
  };

  return (
    <button 
      className={`animated-btn ${className}`}
      aria-label={ariaLabel || text}
      data-text={text}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={buttonStyle}
    >
      <span data-text={text} className="animated-btn-content">
        <span className="animated-btn-text">{text}</span>
      </span>
    </button>
  );
}

export default AnimatedButton;
