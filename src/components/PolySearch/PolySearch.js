import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';

import ComposedIcon from 'material-ui-mix-icon';

import PolyResult from '../PolyResult/PolyResult';

import './PolySearch.css';

class PolySearch extends Component {
  state = {
    apiKey: null,
    isLoaded: false,
    loading: false,
    items: [],
    error: null,
  }

  _selectPolyAsset = (polyAsset) => {
    const { selectPolyAsset } = this.props;
    selectPolyAsset(polyAsset);
  }

  _addApiKey = (apiKey) => {
    this.setState({apiKey});
  }

  _performSearch = (value) => {
    const { apiKey } = this.state;

    console.log(apiKey)

    if(value.length >= 3) {
      this.setState({
        isLoaded: false,
        items: [],
        loading: true,
      });
      fetch(`https://poly.googleapis.com/v1/assets?keywords=${value}&format=OBJ&key=${apiKey}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              loading: false,
              items: result.assets,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              loading: false,
              items: [],
              error,
            });
          }
        );
    } else {
      this.setState({
        isLoaded: false,
        loading: false,
        items: [],
        error: null,
      });
    }
  }

  render() {
    const { items, isLoaded, loading, apiKey } = this.state;

    return (
      <div className="PolySearch__container">
        <h2>Google POLY & A-Frame</h2>

        <TextField
          autoFocus={true}
          fullWidth
          label="Api Key..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ComposedIcon
                    position="bottom-end"
                    size="medium"
                    icon='keyboard'
                    extraIcon='key'/>
              </InputAdornment>
            ),
            }}
          onChange={(event) => this._addApiKey(event.target.value)}/>
        <a
          className="PolySearch__getKeyLink"
          href="https://developers.google.com/poly/develop/api"
          rel="noopener noreferrer"
          target="_blank">
          Get API Key
        </a>
        <TextField
          disabled={apiKey === null}
          fullWidth
          label="Search for an asset .."
                    InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ComposedIcon
                    position="bottom-end"
                    size="medium"
                    icon='book-open'
                    extraIcon='filter'/>
              </InputAdornment>
            ),
            }}
          variant="outlined"
          onChange={(event) => this._performSearch(event.target.value)}/>
        <div className="PolySearch__thumbnailContainer">
          {!loading ? (
            <React.Fragment>
              {isLoaded && items && items.length > 0 ? (
                <React.Fragment>
                  {items.filter(item => item.license === 'CREATIVE_COMMONS_BY').map(item => (
                    <div
                      onClick={() => this._selectPolyAsset(item)}
                      key={item.name}>
                        <PolyResult polyAsset={item} />
                    </div>
                  ))}
                </React.Fragment>
              ) : (
                <div className="PolySearch__noResults">
                  No results
                </div>
              )}
            </React.Fragment>
          ) : (
            <div className="PolySearch__noResults">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    );
  }
}

PolySearch.propTypes = {
  selectPolyAsset: PropTypes.func.isRequired,
};

export default PolySearch;