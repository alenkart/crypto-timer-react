import React from 'react';
import './style.css';

function Cryptocurrency({ pair, last, low, high }) {

    pair = pair.split(':');

    return (
        <div className="Cryptocurrency">
            <span>{}</span>
            <div className="Cryptocurrency-header">{pair[0]} : {pair[1]}</div>
            <div className="Cryptocurrency-body">{last}</div>
            <div className="Cryptocurrency-fooder">Low : {low} | High : {high}</div>
        </div>
    );
    
}
export default Cryptocurrency;
