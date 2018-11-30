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
  }

  handleChange(event) {
  	console.log("Change Event Occurred")
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
  	const bet_type = this.state.bet_type;
    let bet_parameters = null;
    if (bet_type !== 'Default') {
    	bet_parameters = <Bet_Parameters 
    	                  bet_type={this.state.bet_type}
    	                  home_team = {this.props.home_team}
    	                  away_team = {this.props.away_team}
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
      bet_input: 0,
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

  handleSubmit(event) {
  	event.preventDefault();
  	console.log("Submit button pressed")
  	console.log(this.state.bet_odds)
  }

  render() {
  	if (this.props.bet_type === 'Spread') {
      return (
        <div className="bet-input">
          <select>
            <option value="Default">Team</option>
            <option value="Spread">{this.props.away_team}</option>
            <option value="Total">{this.props.home_team}</option>
          </select>
          <label for="Spread">Spread: </label>
          <input type="text" name="bet_input" id="Spread" value={this.state.bet_input} onChange={this.handleChange} />
          <label for="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label for="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
      );
    } else if (this.props.bet_type === 'Total') {
      return (
        <div>
          <select>
            <option value="Default">--Select--</option>
            <option value="Over">Over</option>
            <option value="Under">Under</option>
          </select>
          <label for="Total">Total: </label>
          <input type="text" name="bet_input" id="Total" value={this.state.bet_input} onChange={this.handleChange} />
          <label for="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label for="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
      );
    } else if (this.props.bet_type === 'ML') {
      return (
        <div className="bet-input">
          <select>
            <option value="Default">Please Select a Team</option>
            <option value="Spread">{this.props.away_team}</option>
            <option value="Total">{this.props.home_team}</option>
          </select>
          <label for="Odds">Odds: </label>
          <input type="text" name="bet_odds" id="Odds" value={this.state.bet_odds} onChange={this.handleChange} />
          <label for="Wager">Wager: </label>
          <input type="text" name="bet_wager" id="Wager" value={this.state.bet_wager} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
      );
    }
  }
}

export default Bet_Selections;