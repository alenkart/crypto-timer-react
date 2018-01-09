import React, { Component } from 'react';
import './style.css';

class Timer extends Component {

    constructor() {
        super();
        this.state = {
            time : 0,
        };
    }

    componentDidMount() {
        setInterval(this.callback, 1000);
    }

    callback = () => {

        let time =  0;

        if(this.props.interval < this.state.time + 1) {

            time = 0;

            if(typeof this.props.callback === 'function') {
                this.props.callback();
            }

        } else {

            time = this.state.time + 1;
        }

        this.setState({ time });
    }

    render() {

        return (
            <div className="Timer">
                <span>{this.state.time}</span>
            </div>
        );    
    }

}

Timer.defaultProps = {
    interval: 5,
};

export default Timer;
