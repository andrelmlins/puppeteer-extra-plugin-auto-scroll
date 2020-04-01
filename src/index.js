const { PuppeteerExtraPlugin } = require("puppeteer-extra-plugin");

class AutoScrollPlugin extends PuppeteerExtraPlugin {
  constructor(config = {}) {
    super(config);
  }

  get name() {
    return "auto-scroll";
  }

  async autoScroll() {
    await this.evaluate(runAutoScroll());
  }

  async runAutoScroll() {
    await new Promise(resolve => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  }

  async onPageCreated(page) {
    page.autoScroll = this.autoScroll.bind(page);
  }
}

module.exports = function(pluginConfig) {
  return new AutoScrollPlugin(pluginConfig);
};
