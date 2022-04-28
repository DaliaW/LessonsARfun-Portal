import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import "./PolyResult.css";

class PolyResult extends Component {
  render() {
    const { polyAsset } = this.props;

    return (
      <div className="PolyResult__thumbnailWrapper">
        <div
          className="PolyResult__name"
          title={`Keywords: ${polyAsset.description}`}
        >
          {polyAsset.displayName.split(" ").slice(0, 2)}
        </div>
        {polyAsset.authorName ? (
          <div className="PolyResult__by">
            by {polyAsset.authorName.split(" ")[0]}
          </div>
        ) : null}

        <div className="PolyResult__license" title="Creative Commons License">
          <FontAwesomeIcon icon={faClosedCaptioning} />
        </div>
        <div className="PolyResult__thumbnailLayer" title="Select asset...">
          <img
            src={polyAsset.thumbnail.url}
            className="PolyResult__thumbnail"
            alt=""
          />
        </div>
      </div>
    );
  }
}

PolyResult.propTypes = {
  polyAsset: PropTypes.object.isRequired,
};

export default PolyResult;
