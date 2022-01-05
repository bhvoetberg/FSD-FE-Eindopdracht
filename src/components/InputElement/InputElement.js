import React from 'react';
import 'InputElement.css';

function InputElement({ errors, register, name, label, inputType, validationRules }) {
    return (
        <>
            <label htmlFor={`${name}-field`}>
                {label}:
            </label>

            {/*Ternary operator om een textarea of een normaal input-veld weer te geven*/}
            {inputType === "textarea"
                ? <textarea id={`${name}-field`} cols="30" rows="10" {...register(name, validationRules)}></textarea>
                : (<>
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        {...register(name, validationRules)}
                    />
                    {errors[name] && <p>{errors[name].message}</p>}
                </>)}
        </>
    );
}

export default InputElement;