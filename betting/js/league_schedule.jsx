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
    return (
      <div className="container">
        <h2> {this.state.league} </h2>
        {items.map(item =>
          <Game key={item.id} info={item} />,
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
