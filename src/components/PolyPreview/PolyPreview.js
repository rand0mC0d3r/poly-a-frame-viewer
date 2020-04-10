import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './PolyPreview.css';

class PolyPreview extends Component {
  render() {
    const { polyAsset } = this.props;

    return (
      <a-scene embedded>
        {polyAsset ? (
          <React.Fragment>
            <a-assets timeout="10000">
              <a-asset-item
                id="polyAsset"
                preload="auto"
                src={polyAsset.formats.find(format => format.formatType === 'GLTF2').root.url}
                crossorigin="true"/>
            </a-assets>

            <a-entity position="0 0 -5" >
              <a-gltf-model src="#polyAsset" autoscale={5} />
            </a-entity>
          </React.Fragment>
        ) : null}
      </a-scene>
    );
  }
}

PolyPreview.propTypes = {
  polyAsset: PropTypes.object,
};

export default PolyPreview;