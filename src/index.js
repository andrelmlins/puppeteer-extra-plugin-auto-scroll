const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin');

class AutoScrollPlugin extends PuppeteerExtraPlugin {
  constructor(config = {}) {
    super(config);
  }

  get name() {
    return 'auto-scroll';
  }

  /**
   * Generate auto scroll
   * @param  {?String} id Initial port
   * @param  {!Number} distance Scroll distance
   * @param  {!Number} interval Interval to scroll
   */
  async autoScroll(id, distance = 100, interval = 1000) {
    await this.evaluate(
      await this.runAutoScroll(id, distance || 100, interval || 1000)
    );
  }

  /**
   * Run auto scroll
   * @param  {?String} id Initial port
   * @param  {!Number} distance Scroll distance
   * @param  {!Number} interval Interval to scroll
   */
  async runAutoScroll(id, distance, interval) {
    await new Promise(resolve => {
      let totalHeight = 0;
      let timer = setInterval(() => {
        const document = id ? document.getElementById(id) : document.body;
        let scrollHeight = document.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  }

  async onPageCreated(page) {
    page.autoScroll = this.autoScroll.bind(page);
  }
}

module.exports = function(pluginConfig) {
  return new AutoScrollPlugin(pluginConfig);
};
