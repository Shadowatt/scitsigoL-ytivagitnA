module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Add year filter
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

  // Set pathPrefix only when building on GitHub Pages (GITHUB_ACTIONS env var is set)
  const pathPrefix = process.env.GITHUB_ACTIONS ? '/scitsigoL-ytivagitnA/' : '';

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: pathPrefix
  };
};