import React from 'react';
import './Button.css';



// const encoded = btoa(fileToEncode);
// const decoded = atob(fileToDecode);



function Button({ children, disabled, type }) {
  return (
    <button type={type} disabled={disabled}>
      { children }
    </button>
  );
}

export default Button;