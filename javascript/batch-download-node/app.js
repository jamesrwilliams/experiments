const https = require('https');
const fs = require('fs');
const path = require('path');

const tempData = [
  {
    logo: "https://placehold.it/250x400.png",
    name: "example",
  }
];

const getFileName = function(url) {
  return url.substring(url.lastIndexOf('/')+1);
}

const download = function(url) {

  const filePath = path.resolve('./output/' + getFileName(url));

  return new Promise((resolve, reject) => {

    const file = fs.createWriteStream(filePath);
    const request = https.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        resolve();
      });
    }).on('error', function(err) { // Handle errors
      fs.unlink(filePath);
      reject(err);
    });
  });
};

const processInput = async () => {
  const filePath = path.resolve('./input/data.txt');
  const buffer = fs.readFileSync(filePath);
  const data = buffer.toString();
  return data.split('\n').filter((n) => n !== '' && n[0] !== '#' );
}

const processBatchFile = async () => {
  const promises = [];

  const data = await processInput();

  data.forEach((entry) => {
    promises.push(download(entry));
  });

  return Promise.all(promises);
}

processBatchFile().then(() => {
  console.log('Process complete');
}).catch((errors) => {
  console.log(errors);
});
