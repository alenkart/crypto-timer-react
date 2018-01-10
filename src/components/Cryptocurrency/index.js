import React from 'react';
import './style.css';
import Formatter from '../../util/money-formatter';

function Cryptocurrency({ pair, low, high, last, prev, onClick }) {

    const token = pair.split(':');

    let bodyClasses = ['Cryptocurrency-body'];


    if (+last !== +prev) {
        console.log("pair: " + pair + " - last: " + last + " - prev: " + prev)
        bodyClasses.push((+last > +prev ? 'green' : 'red'));
    }

    return (
        <div className="Cryptocurrency" onClick={() => onClick(pair)}>
            <div className="Cryptocurrency-header">
                <span className="icon" id={token[0]}></span>
                <span> {token[0]}</span>
            </div>
            <div className={bodyClasses.join(' ')}>{token[1]} {Formatter.format(last)}</div>
            <div className="Cryptocurrency-fooder">Low : {Formatter.format(low)} | High : {Formatter.format(high)}</div>
        </div>
    );

}
export default Cryptocurrency;
