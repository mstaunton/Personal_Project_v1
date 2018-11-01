import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			time: this.props.info.time,
			homeinfo: {
				'City': this.props.info.homeTeam.City,
				'Name': this.props.info.homeTeam.Name,
				'Abr': this.props.info.homeTeam.Abbreviation,
			},
			awayinfo: {
				'City': this.props.info.awayTeam.City,
				'Name': this.props.info.awayTeam.Name,
				'Abr': this.props.info.awayTeam.Abbreviation,
			},
			bet_type: 'Default',
			bet_odds: 0,
			bet_wager: 0,
			bet_input: 0,
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}



	render() {
		const bet_type = this.state.bet_type;
		let bet_parameters;
		if(bet_type === 'Default') {
			bet_parameters = <No_Bet/>
		} else if(bet_type === 'Spread') {
			bet_parameters = <Spread_Bet bet_odds={this.state.bet_odds} bet_wager={this.state.bet_wager} onChange={this.handleChange}/>
		} else if(bet_type === 'Total') {
			bet_parameters = <Total_Bet state={this.state} onChange={this.handleChange}/>
		} else {
			bet_parameters = <ML_Bet state={this.state} onChange={this.handleChange}/>
		}
		return (
			<div className="game">
				<div className="game-info">
					<div className="away-info">
						<img src="ifisokawe" alt="Away Team" />
						<div className="team-text">
							<h2>{this.state.awayinfo.Abr}</h2>
							<h4>{this.state.awayinfo.City}&nbsp;{this.state.awayinfo.Name}</h4>
						</div>
					</div>
					<span> <b>@</b> </span>
					<div className="home-info">
						<div className="team-text">
							<h2>{this.state.homeinfo.Abr}</h2>
							<h4>{this.state.homeinfo.City}&nbsp;{this.state.homeinfo.Name}</h4>
						</div>
						<img src="ifisokawe" alt="Home Team" />
					</div>
					<p>{this.state.time} ET</p>
				</div>
				<div className="bet">
					<select name="bet_type" value={this.state.bet_type} onChange={this.handleChange}>
						<option value="Default">Please Select a Bet Type</option>
						<option value="Spread">Spread</option>
						<option value="Total">Over/Under</option>
						<option value="ML">Moneyline</option>
					</select>
					{bet_parameters}
				</div>
			</div>
		);
	}
}

function No_Bet() {
	return (
		<div className="bet-input">
			<p>No Bet</p>
		</div>
	)
}

function Spread_Bet(props) {
	let to_win = 0;
	console.log(props.bet_odds)
	console.log(props.bet_wager)
	if(props.bet_odds < 0){
		to_win = (props.bet_wager * -100) / props.bet_odds;
	} else {
		to_win = (props.bet_wager * props.bet_odds) / 100;
	}
	return (
		<div className="bet-input">
			<select>
				<option value="Default">Please Select a Team</option>
				<option value="Spread">Away Team</option>
				<option value="Total">Home Team</option>
			</select>
			<label for="Spread">Spread: </label>
			<input type="text" name="bet_input" id="Spread" onChange={props.handleChange}/>
			<label for="Odds">Odds: </label>
			<input type="text" name="bet_odds" id="Odds" onChange={props.handleChange}/>
			<label for="Wager">Wager: </label>
			<input type="text" name="bet_wager" id="Wager" onChange={props.handleChange}/>
			<label for="Amount">To Win: </label>
			<input type="text" id="Amount" value={to_win}/>
			<input type="submit" value="Add"/>
		</div>
	)
}

function Total_Bet(props) {
	let to_win = 0;
	if(props.state.bet_odds < 0){
		to_win = (props.state.bet_wager * -100) / props.state.bet_odds;
	} else {
		to_win = (props.state.bet_wager * props.state.bet_odds) / 100;
	}
	return (
		<div className="bet-input">
			<select>
				<option value="Default">--Select--</option>
				<option value="Over">Over</option>
				<option value="Under">Under</option>
			</select>
			<label for="Total">Total: </label>
			<input type="text" name="bet_input" id="Total" value={props.state.bet_input} onChange={props.handleChange}/>
			<label for="Odds">Odds: </label>
			<input type="text" name="bet_odds" id="Odds" value={props.state.bet_odds} onChange={props.handleChange}/>
			<label for="Wager">Wager: </label>
			<input type="text" name="bet_wager" id="Wager" value={props.state.bet_wager} onChange={props.handleChange}/>
			<label for="Amount">To Win: </label>
			<input type="text" id="Amount" value={to_win}/>
			<input type="submit" value="Add"/>
		</div>
	)
}

function ML_Bet(props) {
	let to_win = 0;
	if(props.state.bet_odds < 0){
		to_win = (props.state.bet_wager * -100) / props.state.bet_odds;
	} else {
		to_win = (props.state.bet_wager * props.state.bet_odds) / 100;
	}
	return (
		<div className="bet-input">
			<select>
				<option value="Default">Please Select a Team</option>
				<option value="Spread">Away Team</option>
				<option value="Total">Home Team</option>
			</select>
			<label for="Odds">Odds: </label>
			<input type="text" name="bet_odds" id="Odds" value={props.state.bet_odds} onChange={props.handleChange}/>
			<label for="Wager">Wager: </label>
			<input type="text" name="bet_wager" id="Wager" value={props.state.bet_wager} onChange={props.handleChange}/>
			<label for="Amount">To Win: </label>
			<input type="text" id="Amount" value={to_win}/>
			<input type="submit" value="Add"/>
		</div>
	)
}

export default Game;