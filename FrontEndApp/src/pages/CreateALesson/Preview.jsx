import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Grid from "@material-ui/core/Grid";
import TogetherJS from "../../components/Together";
import Nextbttn from "../../components/Buttons/Nextbttn";
import Prevbttn from "../../components/Buttons/Prevbttn";
import Swal from "sweetalert2";
import Closebttn from "../../components/Buttons/Closebttn";
import TextSprite from "@seregpie/three.text-sprite";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allModels: [],
    };
  }
  componentDidMount() {
    // ===> get selected assets <===
    const allModels = JSON.parse(localStorage.getItem("allEntries"));
    console.log(allModels);

    const allImages = JSON.parse(localStorage.getItem("allImages"));
    console.log(allImages);

    const allTxt = JSON.parse(localStorage.getItem("allTxt"));
    console.log("text", allTxt);

    //------------------------------
    let cameraPersp, cameraOrtho, currentCamera;
    let scene, renderer, model;
    let camera;
    let mroot, bbox, cent, size, maxAxis;
    let newModels = [];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let meshes = [];
    var controledObject;
    var a;
    let orbit, control;

    let x, y, z;
    let rotateX, rotateY, rotateZ;
    let scaleX, scaleY, scaleZ;

    init();
    render();
    function init() {
      const aspect = window.innerWidth / window.innerHeight;

      cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
      cameraOrtho = new THREE.OrthographicCamera(
        -600 * aspect,
        600 * aspect,
        600,
        -600,
        0.01,
        30000
      );
      currentCamera = cameraPersp;

      currentCamera.position.set(0, 1, 3);
      currentCamera.lookAt(0, 20, 0);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeceff4);

      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        20
      );
      camera.position.set(-1.8, 0.9, 2.7);

      //===================================== initial environment (card & background) ===============================================

      const helper = new THREE.GridHelper(100, 400);
      helper.position.y = -0.2;
      helper.material.opacity = 0.25;
      helper.material.transparent = true;
      scene.add(helper);

      //========> GLTF Loader (for the selected gltf models) <==========
      if (allModels) {
        const loader = new GLTFLoader();

        for (let i = 0; i < allModels.length; i++) {
          loader.load(
            allModels[i].assetUrl + "",
            // eslint-disable-next-line no-loop-func
            function (gltf) {
              // resize
              mroot = gltf.scene;
              bbox = new THREE.Box3().setFromObject(mroot);
              cent = bbox.getCenter(new THREE.Vector3());
              size = bbox.getSize(new THREE.Vector3());

              //Rescale the object to normalized space
              maxAxis = Math.max(size.x, size.y, size.z);
              mroot.scale.multiplyScalar(1 / maxAxis);
              bbox.setFromObject(mroot);
              bbox.getCenter(cent);
              bbox.getSize(size);

              model = mroot;
              model.position.z += 1;
              model.position.x = i;
              console.log(bbox.getSize(size));
              //-----------------------------------------------
              model.castShadow = true;
              model.receiveShadow = true;
              scene.add(model);
              meshes.push(model);
              console.log(meshes[0]._gizmo);

              console.log(model);
              allModels[i].transform = {
                scaleX: model.scale.x,
                scaleY: model.scale.y,
                scaleZ: model.scale.z,
                rotateX: model.rotation.x,
                rotateY: model.rotation.y,
                rotateZ: model.rotation.z,
                x: model.position.x,
                y: model.position.y,
                z: model.position.z,
              };

              console.log(allModels);
              localStorage.setItem("Models", JSON.stringify(allModels));
              console.log("all", JSON.parse(localStorage.getItem("Models")));
            },
            undefined,
            function (error) {
              console.error(error);
            }
          );
        }
      }

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      document.body.appendChild(renderer.domElement);
      //------------------------------------------------------------------------------

      const ambientLight = new THREE.AmbientLight(0xffffff);

      const light = new THREE.SpotLight(0xffffff, 1.5);
      light.position.set(0, 100, 200);
      light.angle = Math.PI * 0.2;
      light.castShadow = true;
      light.shadow.camera.near = 200;
      light.shadow.camera.far = 2000;
      light.shadow.bias = -0.000222;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      scene.add(light);

      scene.add(light, ambientLight);
      // instantiate a loader
      const TexLoader = new THREE.TextureLoader();

      if (allImages) {
        for (let i = 0; i < allImages.length; i++) {
          const card = new THREE.BoxGeometry(1, 0.552, 0);
          TexLoader.load(
            allImages[i].picture + "",
            // eslint-disable-next-line no-loop-func
            function (pic) {
              const Pic = new THREE.MeshLambertMaterial({ map: pic });
              const Picture = new THREE.Mesh(card, Pic);
              console.log(Picture);
              Picture.position.set(i, 0, 0);
              scene.add(Picture);
            },
            undefined,
            function (error) {
              console.error(error);
            }
          );
        }
      }

      orbit = new OrbitControls(currentCamera, renderer.domElement);
      orbit.update();
      orbit.addEventListener("change", render);

      control = new TransformControls(currentCamera, renderer.domElement);
      control.addEventListener("change", render);
      scene.add(control);

      control.addEventListener("dragging-changed", function (event) {
        orbit.enabled = !event.value;
      });

      //===================================== objects with their textures ===============================================
      control.addEventListener("mouseUp", onMouseDown);
      function onMouseDown(e) {
        controledObject = control.object;
        control.attach(controledObject);
        console.log("clicked", controledObject);
        a = true;
        console.log(a);
      }

      controledObject = control.object;

      for (var i = 0; i < meshes.length; i++) {
        console.log(meshes[i]);
      }

      console.log(controledObject);

      window.addEventListener("click", onClick, false);

      //==================================== Text ============================================================
      if (allTxt) {
        for (let i = 0; i < allTxt.length; i++) {
          let instance = new TextSprite({
            alignment: "left",
            color: "#000000",
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 0.1,
            fontStyle: "italic",
            text: allTxt[i].Txt,
            padding: 10,
          });
          instance.position.y = 0.5;
          scene.add(instance);
        }
      }
      //------------------------------------------------------------------------------------------------------

      window.addEventListener("resize", onWindowResize);

      window.addEventListener("keydown", function (event) {
        switch (event.keyCode) {
          case 81: // Q
            control.setSpace(control.space === "local" ? "world" : "local");
            break;

          case 16: // Shift
            control.setTranslationSnap(100);
            control.setRotationSnap(THREE.MathUtils.degToRad(15));
            control.setScaleSnap(0.25);
            break;

          case 87: // W
            control.setMode("translate");
            break;

          case 69: // E
            control.setMode("rotate");
            break;

          case 82: // R
            control.setMode("scale");
            break;

          case 67: // C
            const position = currentCamera.position.clone();

            currentCamera = currentCamera.isPerspectiveCamera
              ? cameraOrtho
              : cameraPersp;
            currentCamera.position.copy(position);

            orbit.object = currentCamera;
            control.camera = currentCamera;

            currentCamera.lookAt(
              orbit.target.x,
              orbit.target.y,
              orbit.target.z
            );
            onWindowResize();
            break;

          case 86: // V
            const randomFoV = Math.random() + 0.1;
            const randomZoom = Math.random() + 0.1;

            cameraPersp.fov = randomFoV * 160;
            cameraOrtho.bottom = -randomFoV * 500;
            cameraOrtho.top = randomFoV * 500;

            cameraPersp.zoom = randomZoom * 5;
            cameraOrtho.zoom = randomZoom * 5;
            onWindowResize();
            break;

          case 187:
          case 107: // +, =, num+
            control.setSize(control.size + 0.1);
            break;

          case 189:
          case 109: // -, _, num-
            control.setSize(Math.max(control.size - 0.1, 0.1));
            break;

          case 88: // X
            control.showX = !control.showX;
            break;

          case 89: // Y
            control.showY = !control.showY;
            break;

          case 90: // Z
            control.showZ = !control.showZ;
            break;

          case 32: // Spacebar
            control.enabled = !control.enabled;
            break;
          default:
            break;
        }
      });

      window.addEventListener("keyup", function (event) {
        switch (event.keyCode) {
          case 16: // Shift
            control.setTranslationSnap(null);
            control.setRotationSnap(null);
            control.setScaleSnap(null);
            break;
          default:
            break;
        }
      });
    }

    function onClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, currentCamera);

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(scene.children, true);

      for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.type === "Mesh") {
          if (a) {
            control.attach(controledObject);
            console.log(controledObject.position);

            console.log(controledObject.material.name); //  <======= our key to the transitions
            a = false;
            scaleX = controledObject.scale.x;
            scaleY = controledObject.scale.y;
            scaleZ = controledObject.scale.z;
            rotateX = controledObject.rotation.x;
            rotateY = controledObject.rotation.y;
            rotateZ = controledObject.rotation.z;
            x = controledObject.position.x;
            y = controledObject.position.y;
            z = controledObject.position.z;

            for (let i = 0; i < allModels.length; i++) {
              let requiredName = allModels[i].displayName.substring(0, 3);
              if (controledObject.material.name.includes(requiredName)) {
                console.log("yes");
                if (scaleX <= 1 || scaleY <= 1 || scaleZ <= 1) {
                  console.log("no");
                  allModels[i].transform.rotateX = rotateX;
                  allModels[i].transform.rotateY = rotateY;
                  allModels[i].transform.rotateZ = rotateZ;
                  allModels[i].transform.x = x;
                  allModels[i].transform.y = y;
                  allModels[i].transform.z = z;
                } else {
                  console.log("heree");
                  allModels[i].transform.scaleX = scaleX;
                  allModels[i].transform.scaleY = scaleY;
                  allModels[i].transform.scaleZ = scaleZ;

                  allModels[i].transform.rotateX = rotateX;
                  allModels[i].transform.rotateY = rotateY;
                  allModels[i].transform.rotateZ = rotateZ;

                  allModels[i].transform.x = x;
                  allModels[i].transform.y = y;
                  allModels[i].transform.z = z;
                }
              }
            }
          } else {
            control.attach(intersects[i].object);
            console.log("inside", intersects[i].object);
          }
        }
      }
      render();

      console.log(allModels);
      localStorage.setItem("Models", JSON.stringify(allModels));
      console.log("all", JSON.parse(localStorage.getItem("Models")));
    }

    function onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;
      //-------------------------------------------------------------
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        20
      );
      camera.position.set(-1.8, 0.9, 2.7);
      //-------------------------------------------------------------
      cameraPersp.aspect = aspect;
      cameraPersp.updateProjectionMatrix();

      cameraOrtho.left = cameraOrtho.bottom * aspect;
      cameraOrtho.right = cameraOrtho.top * aspect;
      cameraOrtho.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    }

    function render() {
      renderer.render(scene, currentCamera, camera);
    }
    // === THREE.JS EXAMPLE CODE END ===

    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "You made it!! 😄🎉",
        html: "This is the lesson preview page where you can view your selected assets and <b> Transition, Scale and Rotate them.</b> How cool is that?!!<br/> Now show us your imagination and the cool things you could do!",
        icon: "info",
        confirmButtonText:
          '<i className="fa fa-thumbs-up"></i> Great! Whats next?',
        confirmButtonAriaLabel: "Thumbs up, great!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Instructions",
            html: '<h4>Use "W" to translate <br/> "E" rotate <br/> "R" scale <br/> "+/-" adjust size "Q" toggle world/local space <br/> "Shift" snap to grid "X" toggle X <br/> "Y" toggle Y <br/> "Z" toggle Z <br/> "Spacebar" toggle enabled "C" toggle camera <br/> "V" random zoom. <br/> <b>After that click on "Next" to go to publish your lesson</b></h4>',
            icon: "question",
          });
        }
      });
  }
  routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };

  handleClick = () => {
    console.log("handleClick");
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire({
      title: "Instructions",
      html: '<h4>Use "W" to translate <br/> "E" rotate <br/> "R" scale <br/> "+/-" adjust size "Q" toggle world/local space <br/> "Shift" snap to grid "X" toggle X <br/> "Y" toggle Y <br/> "Z" toggle Z <br/> "Spacebar" toggle enabled "C" toggle camera <br/> "V" random zoom. <br/> <b>After that click on "Next" to go to publish your lesson</b></h4>',
      icon: "question",
    });
  };

  handleNext = () => {
    this.routeChange("CreateLesson/publish");
  };

  render() {
    return (
      <div>
        <div ref={(ref) => (this.mount = ref)} />
        <TogetherJS />
        <div id="container"></div>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Prevbttn onClick={() => this.routeChange("CreateLesson/assets")} />
            <Nextbttn onClick={() => this.handleNext()} />
          </Grid>
          <div style={{ float: "left" }}>
            <h1>Lesson preview</h1>
          </div>
          <div style={{ float: "left" }}>
            <Closebttn />
          </div>
        </div>
      </div>
    );
  }
}
