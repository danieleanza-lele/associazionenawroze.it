const siteData = require("./siteData.source.json");

const items = Array.isArray(siteData.events?.items) ? siteData.events.items : [];

siteData.events = {
  ...siteData.events,
  upcomingItems: items.filter((item) => !item.isPast),
  pastItems: items.filter((item) => item.isPast)
};

module.exports = siteData;
