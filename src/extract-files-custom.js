function customExtractFiles(value, path) {
  if (path === undefined) path = '';
  let clone;
  const files = new Map();

  function addFile(paths, file) {
    const storedPaths = files.get(file);
    if (storedPaths) storedPaths.push.apply(storedPaths, paths);
    else files.set(file, paths);
  }

  if (
    (typeof File !== 'undefined' && value instanceof File)
    || (typeof Blob !== 'undefined' && value instanceof Blob)
    || value instanceof ArrayBuffer
  ) {
    clone = null;
    addFile([path], value);
  } else {
    const prefix = path ? `${path  }.` : '';
    if (typeof FileList !== 'undefined' && value instanceof FileList) {
      clone = Array.prototype.map.call(value, function (file, i) {
        addFile([`${  prefix  }${i}`], file);
        return null;
      });
    } else if (Array.isArray(value)) {
      clone = value.map(function (child, i) {
        const result = customExtractFiles(child, `${  prefix  }${i}`);
        result.files.forEach(addFile);
        return result.clone;
      });
    } else if (value && value.constructor === Object) {
      clone = {};

      for (const i in value) {
        const result = customExtractFiles(value[i], `${  prefix  }${i}`);
        result.files.forEach(addFile);
        clone[i] = result.clone;
      }
    } else clone = value;
  }

  return {
    clone,
    files,
  };
}

exports.__esModule = true;
exports.customExtractFiles = customExtractFiles;
