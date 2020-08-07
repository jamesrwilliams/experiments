const puppeteer = require('puppeteer');

const targets = [
    'https://pts-apex.netlify.com/solutions/loyalty-currency-retailing/',
    'https://company.points.com/solutions/loyalty-currency-retailing/',
];

let defaults = {
  fullPage: true,
};

(async () => {

    const dateStamp = getDateStamp();

    console.log(`Starting screenshot generation of ${targets.length} URLs.`);

    const browser = await puppeteer.launch({headless: false, slowMo: 250});

    for( let i = 0; i < targets.length; i++) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 1400 });
        await page.goto(targets[i], { waitUntil: 'networkidle2'});
        const pageTitle = await page.title();
        const title = (pageTitle !== '' ? '-' + slugify(pageTitle) : '');
        await page.screenshot({...defaults, path: `output/${dateStamp}${title}.png`});
        console.log(`${i + 1}/${targets.length} completed. (${targets[i]})`);
    }

    await browser.close();

})();

function slugify(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string.toString()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

function getDateStamp() {

    const n = new Date();

    const year = n.getFullYear();
    const month = padNumber(n.getMonth());
    const day = padNumber(n.getDate());
    const hours = padNumber(n.getHours());
    const minutes = padNumber(n.getMinutes());
    const seconds = padNumber(n.getSeconds());

    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}

function padNumber(value) {
    return (value < 10 ? '0' + value : value );
}
