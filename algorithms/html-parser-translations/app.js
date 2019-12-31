const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const inlineCSS = require('inline-css');

const run = async function(fileName) {

    const filePath = path.resolve("./input/", fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    const inlineHTML = await inlineCSS(raw, {url: '/'});
    const $ = cheerio.load(inlineHTML, { decodeEntities: true });
    const fontElms = $('font');

    $('font').each(function(i, elm) {
        let content = $(this).html();
        let element = $(this);

        for(const [key,value] of Object.entries($(this))) {
            if(key !== 'options' && key !== 'length' && key !== '_root' ) {
                if(value.attribs.style !== undefined && value.attribs.style.indexOf('font-weight: 700;') !== -1 ) {
                    $(this).replaceWith(`<strong>${content}</strong>`);
                } else {
                    $(this).replaceWith(content);
                }
            }
        }
    });

    const page = $('body');

    page.append("<script>const blocks = document.querySelectorAll('table tr:nth-child(2) td'); for(const block of blocks) { const content = block.innerHTML; const jsonElement = document.createElement('div'); jsonElement.classList.add('json-viewer'); jsonElement.innerText = JSON.stringify(content); block.appendChild(jsonElement); } const headings = document.querySelectorAll('table tr:nth-child(1) td'); let count = 1; for(const heading of headings) { const button = document.createElement('button'); button.innerText = `Toggle HTML/Preview ${count}`; button.classList.add('toggleButton'); let buttonIndex = count; button.addEventListener('click', () => { const block = document.querySelector(`table tr:nth-child(2) td:nth-child(${buttonIndex})`); block.classList.toggle('json'); }); count++; heading.prepend(button); } </script>");
    page.append(`<style>.toggleButton { display: block; float: right; background: yellow; } td { position: relative; } .json-viewer { position: absolute; display: none; font-family: monospace; top: 0; background: white; } td.json .json-viewer { display: block; }</style>`);

    const output = $.html({ decodeEntities: false });
    fs.writeFileSync(path.resolve('./', 'output.html'), output);

}

const debug = false;
const file = (debug ? 'example.html' : 'sample.htm' );

run(file).catch(error => console.log(error));


