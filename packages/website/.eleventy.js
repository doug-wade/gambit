// const tybaltPlugin = require("@tybalt/eleventy-plugin");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./components');
    eleventyConfig.addPassthroughCopy('./lib');
    eleventyConfig.addPassthroughCopy('./css');
    eleventyConfig.setBrowserSyncConfig({
        open: true,
    });

    //   eleventyConfig.addPlugin(tybaltPlugin, {
    //     componentModules: ["./components/index.js"],
    //   });

    return {
        pathPrefix: '/tybalt/',
        passthroughFileCopy: true,
    };
};