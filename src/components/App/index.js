import React, { Component } from 'react';
import './style.css';

import Timer from './../Timer';
import { Line } from 'react-chartjs';
import CurrenciesList from './../CryptocurrenciesList';

class App extends Component {

  constructor() {
    
    super();

    this.counter = 0;
    
    this.state = {
      cryptocurrencies: [],
      inProgress: false,
      selectedCryptoCurrency: 'BTC:USD',
      chartData : {
        labels: [],
        datasets: [{
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data: [],
        }],
      },
    };

  }

  componentDidMount() {
    this.getCurrencies();
  }

  addSelectedCryptoCurrencyData(cryptocurrencies) {

    for(let index in cryptocurrencies) {
      
      const {pair, last} = cryptocurrencies[index];
      
      if(pair === this.state.selectedCryptoCurrency) {
       
          const chartData = this.state.chartData;

          if(chartData.datasets[0].data.length > 7) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
          } else {
            chartData.labels.pop();
            chartData.datasets[0].data.push(+last);
          }

          this.counter++;
          chartData.labels.push(this.counter);
    
          this.setState( { chartData } );
      }

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

        this.setState({ 
          cryptocurrencies: jsonResponse.data,
          inProgress: false
        });

      } catch (e) {

        console.error(e);
      } 

    })();

  }

  click = ( cryptocurrency ) => {

    const chartData = this.state.chartData;
    chartData.datasets[0].data = [];

    this.setState({
      selectedCryptoCurrency: cryptocurrency,
      chartData
    });
  }

  render() {
    return (
      <div className="App">
        <Timer callback={this.getCurrencies.bind(this)}/>
        <span>{this.state.selectedCryptoCurrency}</span>
        <Line data={this.state.chartData}/>
        <CurrenciesList cryptocurrencies={this.state.cryptocurrencies} onClick={this.click}/>
      </div>
    );
  }
}

export default App;
