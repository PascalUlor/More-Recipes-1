const getMimetype = (signature) => {
  switch (signature) {
    case '89504E47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case 'FFD8FFDB':
    case 'FFD8FFE0':
    case 'FFD8FFE1':
      return 'image/jpeg';
    case '25504446':
      return 'application/pdf';
    case '504B0304':
      return 'application/zip';
    default:
      return 'Unknown filetype';
  }
};

const imageFileChecker = (filereader, file, callback) => {
  filereader.onload = (evt) => {
    const uint = new Uint8Array(evt.target.result);
    const bytes = [];
    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    });
    const hex = bytes.join('').toUpperCase();
    const fileType = getMimetype(hex);
    callback(fileType);
  };
  const blob = file.slice(0, 4);
  filereader.readAsArrayBuffer(blob);
};
export default imageFileChecker;
