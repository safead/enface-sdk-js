import { isNodeEnvironment } from './globals';

const readFileAsArrayBuffer = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event => {
      resolve(event.target.result);
    });
    reader.onerror = (error => {
      reject(error);
    });
    reader.readAsArrayBuffer(file);
  });
};

export const nameImagesByIndex = images => {
  return images.map((item, index) => {
    item.name = `${index}.jpg`;
    return item;
  });
};

export const isUuid = string => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
};

export const checkImages = async (images, minLength, minSize) => {
  if (
    !images
    || !Array.isArray(images)
    || minLength !== images.length
  ) {
    throw new Error(`images array of length ${minLength} required`);
  }
  return Promise.all(images.map(async (item, index) => {
    if (item instanceof Uint8Array) item = item.buffer;
    if (
      (isNodeEnvironment
        && !(item instanceof ArrayBuffer))
      || (
        !isNodeEnvironment
        && !(
          item instanceof ArrayBuffer
          || item instanceof File
          || item instanceof Blob
        )
      )
    ) {
      throw new Error(`Bad image [${index}] format`);
    }
    if (
      (
        item instanceof ArrayBuffer
        && item.byteLength < minSize
      )
      || (
        !isNodeEnvironment
        && (
          item instanceof File
          || item instanceof Blob
        )
        && item.size < minSize
      )
    ) {
      throw new Error(`image [${index}] is too small`);
    }
    return isNodeEnvironment
      ? item
      : new Blob([item], { type : 'image/jpeg' });
  }));
};

export const isObject = obj => {
  return obj === Object(obj);
};

export const filterObject = (obj, filteredKey) => {
  for (const key of Object.keys(obj)) {
    delete obj[filteredKey];
    if (isObject(obj[key])) {
      obj[key] = filterObject(obj[key], filteredKey);
    }
  }
  return obj;
};
