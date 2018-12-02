import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './games';

class League_Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: this.props.games,
      league: this.props.league,
    };
  }

  render() {
    const items = this.state.games;
    const league_logo = '/static/logos/' + this.state.league + '_logo';
    return (
      <div className="container">
        <div className="league_header">
          <img className="league_logo" src={league_logo} />
          <h1> {this.state.league} </h1>
        </div>
        {items.map(item =>
          <Game key={item.id} league={this.state.league} info={item} />,
        )}
      </div>
    );
  }
}

League_Schedule.propTypes = {
  games: PropTypes.array.isRequired,
};

Game.propTypes = {
  info: PropTypes.object.isRequired,
};


export default League_Schedule;
