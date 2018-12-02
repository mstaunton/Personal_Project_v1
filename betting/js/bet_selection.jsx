import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Bet_Selections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bet_type: 'Default',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	console.log("Change Event Occurred")
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(info){
    console.log(info)
    fetch('/api/v1/register/', {
      method: 'POST',
      body: JSON.stringify({info: info}),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
    })
      .then(() => {
        this.setState({
          bet_type: 'Default',
        })
    })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }

  render() {
  	const bet_type = this.state.bet_type;
    let bet_parameters = null;
    if (bet_type !== 'Default') {
    	bet_parameters = <Bet_Parameters 
    	                  bet_type={this.state.bet_type}
                        date = {this.props.date}
                        time = {this.props.time}
                        gameID = {this.props.gameID}
    	                  home_team = {this.props.home_team}
    	                  away_team = {this.props.away_team}
                        league = {this.props.league}
                        handleClick = {this.handleSubmit}
    	                  />
    }
  	return (
  	  <div className="row">
        <div className="col">
          <select name="bet_type" value={this.state.bet_type} onChange={this.handleChange}>
            <option value="Default">Please Select a Bet Type</option>
            <option value="Spread">Spread</option>
            <option value="Total">Over/Under</option>
            <option value="ML">Moneyline</option>
          </select>
        </div>
        <div>
          {bet_parameters}
        </div>
      </div>
    );
  }
}

class Bet_Parameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bet_odds: 0,
      bet_wager: 0,
      bet_input: '',
      bet_spread: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    console.log("Change Event Occurred")
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    let game = this.props.away_team + ' @ ' + this.props.home_team
    let info = {
                 gameID: this.props.gameID,
                 date: this.props.date,
                 time: this.props.time,
                 league: this.props.league,
                 game: game,
                 selection: this.state.bet_input,
                 spread: this.state.bet_spread,
                 odds: this.state.bet_odds,
                 wager: this.state.bet_wager,
               }
    let handleSubmit = this.props.handleClick;
    handleSubmit(info);
  }

  render() {
  	if (this.props.bet_type === 'Spread') {
      return (
        <div className="bet-input">
          <select name="bet_input" value={this.state.bet_input} onChange={this.handleChange}>
            <option value="Default">Team</option>
            <option value={this.props.away_team}>{this.props.away_team}</option>
            <option value={this.props.home_team}>{this.props.home_team}</option>
          </select>
          <label htmlFor="Spread">Spread: </label>
          <input type="text" name="bet_spread" id="Spread" value={this.state.bet_selection} onChange={this.handleChange} />
          <label htmlFor="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label htmlFor="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleClick}/>
        </div>
      );
    } else if (this.props.bet_type === 'Total') {
      return (
        <div>
           <select name="bet_input" value={this.state.bet_input} onChange={this.handleChange}>
            <option value="Default">--Select--</option>
            <option value="Over">Over</option>
            <option value="Under">Under</option>
          </select>
          <label for="Total">Total: </label>
          <input type="text" name="bet_spread" id="Total" value={this.state.bet_spread} onChange={this.handleChange} />
          <label for="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label for="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleClick}/>
        </div>
      );
    } else if (this.props.bet_type === 'ML') {
      return (
        <div className="bet-input">
           <select name="bet_input" value={this.state.bet_input} onChange={this.handleChange}>
            <option value="Default">Please Select a Team</option>
            <option value={this.props.away_team}>{this.props.away_team}</option>
            <option value={this.props.home_team}>{this.props.home_team}</option>
          </select>
          <label for="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label for="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleClick}/>
        </div>
      );
    }
  }
}

export default Bet_Selections;