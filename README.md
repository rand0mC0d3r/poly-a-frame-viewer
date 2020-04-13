# Poly ❤️ A-Frame

#### Google POLY (https://poly.google.com/) & A-Frame (https://aframe.io/)

**NOTE**: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It's intended for learning A-Frame and offering a simple tool/solution to interact with your first GTLF models

---

## 🎭 Preview

**Overview**

![](https://github.com/rand0mC0d3r/poly-viewer/blob/master/assets/unicornInVR.png?raw=true)

**Searching**

![](https://github.com/rand0mC0d3r/poly-viewer/blob/master/assets/simpleAssetSearch.png?raw=true)

---

#### 📚 Read first (aka. R-T-Friendly-M)
This is a simple implementation in React.js of a search in Poly Web API and render the selected GTLF(2) model in A-Frame as an imported asset. Read below briefly how all got assembled:

**Google POLY Api**
- API Overview: https://developers.google.com/poly/reference/api/rest
- API Search: https://developers.google.com/poly/reference/api/rest/v1/assets/list
- API Get Asset: https://developers.google.com/poly/reference/api/rest/v1/assets/get

**A-Frame**
- Getting started: https://aframe.io/docs/1.0.0/introduction/
- 3D models: https://aframe.io/docs/1.0.0/introduction/models.html
- Simplest scene and Hello World: https://aframe.io/docs/1.0.0/guides/building-a-basic-scene.html
- Loading an asset: https://aframe.io/docs/1.0.0/components/gltf-model.html

---

#### 🔑 Google Poly - Api Key

You require in order to search and load assets from Google Poly an API Key. Find further reading here: https://developers.google.com/poly/develop/api. The free plan allows you a generous number of searches and assets to load and explore. Perfect for hobby users

---
A bit of explanations...

### Understanding the GTLF2 format

- https://aframe.io/docs/1.0.0/introduction/models.html - a short tutorial describing loading various formats, and how to apply besides the mesh structure also the textures, and if any animations
- https://aframe.io/docs/1.0.0/components/gltf-model.html - the particular tab to load a gtlf model into an entity
- https://threejs.org/docs/#examples/en/loaders/GLTFLoader - understanding what happens under the hood when A-Frame passes all the calls, data and structures to the underlaying Three.js renderer and parser.

##### 🦴 Anatomy of a simple Poly Asset

Read more about the keys of the model from the documentation of the Khronos group: https://www.khronos.org/files/gltf20-reference-guide.pdf

```
...
accessors: ...
asset: ...
bufferViews: ...
buffers: [{byteLength: ...0, name: "buffer-0", uri: "SAMPLE.bin"}]
images: [{mimeType: "image/png", ..., uri: "SAMPLE.png"}]
materials: [{alphaMode: "OPAQUE", doubleSided: true, name: "...",…}]
meshes: ...
nodes: ...
samplers: ...
scenes: ...
textures: ...
...
```

###### A few quick notes on some relevant keys:
- Images (optional) - loads from a relative path an image composed like a CSS Sprite with various colors and forms
- Materials - describes how the loaded Image asset should be presented to the renderer - shineness factor, reflections, and texture coordinates
- Buffers - loads the 3D binary file that hold the model and contains the details on how all is wired and how the textures are shaped/wrapped


#### Troubleshooting

*It's not a happy section but issues happen*

- **Assets are one block color, or the canvas is not populated**

    Based on the structure above described, identify in the ```buffers``` and ```images``` section the name of the relative assets and notice them being loaded in the Network Tab in the Developer Tools

    Guide: https://developers.google.com/web/tools/chrome-devtools/network#load

- **Assets are not loaded, and 403 is returned**

    Might not be your issue. Excluding connectivity issues, the Google Poly API might have been limiting your asset loading. Your script might react a quota limit or a traffic limit.

- **I have CORS issues**

    The CORS issues are related to the limiting of the API as an exceptional response from the API server. Just make sure even if locally, that all is served via HTTPS. No certificate is needed mandatory.

    - Edit the .env file to feature and restart the service
        ```
        ...
        HTTPS=true
        ```


---

### Internal Structure (React.js)

The application keeps the very basic structure of the **create-react-app** creator. It features the ```/public``` and ```/src``` folder, with all the defaults available at the time of the creation: index.html, the logos, the basic manifest, a sample index.js and a first simple App.js wiring a basic React page.

Injected for simplicity - there are a few scope isolated components, which are wired thru props and only using simple vertical data flows:

```
src/
    - components/
        - PolyDashboard (.js + .css)
        - PolyDetails (.js + .css)
        - PolyPreview (.js + .css)
        - PolyResult (.js + .css)
        - PolySearch (.js + .css)
    - App.js
```

**PolyDashboard** takes care of being the contained loader for the sides of the application and a basic state-in-the-middle component for the Poly assets transitioned between the Search component and the Preview component.

**PolyDetails** is a presentational component that just exposes the details of the JSON object selected by the user and provides further information about the displayed asset. A minimal extendable set of properties are presented in the current setup

**PolySearch** it's a ```fetch``` handler within a basic Component with simple state controller and lister. The Google Poly API is not publically available but it's free to use for personal use. The form takes care of controlling the flow of UX interaction by gating the calls until an API key is provided.

*NOTE#1: Out of respect for the community and the model licensing requirement, a sub-filtering is excluding the assets not allowed to be displayed unless CC.*

**PolyResult** is just a simple representational structure that shows the title of the asset, the provided preview thumbnail and handles the propagation of the user selection.

**PolyPreview** is a raw implementation of the A-Frame, in a constructed declarative mechanic, with using the Asset Management library to load in a reusable mode the selected Asset.

A reduced code is presented below of the asset manager and the loading mechanic

*NOTE#1: the position of the asset is set only 5m (VR measured) in front of the default camera structure auto-injected in absence of a user defined one (https://aframe.io/docs/1.0.0/components/camera.html)*

```
<a-scene embedded>
...
    <a-assets timeout="10000">
        <a-asset-item id="polyAsset" preload="auto" src={...url} crossorigin="true"/>
    </a-assets>

    <a-entity position="0 0 -5" >
        <a-gltf-model src="#polyAsset" autoscale={5} />
    </a-entity>
...
</a-scene>
```

*NOTE#2: Given the variability of the asset relative size, a scale mechanic would not work based on the absolute reference point of view. Therefore the object is being intercepted at load time via the **Entity-Component-System** by a **THREE.js** autoscaling component to evaluate the bounding box and reduce it's size proportionally.*

###### Autoscaling FYI

This issue is a well understood problem and resolved in multiple ways. Start here to read: https://stackoverflow.com/questions/49526461/aframe-auto-scale-and-auto-centering-loaded-models and here: https://github.com/aframevr/aframe/blob/master/docs/components/scale.md

Autoscalling works similar as in SVG, where the canvas size is available via the API, and then the perceived bounding box size of the asset can be evaluated from the mesh perspective. The ratio is reflected back on the scaling of the asset to obtain for various sizes a normalized asset that fits in the screen.

---

### 📢 Deployment

This application does not need any complicated procedure for public publishing. A few examples can be found online about how to deploy them on various **Cloud Hosting** platforms, like *AWS* and *GCP*, but for the sake of simplicity, i will guide you how to do so on **Heroku**, using a free Dyno.

- Create an account on Heroku, then reach: **https://dashboard.heroku.com/apps**
- On Navbar - right - click on New > **Create New Pipeline**
- **Name the pipeline** suggestively, and **connect your repository** reference to it
- **THEN**: Pipeline is created [Review Apps | Staging | Production]
- On Staging OR Production (by needs) section, click on **Add App** and then **Create new app...**
- In the side panel define a **name** and a **region of deployment**
- Once created click on the new app and reach the **Deploy** tab from the navbar
- At **Automatic Deploys** enable the process, and if ready from **Manual Deploy** trigger the first rollout
- Once done the application available at the **Open app** found in the navbar

Of course this can all be done via CLI, but it requires more skill:
https://devcenter.heroku.com/articles/git
https://www.freecodecamp.org/news/how-to-deploy-a-node-application-and-database-to-heroku/

---

### Further steps?

- Honor the asset's proposed background image
- Extend the search criteria
- Implement a simple load-next results mechanic bound on scroll down
- Extend the GTLF mechanic parsing and allow on the fly swapping.
- Responsive design
- AR Mode
- Orbital camera
- Tag search



---

###### Oh..you need Help?

*I'm here for you. Raise an issue and let's talk, or find me on the A-Frame slack chat*


##### Enjoy coding/exploring 😊