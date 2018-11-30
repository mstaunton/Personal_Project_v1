import React from 'react';
import PropTypes from 'prop-types';
import League_Schedule from './league_schedule';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      NFL_games: [{"id":"46038","date":"2018-10-21","time":"9:30AM","awayTeam":{"ID":"67","City":"Tennessee","Name":"Titans","Abbreviation":"TEN"},"homeTeam":{"ID":"75","City":"Los Angeles","Name":"Chargers","Abbreviation":"LAC"},"location":"StubHub Center"},{"id":"46039","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"48","City":"Buffalo","Name":"Bills","Abbreviation":"BUF"},"homeTeam":{"ID":"65","City":"Indianapolis","Name":"Colts","Abbreviation":"IND"},"location":"Lucas Oil Stadium"},{"id":"46040","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"69","City":"Carolina","Name":"Panthers","Abbreviation":"CAR"},"homeTeam":{"ID":"54","City":"Philadelphia","Name":"Eagles","Abbreviation":"PHI"},"location":"Lincoln Financial Field"},{"id":"46041","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"57","City":"Cincinnati","Name":"Bengals","Abbreviation":"CIN"},"homeTeam":{"ID":"73","City":"Kansas City","Name":"Chiefs","Abbreviation":"KC"},"location":"Arrowhead Stadium"},{"id":"46042","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"58","City":"Cleveland","Name":"Browns","Abbreviation":"CLE"},"homeTeam":{"ID":"71","City":"Tampa Bay","Name":"Buccaneers","Abbreviation":"TB"},"location":"Raymond James Stadium"},{"id":"46043","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"61","City":"Detroit","Name":"Lions","Abbreviation":"DET"},"homeTeam":{"ID":"49","City":"Miami","Name":"Dolphins","Abbreviation":"MIA"},"location":"Hard Rock Stadium"},{"id":"46044","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"64","City":"Houston","Name":"Texans","Abbreviation":"HOU"},"homeTeam":{"ID":"66","City":"Jacksonville","Name":"Jaguars","Abbreviation":"JAX"},"location":"EverBank Field"},{"id":"46045","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"63","City":"Minnesota","Name":"Vikings","Abbreviation":"MIN"},"homeTeam":{"ID":"51","City":"New York","Name":"Jets","Abbreviation":"NYJ"},"location":"MetLife Stadium"},{"id":"46046","date":"2018-10-21","time":"1:00PM","awayTeam":{"ID":"50","City":"New England","Name":"Patriots","Abbreviation":"NE"},"homeTeam":{"ID":"60","City":"Chicago","Name":"Bears","Abbreviation":"CHI"},"location":"Soldier Field"},{"id":"46047","date":"2018-10-21","time":"4:05PM","awayTeam":{"ID":"70","City":"New Orleans","Name":"Saints","Abbreviation":"NO"},"homeTeam":{"ID":"56","City":"Baltimore","Name":"Ravens","Abbreviation":"BAL"},"location":"M&T Bank Stadium"},{"id":"46048","date":"2018-10-21","time":"4:25PM","awayTeam":{"ID":"52","City":"Dallas","Name":"Cowboys","Abbreviation":"DAL"},"homeTeam":{"ID":"55","City":"Washington","Name":"Redskins","Abbreviation":"WAS"},"location":"FedEx Field"},{"id":"46049","date":"2018-10-21","time":"8:20PM","awayTeam":{"ID":"77","City":"Los Angeles","Name":"Rams","Abbreviation":"LA"},"homeTeam":{"ID":"78","City":"San Francisco","Name":"49ers","Abbreviation":"SF"},"location":"Levi's Stadium"}],
      NBA_games: [{"id":"47605","date":"2018-10-21","time":"6:00PM","awayTeam":{"ID":"91","City":"Atlanta","Name":"Hawks","Abbreviation":"ATL"},"homeTeam":{"ID":"86","City":"Cleveland","Name":"Cavaliers","Abbreviation":"CLE"},"location":"Quicken Loans Arena"},{"id":"47606","date":"2018-10-21","time":"7:00PM","awayTeam":{"ID":"103","City":"Sacramento","Name":"Kings","Abbreviation":"SAC"},"homeTeam":{"ID":"96","City":"Oklahoma City","Name":"Thunder","Abbreviation":"OKL"},"location":"Chesapeake Energy Arena"},{"id":"47607","date":"2018-10-21","time":"8:00PM","awayTeam":{"ID":"101","City":"Golden State","Name":"Warriors","Abbreviation":"GSW"},"homeTeam":{"ID":"99","City":"Denver","Name":"Nuggets","Abbreviation":"DEN"},"location":"Pepsi Center"},{"id":"47608","date":"2018-10-21","time":"9:00PM","awayTeam":{"ID":"109","City":"Houston","Name":"Rockets","Abbreviation":"HOU"},"homeTeam":{"ID":"102","City":"Los Angeles","Name":"Clippers","Abbreviation":"LAC"},"location":"Staples Center"}],
      MLB_games: [],
      NHL_games: [{"id":"46413","date":"2018-10-21","time":"7:00PM","awayTeam":{"ID":"23","City":"Calgary","Name":"Flames","Abbreviation":"CGY"},"homeTeam":{"ID":"9","City":"New York","Name":"Rangers","Abbreviation":"NYR"},"location":"Madison Square Garden"},{"id":"46414","date":"2018-10-21","time":"7:00PM","awayTeam":{"ID":"1","City":"Tampa Bay","Name":"Lightning","Abbreviation":"TBL"},"homeTeam":{"ID":"20","City":"Chicago","Name":"Blackhawks","Abbreviation":"CHI"},"location":"United Center"},{"id":"46415","date":"2018-10-21","time":"8:00PM","awayTeam":{"ID":"15","City":"Buffalo","Name":"Sabres","Abbreviation":"BUF"},"homeTeam":{"ID":"29","City":"Anaheim","Name":"Ducks","Abbreviation":"ANA"},"location":"Honda Center"}],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLeague = this.handleLeague.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleSubmit() {
    event.preventDefault();
    const url = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/daily_game_schedule.json?fordate=20180916";
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(this.props.api_key + ":" + password),
      },
    })
      .then((response) => {
      if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({ games: data.gameentry });
      })
      .catch(error => console.log(error));	
  }

  handleLeague(event) {
    this.setState({
      league: event.target.value,
    });
  }

  handleDate(event) {
    this.setState({
      date: event.target.value,
    });
  }
	
  render() {
    const schedules = [
      {
        league: 'NFL',
        games: this.state.NFL_games,
      },
      {
        league: 'NBA',
        games: this.state.NBA_games,
      },
      {
        league: 'NHL',
        games: this.state.NHL_games,
      },
      {
        league: 'MLB',
        games: this.state.MLB_games,
      },
    ];
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.league} onChange={this.handleChange}>
            <option value="Default">Select a League</option>
            <option value="MLB">MLB</option>
            <option value="NFL">NFL</option>
            <option value="NBA">NBA</option>
            <option value="NHL">NHL</option>
          </select>
          <input type="text" placeholder="YYYYMMDD Format" onChange={this.handleDate} />
          <input type="submit" value="Submit" />
        </form>
        <div className="schedule">
          {schedules.map(item =>
            <League_Schedule key={item.league} league={item.league} games={item.games} />,
          )}
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  api_key: PropTypes.string.isRequired,
};


export default Schedule;
