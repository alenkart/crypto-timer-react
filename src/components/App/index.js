import React, { Component } from 'react';
import './style.css';

import Timer from './../Timer';
import { Line } from 'react-chartjs';
import CryptocurrenciesList from './../CryptocurrenciesList';

class App extends Component {

  static storageKeys = {
    pair : 'pair',
    order : 'order'
  };

  constructor() {
    
    super();
    
    const selectedCryptoCurrency = localStorage.getItem(
      App.storageKeys.pair
    );

    this.counter = 0;

    this.state = {
      cryptocurrencies: [],
      inProgress: false,
      selectedCryptoCurrencyPrice: 0,
      selectedCryptoCurrency: selectedCryptoCurrency || 'BTC:USD',
      redraw : false,
      chartData : this.getChartData(),
    };

  }

  componentDidMount() {
    this.getCurrencies();
  }

  getChartData = () => ( {
    labels: [],
    datasets: [{
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data: [],
    }],
  });

  addSelectedCryptoCurrencyData(cryptocurrencies) {

    const prevCryptos = this.state.cryptocurrencies;

    for(let index in cryptocurrencies) {
      
      let crypto = cryptocurrencies[index];
      
      if(crypto.pair === this.state.selectedCryptoCurrency) {
       
          const chartData = this.state.chartData;

          if(chartData.datasets[0].data.length > 7) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
          } else {
            chartData.labels.pop();
            chartData.datasets[0].data.push(+crypto.last);
          }

          this.counter++;
          chartData.labels.push(this.counter);
    
          this.setState({ 
            chartData, 
            redraw : false, 
            selectedCryptoCurrencyPrice: crypto.last 
          });
      }
      
      const prevCrypto = prevCryptos.find(prevCrypto => prevCrypto.pair === crypto.pair);

      crypto.prev = prevCrypto ? prevCrypto.last : crypto.last;

    }

  }

  getCurrencies() {

    if(this.state.inProgress) {
      return;
    }

    (async () => {

      const api = 'https://cex.io/api/tickers/USD';      

      this.setState({ inProgress: true });
      
      try {

        const response = await fetch(api);
        const jsonResponse = await response.json();

        if(!jsonResponse || !jsonResponse.data) {
          return;
        }

        this.addSelectedCryptoCurrencyData(jsonResponse.data);

        const cryptocurrencies = this.getOrder(jsonResponse.data) || jsonResponse.data;

        this.setState({ 
          cryptocurrencies,
          inProgress: false,
        });

      } catch (e) {

        console.error(e);
      } 

    })();

  }

  getOrder(data) {

    const cryptocurrencies = [];
    
    let order = localStorage.getItem(App.storageKeys.order);

    if(!order) {
      return;
    }

    order = order.split(',');

    const newCryptos = data
    .filter(currency => !order.includes(currency.pair))
    .map(currency => currency.pair);

    order = order.concat(newCryptos);

    order.forEach((pair, index) => {

      const cryptocurrency = data.find(currency => currency.pair === pair);

      if(cryptocurrency) {
        cryptocurrencies[index] = cryptocurrency;          
      }
      
    });

    return cryptocurrencies;
  }

  updateChart(cryptocurrency) {

    localStorage.setItem(App.storageKeys.pair, cryptocurrency);

    const chartData = this.state.chartData;
    chartData.datasets[0].data = [];
    chartData.labels = [];
    this.counter = 0;

    this.setState({
      selectedCryptoCurrency: cryptocurrency,
      chartData: chartData,
      redraw : true,
    });

    this.getCurrencies();

  }

  updateOrder(pair) {
    
    const { cryptocurrencies } = this.state;
    let index = cryptocurrencies.findIndex(currency => currency.pair === pair);
    const cryptocurrency = cryptocurrencies[index];

    if(index === 0) {
      return;
    }

    cryptocurrencies.splice(index, 1);

    index--;
    cryptocurrencies.splice(index, 0, cryptocurrency);
    this.setState({ cryptocurrencies });

    const newOrder = cryptocurrencies.map(currency => currency.pair);
    localStorage.setItem(App.storageKeys.order, newOrder.join(','));
  }

  click = ( cryptocurrency, type ) => {

    if(type === 'chart') {
      this.updateChart(cryptocurrency);
    } else {
      this.updateOrder(cryptocurrency);
    }

  }

  render() {
    return (
      <div className="App">
        <Timer callback={this.getCurrencies.bind(this)}/>
        <span>{this.state.selectedCryptoCurrency} | ${this.state.selectedCryptoCurrencyPrice}</span>
        <Line data={this.state.chartData} redraw={this.state.redraw}/>
        <CryptocurrenciesList 
          cryptocurrencies={this.state.cryptocurrencies} 
          onClick={this.click}/>
      </div>
    );
  }
}

export default App;
