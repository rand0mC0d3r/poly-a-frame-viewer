import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  // _addPolyAsset = (polyAsset) => {
  //   const { updatePoly } = this.props;

  //   // debugger;
  //   updatePoly({
  //     name: polyAsset.displayName,
  //     gltf: polyAsset.formats.find(format => format.formatType === 'GLTF2').root.url,
  //     thumbnail: polyAsset.thumbnail.url,
  //   });
  // }

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
          value="AIzaSyA8qTh0ZUxwsB5bWan5V6qz8gChH0N-o2s"
          label="Api Key..."
          variant="outlined"
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
          variant="outlined"
          onChange={(event) => this._performSearch(event.target.value)}/>
        <div className="PolySearch__thumbnailContainer">
          {!loading ? (
            <React.Fragment>
              {isLoaded && items && items.length > 0 ? (
                <React.Fragment>
                  {items.filter(item => item.license === 'CREATIVE_COMMONS_BY').map(item => (
                    <PolyResult polyAsset={item} />
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

export default PolySearch;