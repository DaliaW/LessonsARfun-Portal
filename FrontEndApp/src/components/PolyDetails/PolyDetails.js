import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import "./PolyDetails.css";

class PolyDetails extends Component {
  constructor() {
    super();

    this.state = {
      selectedPolyAsset: [
        {
          img: "",
          assetUrl: "",
        },
      ],
    };
  }

  render() {
    const { polyAsset, clearPolyAsset } = this.props;
    return (
      <div className="PolyDetails__details" onClick={clearPolyAsset}>
        <div className="PolyDetails__preview">
          <img
            className="PolyDetails__thumbnail"
            src={polyAsset.thumbnail.url}
            alt=""
          />
        </div>
        <div>
          <Button
            data-tip="create lesson"
            onClick={() => this.handleSelect(polyAsset)}
            boxShadow={3}
            variant="contained"
            align="center"
            color="primary"
          >
            Select this model
          </Button>
        </div>
        <div className="PolyDetails__displayName">{polyAsset.displayName}</div>
        <div>by {polyAsset.authorName}</div>
        <div>{polyAsset.description}</div>
      </div>
    );
  }
}

PolyDetails.propTypes = {
  polyAsset: PropTypes.object.isRequired,
  clearPolyAsset: PropTypes.func.isRequired,
};

export default PolyDetails;
