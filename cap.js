const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

function wait (ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const targetURL = fs.readFileSync('/Users/daozhang/code/puppeteerDemo/url.txt', 'utf-8');
const outputFile = 'cap.png';
const screenshotDelay = 5000;

(async () => {
    //const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-webgl', '--disable-gpu']});
    const browser = await puppeteer.launch({headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => { interceptedRequest.continue() })
    const override = Object.assign(page.viewport(), {height: 2000,width:1344});
    await page.setViewport(override);
    //const watchDog = page.mainFrame().waitForSelector('img', screenshotDelay)
    //await page.on('request', request => {
    //          if (request.resourceType() === 'document') {
    //              console.log("continue")
    //              request.continue();
    //          } else {
    //              request.abort();
    //          }
    //
    //});
    await page.goto('https://www.hao123.com/');
    console.log('111');
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();
    console.log(height);

    // Scroll one viewport at a time, pausing to let content load
    const viewportHeight = page.viewport().height;
    let viewportIncr = 0;
    while (viewportIncr + viewportHeight < height) {
        await page.evaluate((viewportHeight) => {
            window.scrollBy(0, viewportHeight);
        }, viewportHeight);
        await wait(1000);
        viewportIncr = viewportIncr + viewportHeight;
    }

    // Scroll back to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    await page.screenshot({path:outputFile, fullPage: true});
    //await watchDog;

    await browser.close();
})();
