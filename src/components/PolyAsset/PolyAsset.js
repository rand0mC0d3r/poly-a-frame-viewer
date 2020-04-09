import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Slider from '@material-ui/core/Slider';

import './PolyAsset.css';

class PolyAsset extends Component {



  onChange = (key, value) => {
    const { polyAsset, changePoly } = this.props;
    polyAsset[key] = value;
    changePoly(polyAsset);
  }

  render() {
    const { polyAsset } = this.props;

    return (
      <div key={polyAsset.uuid} className="PolyAssetManager__assetContainer">
        <div className="PolyAssetManager__thumbnailContainer">
          <img src={polyAsset.thumbnail} alt="" className="PolyAssetManager__thumbnail" />
        </div>
        {polyAsset ? (
          <div className="PolyAsset__contentContainer">
            <div className="PolyAssetManager__name">{polyAsset.name}</div>
            <div className="PolyAsset__positionContainer">
              <div className="PolyAsset__positionLabel">XYZ:</div>
              <div className="PolyAsset__positionSliderContainer">
                <Slider
                  className="PolyAsset__positionSlider"
                  value={polyAsset.x}
                  step={1}
                  onChangeCommitted={(event, newValue) => this.onChange('x', newValue)}
                  valueLabelDisplay="auto"
                  marks
                  min={-10}
                  max={20}
                />
                <Slider
                  className="PolyAsset__positionSlider"
                  value={polyAsset.y}
                  step={1}
                  onChangeCommitted={(event, newValue) => this.onChange('y', newValue)}
                  valueLabelDisplay="auto"
                  marks
                  min={0}
                  max={20}
                />
                <Slider
                  className="PolyAsset__positionSlider"
                  value={polyAsset.z}
                  step={1}
                  onChangeCommitted={(event, newValue) => this.onChange('z', newValue)}
                  valueLabelDisplay="auto"
                  marks
                  min={-10}
                  max={20}
                />
              </div>
            </div>

            <div className="PolyAsset__autoScaleContainer">
              <div className="PolyAsset__autoScaleLabel">AutoScale:</div>
              <Slider
                value={polyAsset.autoscale}
                step={1}
                onChangeCommitted={(event, newValue) => this.onChange('autoscale', newValue)}
                valueLabelDisplay="auto"
                marks
                min={1}
                max={50}
              />
            </div>

            <div className="PolyAsset__rotationContainer">
              <div className="PolyAsset__rotationLabel">Rotation:</div>
              <Slider
                value={polyAsset.rotation}
                step={15}
                onChangeCommitted={(event, newValue) => this.onChange('rotation', newValue)}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={360}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

PolyAsset.propTypes = {
  changePoly: PropTypes.func,
  polyAsset: PropTypes.object.isRequired,
};

export default PolyAsset;