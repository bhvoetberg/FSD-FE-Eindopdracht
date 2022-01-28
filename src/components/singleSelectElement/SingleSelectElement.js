import React from 'react';
import './SingleSelectElement.css';

function SingleSelectElement({ errors, register, name, label, validationRules, children }) {
  return (
    <div className="input-type">
      <label htmlFor={`${name}-field`}>
        {label}:
      </label>

      <select {...register(name, validationRules)}>
        {children}
      </select>

      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
}

export default SingleSelectElement;