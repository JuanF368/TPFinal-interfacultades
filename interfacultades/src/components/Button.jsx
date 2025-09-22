import React from 'react';
import { Link } from 'react-router';

const Button = ({text, url}) => {
    return (
        <Link to={url}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                {text}
            </button>
        </Link>
    );
};

export default Button;