import React from 'react';
import './SingleSelectElement.css';

function SingleSelectElement({ errors, register, name, label, validationRules, children }) {
  return (
    <>
      <label htmlFor={`${name}-field`}>
        {label}:
      </label>

      <select {...register(name, validationRules)}>
        {children}
      </select>

      {errors[name] && <p>{errors[name].message}</p>}
    </>
  );
}

export default SingleSelectElement;