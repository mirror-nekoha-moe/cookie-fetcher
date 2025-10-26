const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

const outDir = "./cookies";

async function refreshCookies() {
    fs.mkdirSync(outDir, { recursive: true });

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: './puppeteer_profile',
    });
    const page = await browser.newPage();

    try {
        // Open osu! home page
        await page.goto('https://osu.ppy.sh', { waitUntil: 'networkidle2' });

        // Get all cookies for the current page
        const cookies = await page.cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${encodeURIComponent(c.value)}`).join('; ');
        
        // Save files
        fs.writeFileSync(path.join(outDir, 'cookies_header.txt'), cookieHeader);
        fs.writeFileSync(path.join(outDir, 'cookies.json'), JSON.stringify(cookies, null, 2));

        await browser.close();
    } catch (err) {
        console.error('Error refreshing cookies:', err);
        await browser.close();
    }
}

refreshCookies();
setInterval(refreshCookies, 24 * 60 * 60 * 1000); // 24h