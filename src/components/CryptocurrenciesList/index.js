import React, { Component } from 'react';
import './style.css';

import Cryptocurrency from './../Cryptocurrency';

class CryptocurrenciesList extends Component {

    getCryptocurrenciesList() {

        return this.props.cryptocurrencies.map((currency, key) => {
           
            return <Cryptocurrency
                key={`${currency.pair}-${key}`}
                {...currency}
                onClick={this.props.onClick} />
        }
        );
    }

    render() {
        return (
            <div className="CryptocurrenciesList">{this.getCryptocurrenciesList()}</div>
        );
    }

}

export default CryptocurrenciesList;