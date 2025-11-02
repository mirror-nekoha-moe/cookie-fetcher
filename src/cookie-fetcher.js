const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

const outDir = "./cookies";

async function refreshCookies() {
    console.log('[' + new Date().toISOString() + '] Starting cookie refresh...');
    fs.mkdirSync(outDir, { recursive: true });

    puppeteer.use(StealthPlugin());

    console.log('[' + new Date().toISOString() + '] Launching Chromium...');
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: './puppeteer_profile',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('[' + new Date().toISOString() + '] Chromium launched, opening page...');
    const page = await browser.newPage();

    try {
        // Open osu! home page
        console.log('[' + new Date().toISOString() + '] Navigating to osu.ppy.sh...');
        await page.goto('https://osu.ppy.sh', { waitUntil: 'networkidle2' });

        // Get all cookies for the current page
        const cookies = await page.cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${encodeURIComponent(c.value)}`).join('; ');
        
        console.log('[' + new Date().toISOString() + '] Got ' + cookies.length + ' cookies, saving...');
        // Save files
        fs.writeFileSync(path.join(outDir, 'cookies_header.txt'), cookieHeader);
        fs.writeFileSync(path.join(outDir, 'cookies.json'), JSON.stringify(cookies, null, 2));

        console.log('[' + new Date().toISOString() + '] Cookies saved successfully!');
        await browser.close();
    } catch (err) {
        console.error('[' + new Date().toISOString() + '] Error refreshing cookies:', err);
        await browser.close();
    }
}

console.log('[' + new Date().toISOString() + '] Cookie fetcher started. Running initial refresh...');
refreshCookies();
setInterval(refreshCookies, 24 * 60 * 60 * 1000); // 24h
console.log('[' + new Date().toISOString() + '] Scheduled to refresh every 24 hours.');