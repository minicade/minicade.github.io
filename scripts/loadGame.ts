let LOAD_doc = document.getElementById("game") as HTMLDivElement;

let LOAD_query = new URLSearchParams(window.location.search);
let LOAD_game = LOAD_query.get("game");
if (LOAD_game !== null) {
  LOAD_doc.innerHTML = `<iframe src="./../games/${LOAD_game}/index.html" width="${LOAD_doc.clientWidth}" height="${LOAD_doc.clientHeight}" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation" frameborder="0"></iframe>`;
} else {
  LOAD_doc.innerHTML = `<h1 style="font-size:3rem;">No game selected</h1>      <button onclick="window.location.href='..'" class="text-2xl bg-branding p-4 pl-8 pr-8 rounded-2xl m-0 hover:bg-branding-light active:bg-branding-dark transition-colors border-branding-light hover:border-branding hover:border-opacity-100 border-4 border-opacity-0">
    Go Back
  </button>`;
}
