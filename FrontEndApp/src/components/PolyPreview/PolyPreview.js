import React, { Component } from "react";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import "./PolyPreview.css";
import "@google/model-viewer";
import Swal from "sweetalert2";

class PolyPreview extends Component {
  handleChange = async (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSelect = (polyAsset) => {
    Swal.bindClickHandler();

    Swal.mixin({
      title: "SELECTED!",
      icon: "success",
      toast: true,
      timer: 1500,
    }).bindClickHandler("data-swal-toast-template");

    const gltf = polyAsset.formats.find(
      (format) => format.formatType === "GLTF2"
    ).root.url;
    if (gltf) {
      console.log("yeah");

      const img = polyAsset.thumbnail.url;
      const name = polyAsset.displayName;

      localStorage.setItem("modelUrl", gltf);
      localStorage.setItem("modelThumbnail", img);

      let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      if (existingEntries === null) existingEntries = [];
      const entry = {
        img: img,
        assetUrl: gltf,
        displayName: name,
        transform: {
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: 1,
          y: 0,
          z: 0,
        },
      };

      localStorage.setItem("entry", JSON.stringify(entry));
      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      console.log("all", JSON.parse(localStorage.getItem("allEntries")));
    }
  };

  render() {
    const { polyAsset } = this.props;

    return (
      <div>
        {polyAsset
          ? (console.log(polyAsset),
            (
              <model-viewer
                camera-controls
                auto-rotate
                style={{
                  width: "633.05px",
                  height: "731.188px",
                  padding: "25px",
                }}
                src={
                  polyAsset.formats.find(
                    (format) => format.formatType === "GLTF2"
                  ).root.url
                }
                alt="A 3D model"
                bounds="tight"
                shadow-intensity="2"
                ar
                ar-modes="webxr scene-viewer quick-look"
                updateFraming
              >
                <div class="controls">
                  {polyAsset ? (
                    <Button
                      data-swal-toast-template="#my-template"
                      startIcon={<TouchAppIcon />}
                      variant="outlined"
                      style={{ marginTop: "25px" }}
                      onClick={() => this.handleSelect(polyAsset)}
                      boxShadow={3}
                      align="center"
                      color="primary"
                    >
                      Select this model
                    </Button>
                  ) : null}{" "}
                </div>
              </model-viewer>
            ))
          : null}
      </div>
    );
  }
}

PolyPreview.propTypes = {
  polyAsset: PropTypes.object,
};

export default PolyPreview;
