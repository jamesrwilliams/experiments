const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./data/releases-en-us.json', 'utf8'));

let output = '';
let headers = '';

items.forEach((item, itemCount) => {

  ['title','subtitle','date','url'].forEach((property) => {
    if(itemCount === 0) {
      headers += property + ',';
    }
    if(item[property]) {
      output += '"' + item[property] + '",';
    } else {
      output += '"",';
    }
  });

  output = output.slice(0, -1) + '\n'
})

output = headers.slice(0, -1) + '\n' + output;

fs.writeFileSync(`./output/example-output.csv`, output);


