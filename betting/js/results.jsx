import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_results: [
        {
          betid: '1',
          date: '10/30/2018',
          game: 'Jazz @ T-Wolves',
          selection: 'T-Wolves',
          spread: '-2',
          result: -20,
        },
      ],
      total_value: 0,
      wins: 0,
      losses: 0,
      push: 0,
      range: '',
      league: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() { // Get all upcoming bets for logged in user
    console.log(this.props.api_key);
  }

  handleSubmit(event) { // Select only upcoming bets for a specific League
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const results = this.state.list_results;
    results.map(item => {
      if(item.result > 0){
        this.state.wins += 1;
      }
      else if(item.result < 0){
        this.state.losses += 1;
      }
      else{
        this.state.push += 1;
      }
      this.state.total_value += item.result;
    });
    return (
      <div>
        <h2> Results </h2>
        <h4> Record(W-L-P): {this.state.wins}-{this.state.losses}-{this.state.push}</h4>
        <h4> Total: {this.state.total_value}</h4>
        <div>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.range} onChange={this.handleChange}>
              <option value="Default">Select a Range</option>
              <option value="1">Today</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="All_Time">All Time</option>
            </select>
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
          {results.map(comp_bet =>
            (<Result
              key={comp_bet.betid}
              date={comp_bet.date}
              game={comp_bet.game}
              selection={comp_bet.selection}
              spread={comp_bet.spread}
              result={comp_bet.result}
            />),
          )}
        </div>
      </div>
    );
  }
}

function Result(props) {
  let outcome = 'PUSH';
  if (props.result > 0) {
    outcome = 'WIN';
  } else if (props.result < 0) {
    outcome = 'LOSS';
  }
  return (
    <div className="row">
      <div className="col">
        {props.date}
      </div>
      <div className="col">
        {props.game}
      </div>
      <div className="col">
        <b>{props.selection}</b>  {props.spread}
      </div>
      <div className="col">
        {outcome}  ${props.result}
      </div>
    </div>
  );
}

Result.propTypes = {
  api_key: PropTypes.string.isRequired,
};

Bet.propTypes = {
  date: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  spread: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired,
};

export default Results;
