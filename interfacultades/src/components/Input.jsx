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
                className="w-full px-4 py-2 border border-gray-400 rounded-sm shadow-sm focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
        </div>
    )
}

export default Input;