import React from 'react';
import PropTypes from 'prop-types';
import Bet_Selections from './bet_selection'
import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.info.time,
      homeinfo: {
        City: this.props.info.homeTeam.City,
        Name: this.props.info.homeTeam.Name,
        Abr: this.props.info.homeTeam.Abbreviation,
      },
      awayinfo: {
        City: this.props.info.awayTeam.City,
        Name: this.props.info.awayTeam.Name,
        Abr: this.props.info.awayTeam.Abbreviation,
      },
      display_options: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log("Game Selected, Display Bet options")
    this.setState({
      display_options: true
    });
  }

  render() {
    let bet_options = null;
    if (this.state.display_options){
      bet_options = <Bet_Selections
                     away_team = {this.state.awayinfo.Name}
                     home_team = {this.state.homeinfo.Name}
                     />
    }
    let home_logo = '/static/logos/nfl/' + this.state.homeinfo.Name;
    let away_logo = '/static/logos/nfl/' + this.state.awayinfo.Name;
    return (
      <div className="row" >
        <div className="row vertical-align">
          <div className="col-lg-2 col-xl-2">
            <img src={away_logo} className="logo" alt="Away Team" />
          </div>
          <div className="col-lg-3 col-xl-3">
            <div className="team-text">
              <h2>{this.state.awayinfo.Abr}</h2>
              <h4>{this.state.awayinfo.City}&nbsp;{this.state.awayinfo.Name}</h4>
            </div>
          </div>
          <div className="col-lg-1 col-xl-1 At_sign">
            @
          </div>
          <div className="col-lg-3 col-xl-3">
            <div className="team-text">
              <h2>{this.state.homeinfo.Abr}</h2>
              <h4>{this.state.homeinfo.City}&nbsp;{this.state.homeinfo.Name}</h4>
            </div>
          </div>
          <div className="col-lg-2 col-xl-2">
            <img src={home_logo} className="logo" alt="Home Team" />
          </div>
          <div className="col-lg-1 col-xl-1">
            <p>{this.state.time} ET</p>
            <button type="button" class="btn" onClick={this.handleClick}>Select</button>
          </div>
        </div>
        <div>
          {bet_options}
        </div>
      </div>
    );
  }
}

export default Game;
