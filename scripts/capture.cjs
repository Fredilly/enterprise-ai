const { chromium } = require('playwright');
(async () => {
 const browser = await chromium.launch({ headless: true });
 const sites = [
  ['scoop', 'https://scoop.article6.org/'],
  ['signal', 'https://signal.article6.org/']
 ];
 for (const [name, url] of sites) {
  const page = await browser.newPage({ viewport:{ width:1360, height:880 }, deviceScaleFactor:1 });
  try {
   const response = await page.goto(url, { waitUntil:'domcontentloaded', timeout:35000 });
   if (!response || response.status() >= 400) throw Error('HTTP '+(response && response.status()));
   await page.waitForTimeout(1800);
   await page.screenshot({ path:'assets/'+name+'.png', animations:'disabled' });
   console.log('Captured',name,page.url());
  } catch(e) { console.warn('Capture failed:',name,e.message); }
  await page.close();
 }
 await browser.close();
})();