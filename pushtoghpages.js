const ghpages = require("gh-pages");

ghpages.publish("src", {
  branch: "gh-pages",
  repo: "https://github.com/minicade/minicade.github.io.git",
});