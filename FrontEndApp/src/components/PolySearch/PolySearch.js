import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";

import PolyResult from "../PolyResult/PolyResult";

import "./PolySearch.css";

class PolySearch extends Component {
  state = {
    apiKey: "AIzaSyDQlb14iN5L8CsN7QQODgGXv7hVeNMNtWY",
    isLoaded: false,
    loading: false,
    items: [],
    error: null,
  };

  componentDidMount() {
    try {
      fetch(
        `https://poly.googleapis.com/v1/assets?keywords=${`solar system`}&format=OBJ&key=${`AIzaSyDQlb14iN5L8CsN7QQODgGXv7hVeNMNtWY`}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              loading: false,
              items: result.assets,
            });
            console.log(result);
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
    } catch (err) {
      alert(err);
    }
  }
  _selectPolyAsset = (polyAsset) => {
    const { selectPolyAsset } = this.props;
    selectPolyAsset(polyAsset);
  };

  _addApiKey = (apiKey) => {
    this.setState({ apiKey });
  };

  _performSearch = (value) => {
    const { apiKey } = this.state;

    if (value.length >= 3) {
      this.setState({
        isLoaded: false,
        items: [],
        loading: true,
      });
      try {
        fetch(
          `https://poly.googleapis.com/v1/assets?keywords=${value}&format=OBJ&key=${apiKey}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                loading: false,
                items: result.assets,
              });
              console.log(result);
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
      } catch (err) {
        alert(err);
      }
    } else {
      this.setState({
        isLoaded: false,
        loading: false,
        items: [],
      });
    }
  };

  render() {
    const { items, isLoaded, loading, apiKey } = this.state;

    return (
      <div className="PolySearch__container">
        <TextField
          disabled={apiKey === null}
          fullWidth
          label="Search for an asset .."
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="outlined"
          onChange={(event) => this._performSearch(event.target.value)}
        />
        <div className="PolySearch__thumbnailContainer">
          {!loading ? (
            <React.Fragment>
              {isLoaded && items && items.length > 3 ? (
                <React.Fragment>
                  {items
                    .filter((item) => item.license === "CREATIVE_COMMONS_BY")
                    .map((item) => (
                      <div
                        onClick={() => this._selectPolyAsset(item)}
                        key={item.name}
                      >
                        <PolyResult polyAsset={item} />
                      </div>
                    ))}
                </React.Fragment>
              ) : (
                <div className="PolySearch__noResults">
                  No results, please specify what you're looking for.
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
