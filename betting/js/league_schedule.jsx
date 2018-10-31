import React from 'react';
import PropTypes from 'prop-types';
import Game from './games';

class League_Schedule extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			games: this.props.games,
			league: this.props.key,
		}
	}

	render () {
		let items = this.state.games;
		return (
			<div className="League_Schedule">
				<h2> {this.state.league} </h2>
				{items.map(item =>
					<Game key={item.id} info={item}/>
				)}
			</div>
		);
	}
}

export default League_Schedule;