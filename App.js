import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Styles.scss';
import WaifuChooser from './src/Components/WaifuChooser';
import DateTracker from './src/Components/DateTracker';
import AffectionTracker from './src/Components/AffectionTracker';
import VillageTracker from './src/Components/VillageTracker';
import TrophyTracker from './src/Components/TrophyTracker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waifu: null,
    };

    this.onChoose = this.onChoose.bind(this);
  }

  onChoose(waifu) {
    this.setState({ waifu });
  }

  onReset() {
    const reset = confirm('Are you sure you want to delete all saves?');

    if (reset) {
      localStorage.clear();
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        <button className="reset" onClick={this.onReset}>Reset</button>
        {!this.state.waifu ?
          <WaifuChooser onChoose={this.onChoose} /> :
          <div className="tracker">
            {!['village', 'trophies'].includes(this.state.waifu) &&
              <div>
                <DateTracker />
                <AffectionTracker waifu={this.state.waifu} />
              </div>}
            {this.state.waifu === 'village' && <VillageTracker />}
            {this.state.waifu === 'trophies' && <TrophyTracker />}
          </div>
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
