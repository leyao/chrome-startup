import React, { Component } from 'react';
import Constants from './constants';
import './App.css';

class ChromeStartup extends Component {
  constructor() {
    super();

    this.state = {
      curTime: '',
      curDate: '',
      bgColour: ''
    };
  }

  componentDidMount() {
    var dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
    var timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    setInterval( () => {
      var time = new Date();
      var timeInMs = time.getHours() * Constants.HOUR_IN_MS + time.getMinutes() * Constants.MINUTE_IN_MS +
                     time.getSeconds() * Constants.SECOND_IN_MS + time.getMilliseconds();
      var bgColour = Math.round(timeInMs / Constants.DAY_IN_MS * Constants.MAX_HEX_VALUE).toString(16)
      if (bgColour.length < 6) {
        bgColour = '0'.repeat(6 - bgColour.length) + bgColour;
      }

      this.setState({
        curDate: time.toLocaleString('en-US', dateOptions),
        curTime: time.toLocaleString('en-US', timeOptions),
        bgColour: bgColour
      });
    }, 1000);
  }

  getBgColour() {
    return {
      backgroundColor: '#' + this.state.bgColour,
      height: '100vh'
    };
  }

  render() {
    return (
      <div className="bg-container" style={this.getBgColour()}>
        <div className="display-text">
          <p id="cur-date">{this.state.curDate}</p>
          <p id="cur-time">{this.state.curTime}</p>
          <p id="bg-colour">#{this.state.bgColour}</p>
        </div>
      </div>
    );
  }
}

export default ChromeStartup;
