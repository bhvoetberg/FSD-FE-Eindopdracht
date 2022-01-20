import React from 'react';
import './Button.css';

function Button({ children, disabled, type }) {
  return (
    <button type={type} disabled={disabled}>
      { children }
    </button>
  );
}

export default Button;