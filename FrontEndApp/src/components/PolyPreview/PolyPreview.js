import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import './PolyPreview.css';
import "@google/model-viewer";
import Swal from 'sweetalert2';

class PolyPreview extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     rotateX: 0,
  //     rotateY: 0,
  //     rotateZ: 0,
  //     x: 1,
  //     y: 1,
  //     z: 1,
  //   }
  // }

  handleChange = async (e) => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value
    });
  };

  
  handleSelect = (polyAsset) => {
    Swal.bindClickHandler()

    Swal.mixin({
      title: 'SELECTED!',
      icon: 'success',
      toast: true,
      timer: 1500
    }).bindClickHandler('data-swal-toast-template')

    const gltf = polyAsset.formats.find(format => format.formatType === 'GLTF2').root.url;
    if(gltf){
      console.log("yeah")
      
      const img = polyAsset.thumbnail.url
      const name = polyAsset.displayName;

      localStorage.setItem("modelUrl", gltf);
      localStorage.setItem("modelThumbnail", img);

      let existingEntries =  JSON.parse(localStorage.getItem("allEntries"));;
      if(existingEntries === null) existingEntries = [];
      const entry ={img: img, assetUrl: gltf, displayName: name, transform: {scaleX: 1, scaleY: 1, scaleZ: 1,
                      rotateX: 0, rotateY: 0, rotateZ: 0,
                      x: 1, y: 0, z: 0}};

      localStorage.setItem("entry", JSON.stringify(entry));
      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      console.log("all", JSON.parse(localStorage.getItem("allEntries")));
      //window.location.reload();
    }
  }


  render() {
    const { polyAsset } = this.props;

    return (
      // <a-scene position="0 0 4" embedded
      //   model-viewer="gltfModel: #triceratops; title: Triceratops">
      //   {polyAsset ? (
      //     <React.Fragment>
      //       <a-assets >
      //         <a-asset-item
      //           id="polyAsset"
      //           preload="auto"
      //           src={polyAsset.formats.find(format => format.formatType === 'GLTF2').root.url}
      //           crossorigin="anonymous"/>
      //       </a-assets>

      //       <a-entity position="0 0 -8" >
      //         <a-gltf-model src="#polyAsset" autoscale={5} />
      //       </a-entity>
      //     </React.Fragment>
      //   ) : null}
      // </a-scene>
      <div >
        {polyAsset ? (
          console.log(polyAsset),
          <model-viewer
          camera-controls auto-rotate
              style={{width: "633.05px", height: "731.188px", padding: "25px"}} 
              src={polyAsset.formats.find(format => format.formatType === 'GLTF2').root.url} 
              alt="A 3D model" 
              // orientation={`${this.state.rotateX}deg ${this.state.rotateY}deg ${this.state.rotateZ}deg`}
              // scale={`${this.state.x} ${this.state.y} ${this.state.z}`}
              bounds="tight" 
              shadow-intensity="2" 
              ar ar-modes="webxr scene-viewer quick-look"
              updateFraming >
            <div class="controls">
              {/* <div>
                Rotate: 
                X: <input name = "rotateX" type="number" value={this.state.rotateX} size="3" onChange = {this.handleChange}></input>,
                Y: <input name = "rotateY" type="number" value={this.state.rotateY} size="3" onChange = {this.handleChange}></input>,
                Z: <input name = "rotateZ" type="number" value={this.state.rotateZ} size="3" onChange = {this.handleChange}></input>
              </div>
              <div>
                Scale: 
                X: <input name = "x" type="number" step="0.01" value={this.state.x} size="3" onChange = {this.handleChange}></input>, 
                Y: <input name = "y" type="number" step="0.01" value={this.state.y} size="3" onChange = {this.handleChange}></input>, 
                Z: <input name = "z" type="number" step="0.01" value={this.state.z} size="3" onChange = {this.handleChange}></input>
              </div> */}
              {polyAsset ?
            (<Button data-swal-toast-template="#my-template" startIcon={<TouchAppIcon />} variant="outlined" style={{marginTop: '25px'}} onClick={() => this.handleSelect(polyAsset)} boxShadow={3} align="center" color="primary">
                      Select this model
            </Button>): null}            </div>
          </model-viewer>

        ) : null}
      </div>
    );
  }
}

PolyPreview.propTypes = {
  polyAsset: PropTypes.object,
};

export default PolyPreview;