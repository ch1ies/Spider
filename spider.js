const puppeteer = require('puppeteer')
const $ = require('jquery')
function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
const url = `https://www.woyaogexing.com/touxiang/katong/index.html`;
module.exports = async () => {
  try {
    console.log('start visit the target page');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'], //不是沙箱模式
      dumpio: false,
      headless: false //是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true
    });
    //args :传递给 chrome 实例的其他参数，比如你可以使用”–ash-host-window-bounds=1024x768” 来设置浏览器窗口大小。更多参数参数列表可以参考这里
    //dumpio 是否将浏览器进程stdout和stderr导入到process.stdout和process.stderr中。默认为false。
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
    });
    let arr = [] //保存抓取的内容
    await sleep(3000);
    await page.waitForSelector('.page a:nth-last-of-type(1)'); //异步的，等待元素加载之后，否则获取不到异步加载的元素
    for (let i = 0; i < 1; i++) {
      //  设置等待时间
      await sleep(5000);
      let a1 = await pageSpider()
      a1.forEach(item => arr.push(item))
      await page.click('.page a:nth-last-of-type(1)'); //点击按钮一次
    }
    async function pageSpider() {
      const result = await page.evaluate(() => {
        var items = $('.pMain .txList a.img ');
        var links = [];
        //判断这里是否列表有数值
        if (items.length >= 1) {
          console.log(items, 'items')
          items.each((index, item) => {
            let it = $(item);
            let url = 'https:' + it.find('img').attr('src')
            links.push({
              url
            });
          });
        }
        return links.filter(item => Object.keys(item).length > 0);
      });
      return result
    }
    browser.close();
    return arr
  } catch (err) {
    console.log(err);
  }
};
