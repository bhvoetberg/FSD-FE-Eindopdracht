import React from "react";


function InputElement({type, name, placeholder, display, id, value, checked}) {
    return (
        <label htmlFor={id}>{display}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                display={display}
                id={id}
                value={value}
                checked={checked}
            />
        </label>
    );
}

export default InputElement;