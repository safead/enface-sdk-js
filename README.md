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

## Enface REST API

Enface supports 2 types of API requests - GraphQL & REST. Full GraphQL documentstion can be found here: http://docs.enface.io. REST API accepts data in `multipart/form-data` format with following fields:

* apiKey
* array of images in binary form

JavaScript examples:

## Face recognition:

```js
  const formData  = new FormData();
  formData.append('apiKey', 'YOUR_RECOGNITION_API_KEY');
  formData.append('image', image, `image1.jpg`);
  const result = await fetch('https://enface-api-server.herokuapp.com/rest/recognize', {
    method: 'post',
    body: formData,
  });
```

## Liveness detection:

```js
  const formData  = new FormData();
  formData.append('apiKey', 'YOUR_LIVENESS_API_KEY');
  images.forEach((image, index) => formData.append('image', image, `${index}.jpg`));
  const result = await fetch('https://enface-api-server.herokuapp.com/rest/liveness', {
    method: 'post',
    body: formData,
  });
```

## Both face recognition & liveness detection in one request:

```js
  const formData  = new FormData();
  formData.append('apiKey', 'YOUR_RECOGNITION_LIVENESS_API_KEY');
  images.forEach((image, index) => formData.append('image', image, `${index}.jpg`));
  const result = await fetch('https://enface-api-server.herokuapp.com/rest/recognizeLiveness', {
    method: 'post',
    body: formData,
  });
```

## Raw REST API post request with header:

```html
POST https://enface-api-server.herokuapp.com/rest/recognizeLiveness HTTP/1.1
Host: enface-api-server.herokuapp.com
Content-Type: multipart/form-data; boundary=----------------------------794180515515914733140144

----------------------------794180515515914733140144
Content-Disposition: form-data; name="apiKey"
9e9d58b2-d0c9-4465-a4a0-c96db3ebc3b4

----------------------------794180515515914733140144
Content-Disposition: form-data; name="image";
filename="0.jpg"
Content-Type: image/jpeg

binary image1
----------------------------794180515515914733140144
Content-Disposition: form-data; name="image";
filename="1.jpg"
Content-Type: image/jpeg

binary image2
----------------------------794180515515914733140144
Content-Disposition: form-data; name="image";
filename="2.jpg"
Content-Type: image/jpeg

binary image3
```