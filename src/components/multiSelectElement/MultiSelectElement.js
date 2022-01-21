import React from 'react';
import './MultiSelectElement.css';

// Dit kan een radio of checkbox zijn
function MultiSelectElement(
    {errors, register, name, label, validationRules, selectType, value, labelId}) {
    return (
        <div className="input-type">
            <label htmlFor={`${name}-field`} id={labelId}>
                {label}
            </label>
            <input
                type={selectType}
                id={`${name}-field`}
                value={value}
                {...register(name, validationRules)}
            />
            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
}

export default MultiSelectElement;