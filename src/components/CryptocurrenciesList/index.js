import React, { Component } from 'react';
import './style.css';

import Cryptocurrency from './../Cryptocurrency';

class CryptocurrenciesList extends Component {

    getCryptocurrenciesList() {

        const { cryptocurrencies } = this.props;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          });
       
        return cryptocurrencies.map((currency, key) =>  {
            return <Cryptocurrency 
                key={`${currency.pair}-${key}`}
                pair={currency.pair} 
                high={formatter.format(currency.high)}
                last={formatter.format(currency.last)}
                low={formatter.format(currency.low)}/>
            } 
        );
    }

    render() {

        return(
            <div className="CryptocurrenciesList">{this.getCryptocurrenciesList()}</div>
        );
    }

}


export default CryptocurrenciesList;