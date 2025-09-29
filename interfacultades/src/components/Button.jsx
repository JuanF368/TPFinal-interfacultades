import React from 'react';
import { Link } from 'react-router';

const Button = ({text, url}) => {
    return (
        // sin color pero con borde  y texto blanco
        <Link to={url}>
            <button className="px-4 py-2 border border-white text-white rounded hover:bg-[#3A64BA] cursor-pointer">
                {text}
            </button>
        </Link>
    );
};

export default Button;