import React, { useState } from "react";

const Input = ({name, value, type, onChange, placeHolder}) => {

    return(
        <div className="mb-4">
            <input
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeHolder}
                className="w-full px-4 py-2 border rounded-sm shadow-sm focus:ring-blue-500 focus:outline-none"
            />
        </div>
    )
}

export default Input;