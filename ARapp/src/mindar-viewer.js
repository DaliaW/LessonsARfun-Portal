import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { link } from "./constants";
import card from "./card.png";
import youtube from "./youtube.png";
import mindAR from "./targets.mind";
import txtCloud from "./txtCloud.png";

export default function MindAR(props) {
  const [text, setText] = useState("");
  const [video, setVideo] = useState("");
  const [allModels, setAllModels] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const sceneRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${link}/lessons/${props.match.params.id}`
        );
        console.log(link);
        console.log(result);
        setText(result.data.description);
        setAllModels(result.data.allModels.models);
        setAllImages(result.data.allImages.images);
        setVideo(result.data.videoLink);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();

    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  return (
    <div className="example-container">
      <div id="example-scanning-overlay" className="hidden">
        <div className="inner">
          <img alt="card" src={card} />
          <div className="scanline"></div>
        </div>
      </div>
      <a-scene
        ref={sceneRef}
        mindar={`imageTargetSrc: ${mindAR}; autoStart: true; showStats: false; uiScanning: #example-scanning-overlay;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false`}
      >
        <a-assets>
          <img crossOrigin="anonymous" alt="img" id="card" src={card} />
          <img crossOrigin="anonymous" alt="img" id="icon-web" src={youtube} />
          {allImages
            ? allImages.map((image) => (
                <img
                  alt="img"
                  crossOrigin="anonymous"
                  id={`${image.picture}`}
                  src={image.picture}
                />
              ))
            : null}
          {allModels
            ? allModels.map((model, i) => (
                <a-asset-item
                  crossOrigin="anonymous"
                  id={`${i++}`}
                  src={model.assetUrl}
                ></a-asset-item>
              ))
            : null}
        </a-assets>
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="far: 10000; objects: .clickable"
        ></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-entity visible={true} id="portfolio-panel" position="0 0 -0.01">
            {text ? (
              <a-entity>
                <a-image
                  src={`#${txtCloud}`}
                  position={`${-0.1} ${0.9} ${0}`}
                  height="0.552"
                  width="2"
                  rotation="0 0 0"
                ></a-image>
                <a-text
                  class="clickable"
                  value={`${text}`}
                  color="black"
                  align="center"
                  width="2"
                  position="0 0.9 0"
                ></a-text>
              </a-entity>
            ) : null}
            {allImages
              ? allImages.map((image, i) => (
                  <a-plane
                    src={`#${image.picture}`}
                    position={`${0 + i} ${0} ${0}`}
                    height="0.552"
                    width="1"
                    rotation="0 0 0"
                  ></a-plane>
                ))
              : null}
          </a-entity>

          {video ? (
            <a-image
              onClick={() => {
                document.location.href = `${video}`;
              }}
              visible={true}
              id="web-button"
              class="clickable"
              src="#icon-web"
              alpha-test="0.5"
              position="-0.20 -0.5 0"
              height="0.15"
              width="0.15"
              animation="property: scale; to: 1.2 1.2 1.2; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
            ></a-image>
          ) : null}
          {allModels
            ? allModels.map((model, i) => (
                <a-gltf-model
                  animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true; dir: alternate"
                  id="avatar"
                  rotation={`${model.transform.rotateX} ${model.transform.rotateY} ${model.transform.rotateZ}`}
                  position={`${model.transform.x} ${model.transform.y} ${model.transform.z}`}
                  scale={`${model.transform.scaleX} ${model.transform.scaleY} ${model.transform.scaleZ}`}
                  src={`#${i++}`}
                ></a-gltf-model>
              ))
            : null}
        </a-entity>
      </a-scene>
    </div>
  );
}
