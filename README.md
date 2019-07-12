# Enface SDK JS library

This package works both in **Node.js and Browser** environment. Supported browsers:

* Chrome
* Opera
* FireFox
* Internet Explorer (Edge)
* Safari

## Installation

### NPM

```bash
npm i --save @enface/sdk
```

### Yarn

```bash
yarn add @enface/sdk
```

## Usage

```js
// ES2015 module import:
import { createEnfaceApi } from "@enface/sdk";

// CommonJS module require:
const { createEnfaceApi } = require("@enface/sdk");

// Initialization:
const enfaceApi = createEnfaceApi({
  apiKey: 'YOUR_API_KEY'
});
```

## Face recognition:

```js
// Request:
const result = await enfaceApi.recognize({
  images: [image]
});
```

## Liveness detection:

```js
// Request:
const result = await enfaceApi.liveness({
  images: [image1, image2, image3]
});
```

## Both face recognition & liveness detection in one request:


```js
// Request:
const result = await enfaceApi.recognizeLiveness({
  images: [image1, image2, image3]
});
```

Images should be in JPEG format with minimal resolution of 800x600 pixels (1280x720 is recommended for better performance). For liveness and complex requests 3 images are required. They should be taken from a camera with strict time frames - 160-200 milliseconds between each other. Supported images inputs:

* ArrayBuffer (node.js or browser environment)
* Uint8Array (node.js or browser environment)
* Blob (browser environment)
* File, taken from `<input type="file">` (browser environment)

## Tests

**To completely pass the tests fill the values of the corresponding variables below with your own API keys in `"__tests__/api.js"`.**

* const recognitionApiKey = 'YOUR_RECOGNITION_API_KEY';
* const livenessApiKey = 'YOUR_LIVENESS_API_KEY';
* const recognizeLivenessApiKey = 'YOUR_RECOGNIZE_LIVENESS_API_KEY';


```js
// Running the tests
npm test
```

## Browser usage

Get the minified "enface.web.js" script from "dist/" folder and link to your web page. Enface library constructor will become available in the global scope:

```html
<script src="set_correct_path/enface.web.js"></script>
<script>

  const enfaceApi = createEnfaceApi({
    apiKey: 'YOUR_API_KEY'
  });

  enfaceApi.recognize({ images: [image] }).then(function(result){
    console.log(result);
  });

</script>
```
