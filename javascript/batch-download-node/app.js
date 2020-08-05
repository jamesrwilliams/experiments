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

const processBatchFile = async (data, propertyKey) => {
  const promises = [];

  data.forEach((entry) => {
    promises.push(download(entry[propertyKey]));
  });

  return Promise.all(promises);
}

processBatchFile(tempData, 'logo').then(() => {
  console.log('Process complete');
}).catch((errors) => {
  console.log(errors);
});


