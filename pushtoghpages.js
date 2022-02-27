const ghpages = require("gh-pages");

ghpages.publish("src", {
  branch: "gh-pages",
  repo: "https://github.com/ewsgit/devdash.git",
});