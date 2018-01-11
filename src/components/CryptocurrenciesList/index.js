import React, { Component } from 'react';
import './style.css';

import Cryptocurrency from './../Cryptocurrency';

class CryptocurrenciesList extends Component {

    getCryptocurrenciesList() {

        return this.props.cryptocurrencies.map((currency, index) => {
           
            return <Cryptocurrency
                key={`${currency.pair}-${index}`}
                {...currency}
                onClick={this.props.onClick}
                index={index}/>
        });
    }

    render() {

        return (
            <div className="CryptocurrenciesList">{this.getCryptocurrenciesList()}</div>
        );
    }

}

export default CryptocurrenciesList;