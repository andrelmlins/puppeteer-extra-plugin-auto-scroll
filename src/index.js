const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin');

class AutoScrollPlugin extends PuppeteerExtraPlugin {
  constructor(config = {}) {
    super(config);
  }

  get name() {
    return 'auto-scroll';
  }

  /**
   * Run auto scroll
   * @param  {String} selector Initial port
   * @param  {Number} distance Scroll distance
   * @param  {Number} interval Interval to scroll
   */
  async autoScroll(selector = 'body', distance = 100, interval = 1000) {
    selector = selector || 'body';
    distance = distance || 100;
    interval = interval || 1000;

    const document = await this.$(selector);

    const runAutoScroll = (distance, interval, document) =>
      new Promise(resolve => {
        let totalHeight = 0;
        let timer = setInterval(() => {
          let scrollHeight = document.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, interval);
      });

    await this.evaluate(runAutoScroll, distance, interval, document);
  }

  async onPageCreated(page) {
    page.autoScroll = this.autoScroll.bind(page);
  }
}

module.exports = function(pluginConfig) {
  return new AutoScrollPlugin(pluginConfig);
};
