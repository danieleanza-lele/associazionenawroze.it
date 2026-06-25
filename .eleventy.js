module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addCollection("publishedEvents", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/events/*.md")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => {
        const aOrder = Number(a.data.order || 0);
        const bOrder = Number(b.data.order || 0);
        return aOrder - bOrder;
      });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

