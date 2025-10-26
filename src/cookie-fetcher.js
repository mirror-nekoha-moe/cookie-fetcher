// login.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set user-agent like osu! client
    await page.setUserAgent('osu!/2025.10.26');

    // Go to osu! login page
    await page.goto('https://osu.ppy.sh/home/login');

    // Fill form and submit
    await page.type('#username', 'YOUR_USERNAME');
    await page.type('#password', 'YOUR_PASSWORD');
    await page.click('button[type=submit]');

    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Get cookies
    const cookies = await page.cookies();
    console.log(JSON.stringify(cookies));

    await browser.close();
})();
