import React, { Component } from 'react';

import PolySearch from '../PolySearch/PolySearch';
import PolyPreview from '../PolyPreview/PolyPreview';
import Closebttn from '../Buttons/Closebttn'
import './PolyDashboard.css';

class PolyDashboard extends Component {
  constructor() {
    super();

    this.state = {
      polyAsset: null,
    }
  }

  selectPolyAsset = (polyAsset) => {
    this.setState({polyAsset});
  }

  clearPolyAsset = () => {
    this.setState({polyAsset: null});
  }

  render() {
    const { polyAsset } = this.state;

    return (
      <div className="PolyDashboard__container">
        <div className="PolyDashboard__search">
        {/* <div>
        <Closebttn/>
        </div> */}
          <PolySearch
            selectPolyAsset={this.selectPolyAsset} />
          {/* {polyAsset ? (
            <PolyDetails
              polyAsset={polyAsset}
              clearPolyAsset={this.clearPolyAsset} />
          ) : null} */}
        </div>
        <div className="PolyDashboard__preview">
          <PolyPreview
            polyAsset={polyAsset} />
        </div>
      </div>
    );
  }
}

export default PolyDashboard;