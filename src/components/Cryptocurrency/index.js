import React from 'react';
import './style.css';
import Formatter from '../../util/money-formatter';

function Cryptocurrency({ index, pair, low, high, last, prev, onClick}) {

    const token = pair.split(':');

    let bodyClasses = ['Cryptocurrency-body'];

    if(pair === "XRP:USD")
    console.log(pair, "prev", prev, "last", last);

    if (+last !== +prev) {
        //console.log("pair: " + pair + " - last: " + last + " - prev: " + prev)
        bodyClasses.push((+last > +prev ? 'green' : 'red'));
    }

    return (
        <div className="Cryptocurrency">
            <div className="Cryptocurrency-header">
                <span className="icon" id={token[0]}></span>
                <span> {token[0]}</span>
                 { !!index && <div className="up" onClick={() => onClick(pair, 'organize')}>
                    <span></span>
                </div> }
            </div>
            <div className={bodyClasses.join(' ')} onClick={() => onClick(pair, 'chart')}>{token[1]} {Formatter.format(last)}</div>
            <div className="Cryptocurrency-fooder">Low : {Formatter.format(low)} | High : {Formatter.format(high)}</div>
        </div>
    );

}
export default Cryptocurrency;
