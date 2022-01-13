import React from 'react';
import './MultiSelectElement.css';

// Dit kan een radio of checkbox zijn
function MultiSelectElement(
    {errors, register, name, label, validationRules, selectType, value, stateValue}) {
    console.log("state en value")
    console.log(stateValue);
    console.log(value);
    return (
        <>
            <label htmlFor={`${name}-field`}>
                <input
                    ref={register}
                    type={selectType}
                    id={`${name}-field`}
                    value={value}
                    // checked={{stateValue} === {value}}
                    // defaultChecked="true"
                    {...register(name, validationRules)}
                />
                {label}:
            </label>
            {errors[name] && <p>{errors[name].message}</p>}
        </>
    );
}

export default MultiSelectElement;