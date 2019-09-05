const fs = require('fs-extra');
const csv = require('csv-parser');
const results = [];

const fileName = 'copa-ios-tokens';

fs.createReadStream(`data/${fileName}.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        generateOutput(results);
    });

function generateOutput(input) {

    const translations = input;
    let count = 0;
    let output = [];

    translations.forEach((translation) => {

        const lng = translation.Lng;
        const token = translation.Token;
        const value = translation.Value;

        let indexInArray = objectArrayIndex(output, lng, 'identifier');

        if(indexInArray === false) {
            output.push({
                "identifier": `${lng}`,
                "prefix": `${lng}-`,
                "tokens": [
                    [token, value]
                ]
            })
        } else {
            output[indexInArray].tokens.push([token, value]);
        }

        count++;
    });

    fs.writeFile(`output/${fileName}-tokens.json`, JSON.stringify(output, null, 4), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('Output saved!');
    });

}

/**
 * [objectArrayIndex description]
 * @param  {array} haystack [description]
 * @param  {string} needleValue  [description]
 * @param  {string} needleProperty  [description]
 * @return {int | boolean}  [description]
 */
function objectArrayIndex(haystack, needleValue, needleProperty){

    let index = false;
    for(let i = 0; i < haystack.length; i++) {

        if (haystack[i][needleProperty] === needleValue) {

            index = i;
            break;
        }
    }

    return index;

}
