import React from 'react';

interface CardProps {
    rows?: string[];
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ rows, children }) => {
    return (
        <tr className='card'>
        {rows && rows.map((row, index) => (
            <td key={index}>{row}</td>
        ))}
        {children}
        </tr>
    );
};

export default Card;