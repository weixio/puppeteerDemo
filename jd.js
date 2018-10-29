//自动滚动截取整个京东商城页面

const puppeteer = require('puppeteer');
const fs = require('fs');
const targetURL = fs.readFileSync('/Users/daozhang/code/puppeteerDemo/url.txt', 'utf-8');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(targetURL,{waitUntil: 'networkidle2'});
    await page.setViewport({
        width: 1200,
        height: 800
    });
    console.log('wait 5000');
    await autoScroll(page);

    await page.screenshot({
        path: 'jd.png',
        fullPage: true
    });

    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                console.log(scrollHeight);
                window.scrollBy(0, distance);
                console.log('scrollBy');
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
