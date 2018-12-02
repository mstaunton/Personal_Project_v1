import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_bets: [],
      league: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }


  componentDidMount() { // Get all upcoming bets for logged in user
    fetch('/api/v1/upcoming', { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          list_bets: data.bets
        });
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console

  }

  handleSubmit(event) { // Select only upcoming bets for a specific League
    event.preventDefault();
    console.log("Submit Button Pressed");
  }

  handleCancel(betID){
    console.log(betID)
    let api_url = '/api/v1/upcoming/?betID=' + betID;
    fetch(api_url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          list_bets: data.bets
        });
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }

  handleChange(event) {
    this.setState({
      league: event.target.value,
    });
  }

  render() {
    const bets = this.state.list_bets;
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
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Game</th>
              <th scope="col">Selection</th>
              <th scope="col">Odds</th>
              <th scope="col">Wager</th>
              <th scope="col">To Win</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bets.map(bet =>
              (<Bet
                key={bet.bet_id}
                betID = {bet.betID}
                date={bet.bet_date}
                time={bet.bet_time}
                game={bet.game}
                selection={bet.selection}
                spread={bet.spread}
                odds={bet.odds}
                wager={bet.wager}
                to_win={bet.to_win}
                handleClick = {this.handleCancel}
              />),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class Bet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      betID: props.betID 
    };
  }

  render(){
    var handleCancel = this.props.handleClick;
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.time} ET</td>
        <td>{this.props.game}</td>
        <td>{this.props.selection} {this.props.spread}</td>
        <td>{this.props.odds}</td>
        <td>${this.props.wager}</td>
        <td>${this.props.to_win}</td>
        <td>
          <button type="button" onClick={() => handleCancel(this.state.betID)} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </td>
      </tr>
    );
  }
}

// const Bet = props => (
//   <tr>
//     <td>{props.date}</td>
//     <td>{props.time} ET</td>
//     <td>{props.game}</td>
//     <td>{props.selection} {props.spread}</td>
//     <td>{props.odds}</td>
//     <td>${props.wager}</td>
//     <td>${props.to_win}</td>
//     <td>
//       <button type="button" class="close" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </td>
//   </tr>);

Upcoming.propTypes = {
  api_key: PropTypes.string.isRequired,
};

Bet.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  spread: PropTypes.number.isRequired,
  wager: PropTypes.number.isRequired,
  to_win: PropTypes.number.isRequired,
};

export default Upcoming;
