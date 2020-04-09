import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

import './PolyResult.css';

class PolyResult extends Component {

  render() {
    const { polyAsset, selectAsset } = this.props;

    return (
      <div
        className="PolyResult__thumbnailWrapper"
        key={polyAsset.name}
        onClick={() => selectAsset(polyAsset)}>
          <div
            className="PolyResult__name"
            title={`Keywords: ${polyAsset.description}`}>
              {polyAsset.displayName}
          </div>
        <div
          className="PolyResult__license"
          title="Creative Commons License">
            <FontAwesomeIcon icon={faClosedCaptioning}/>
        </div>
        <div
          className="PolyResult__thumbnailLayer"
          title="Add asset to scene...">
            <img
              src={polyAsset.thumbnail.url}
              className="PolyResult__thumbnail"
              alt=""/>
        </div>
      </div>
    );
  }
}

PolyResult.propTypes = {
  polyAsset: PropTypes.object.isRequired,
  selectAsset: PropTypes.func.isRequired,
};

export default PolyResult;