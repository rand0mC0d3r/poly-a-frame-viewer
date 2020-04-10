import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PolyDetails.css';

class PolyDetails extends Component {
  render() {
    const { polyAsset, clearPolyAsset } = this.props;

    return (
      <div
        className="PolyDetails__details"
        onClick={clearPolyAsset}>
          <div className="PolyDetails__displayName">
            {polyAsset.displayName}
          </div>
          <div className="PolyDetails__description">
            {polyAsset.description}
          </div>
          <div className="PolyDetails__preview">
            <img
              className="PolyDetails__thumbnail"
              src={polyAsset.thumbnail.url}
              alt="" />
          </div>
      </div>
    );
  }
}

PolyDetails.propTypes = {
  polyAsset: PropTypes.object.isRequired,
  clearPolyAsset: PropTypes.func.isRequired,
};

export default PolyDetails;