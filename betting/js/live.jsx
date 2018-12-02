import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_bets: [
        {
          betid: '3',
          date: '10/31/2018',
          time: '10:30 PM',
          game: 'Lakers @ Mavs',
          selection: 'Lakers',
          spread: '-6.5',
          odds: -110,
          wager: '11',
          to_win: '10',
        },
        {
          betid: '4',
          date: '10/31/2018',
          time: '10:30 PM',
          game: 'Lakers @ Mavs',
          selection: 'OVER',
          spread: '235',
          odds: -120,
          wager: '5',
          to_win: '4.50',
        }
      ],
      league: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() { // Get all upcoming bets for logged in user
    console.log(this.props.api_key)
  }

  handleSubmit(event) { // Select only upcoming bets for a specific League
    event.preventDefault();
    console.log("Submit Button Pressed")
  }

  handleChange(event) {
    this.setState({
      league: event.target.value,
    })
  }

  render() {
    const bets = this.state.list_bets;
    return (
      <div>
        <h2> Live Bets </h2>
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
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Selection</th>
              <th scope="col">Odds</th>
              <th scope="col">Wager</th>
              <th scope="col">To Win</th>
            </tr>
          </thead>
          <tbody>
            {bets.map(bet =>
              (<Bet
                key={bet.bet_id}
                betID={bet.bet_id}
                game={bet.game}
                selection={bet.selection}
                spread={bet.spread}
                odds={bet.odds}
                wager={bet.wager}
                to_win={bet.to_win}
              />),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const Bet = props => (
  <tr>
    <td>{props.game}</td>
    <td>{props.selection} {props.spread}</td>
    <td>{props.odds}</td>
    <td>${props.wager}</td>
    <td>${props.to_win}</td>
  </tr>
);

Live.propTypes = {
  api_key: PropTypes.string.isRequired,
};

Bet.propTypes = {
  game: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  spread: PropTypes.string.isRequired,
  wager: PropTypes.string.isRequired,
  to_win: PropTypes.string.isRequired,
};

export default Live;
