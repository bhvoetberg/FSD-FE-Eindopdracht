import React from 'react';

import './InputElement.css';

function InputElement({ errors, register, name, value, label, placeholder, disabled, inputType, validationRules }) {

    return (
        <div className="input-type">
            <label htmlFor={`${name}-field`}>
                {label}
            </label>
            {inputType === "textarea"
                ? <textarea id={`${name}-field`} cols="30" rows="6" {...register(name, validationRules)}></textarea>
                : (<>
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        placeholder={placeholder}
                        defaultValue={value}
                        disabled={disabled}
                        {...register(name, validationRules)}

                    />
                    {errors[name] && <p>{errors[name].message}</p>}
                </>)}
        </div>
    );
}

export default InputElement;