import puppeteer from "puppeteer";
import { spawn } from 'child_process';
const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();
  const pageLink = 'https://www.amiami.com/eng/'
  const laplus = 'https://www.amiami.com/eng/detail/?gcode=FIGURE-160436';
  const pageBroken = "#__nuxt > div > div.pc-wrapper > div:nth-child(2) > div > div > section > h2"
await page.goto(laplus, {

  waitUntil: "domcontentloaded",
});

console.log(page.waitForSelector(pageBroken));
//if(page.waitForSelector(pageBroken).innerHTML =)

const new_trending = "#newItems100Ranking > div > div > ul > div.owl-stage-outer > div > div:nth-child(1) > li > a > span.ranking-list__list-item_caption";
const All_items = "#newItems1001 > div > ul"
const Ranking = "#newItems100Ranking > div > div > ul > div.owl-stage-outer > div.owl-item"

const laplusItem = "#__nuxt > div > div.pc-wrapper > div:nth-child(2) > div > div > div > div > div > div > section.item-detail > div > div.item-detail__right > div:nth-child(1) >"
const lapItemName = " h2"
const lapStock = " div > div > span:nth-child(5)"

var currVar = laplusItem
await page.waitForSelector(currVar)
const el = await page.$(currVar.concat(lapItemName))


const ItemName  = await el.evaluate(e => e.innerHTML)
console.log(ItemName)
const ItemStockStatus = await el.evaluate(e => e.innerHTML)
console.log(ItemStockStatus)



//Data sending
const data = {
  req: currVar,
  Name: ItemName.toString(),
  StockStatus: ItemStockStatus.toString()
};

//start py process
const py = spawn('python', ['main.py', JSON.stringify(data)]);

py.stdout.on('data', (result) => {
  console.log('from python:', result.toString());
}
);

py.stderr.on('data', (err) => {
  console.error('Error', err.toString());
})

//const element = Array.from(document.querySelectorAll(currVar))
//console.log(element)



//page.close();
};

// Start the scraping
getQuotes();







