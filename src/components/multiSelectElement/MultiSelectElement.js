import React from 'react';
import './MultiSelectElement.css';

// Dit kan een radio of checkbox zijn
function MultiSelectElement({ errors, register, name, label, validationRules, selectType, value }) {
  return (
    <>
      <label htmlFor={`${name}-field`}>
        <input
          type={selectType}
          id={`${name}-field`}
          value={value}
          {...register(name, validationRules)}
        />
        {label}:
      </label>
      {errors[name] && <p>{errors[name].message}</p>}
    </>
  );
}

export default MultiSelectElement;