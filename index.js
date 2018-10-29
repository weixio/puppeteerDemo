const puppeteer = require('puppeteer');

//例子1
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const override = Object.assign(page.viewport(), {height: 2000,width:1344});
//     await page.setViewport(override);
//     await page.goto('https://im.qq.com/index.shtml');
//     await page.screenshot({path: 'example.png'});
//
//     await browser.close();
// })();

async function run() {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();


    await page.goto('https://www.hao123.com/');
    await page.waitFor(6*1000);
    await page.screenshot({path: 'hao123-.png',fullPage: true});


    browser.close();
}

run();
