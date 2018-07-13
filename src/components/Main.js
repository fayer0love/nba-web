import React, { Component } from 'react';
import Profile from './Profile'
import nba from 'nba';
import {ShotChart} from './ShotChart'

export default class Main extends Component {
  state = {
    playerId: 201939,
    playerInfo: {},
  }

  componentDidMount() {
    const player = nba.findPlayer('Stephen Curry');

    nba.stats.playerInfo({PlayerID: player.playerId})
      .then(({commonPlayerInfo, playerHeadlineStats}) => {
        const playerInfo = Object.assign({}, commonPlayerInfo[0], playerHeadlineStats[0]);
        this.setState({playerInfo});
      });
  }

  render() {
    return (
      <div className='main'>
        <Profile playerInfo={this.state.playerInfo}/>
        <ShotChart
          playerId={this.state.playerId}
          minCount={2}
          displayTooltip={true}
          chartType="hexhin"
        />
      </div>
    );
  }
}
