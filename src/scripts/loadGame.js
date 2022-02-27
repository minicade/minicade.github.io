"use strict";
let doc = document.getElementById("game");
let query = new URLSearchParams(window.location.search);
let game = query.get("game");
doc.innerHTML = `<iframe src="./../games/${game}/index.html" width="${doc.clientWidth}" height="${doc.clientHeight}" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation" frameborder="0"></iframe>`;
