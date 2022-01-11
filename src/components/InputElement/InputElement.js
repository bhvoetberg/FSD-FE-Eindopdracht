import React from 'react';

function InputElement({ errors, register, name, placeholder, inputType, validationRules }) {
    return (
        <>
            <label htmlFor={`${name}-field`}>
            </label>
            {inputType === "textarea"
                ? <textarea id={`${name}-field`} cols="30" rows="10" {...register(name, validationRules)}></textarea>
                : (<>
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        placeholder={placeholder}
                        {...register(name, validationRules)}
                    />
                    {errors[name] && <p>{errors[name].message}</p>}
                </>)}
        </>
    );
}

export default InputElement;