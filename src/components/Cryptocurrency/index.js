import React from 'react';
import './style.css';

function Cryptocurrency({ pair, last, low, high, onClick }) {

    const token = pair.split(':');

    return (
        <div className="Cryptocurrency" onClick={() => onClick(pair)}>
            <div className="Cryptocurrency-header">{token[0]} : {token[1]}</div>
            <div className="Cryptocurrency-body">{last}</div>
            <div className="Cryptocurrency-fooder">Low : {low} | High : {high}</div>
        </div>
    );
    
}
export default Cryptocurrency;
