import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Upcoming extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			list_bets: [{"betid":"3","date":"10/31/2018","time":"10:30 PM","game":"Lakers @ Mavs","selection":"Lakers","spread":"-6.5","wager":"11","to_win":"10"},{"betid":"4","date":"10/31/2018","time":"10:30 PM","game":"Lakers @ Mavs","selection":"OVER","spread":"235","wager":"5","to_win":"4.50"}],
			league: '',
		}
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleSubmit(event) { // Select only upcoming bets for a specific League
		event.preventDefault();
		console.log("Submit Button Pressed")
	}

	handleChange(event){
		this.setState({
			league: event.target.value
		})
	}


	componentDidMount(){ // Get all upcoming bets for logged in user
		console.log("Component Did Mount")
	}

	render(){
		let bets = this.state.list_bets;
		return (
			<div>
				<h2> Upcoming Bets </h2>
				<div>
					<form onSubmit={this.handleSubmit}>
						<select value={this.state.league} onChange={this.handleChange}>
							<option value="Default">Select a League</option>
							<option value="MLB">MLB</option>
							<option value="NFL">NFL</option>
							<option value="NBA">NBA</option>
							<option value="NHL">NHL</option>
						</select>
						<input type="submit" value="Submit" />
					</form>
				</div>
				<div className="container-fluid">
					{bets.map(bet => 
						(<Bet 
							key={bet.bet_id}
							date= {bet.date}
							time={bet.time}
							game={bet.game}
							selection={bet.selection}
							spread={bet.spread}
							wager={bet.wager}
							to_win={bet.to_win}
						/>),
					)}	
				</div>
			</div>
		);	
	}
}

const Bet = props => (
  <div className="row">
  	<div className="col">
  		{props.date} @ {props.time} ET
  	</div>
  	<div className="col">
  		{props.game}
  	</div>
  	<div className="col">
  		{props.selection}   {props.spread}
  	</div>
  	<div className="col">
  		Wager: ${props.wager}   To Win: ${props.to_win}
  	</div>
  </div>);

export default Upcoming;
