import { GAMES } from "./../games/games.js";
let documentPage = document.getElementById("appsList");
GAMES.map((game) => {
    documentPage.innerHTML += `
    <div>
      <a href="./game/?game=${game}">${game}</a>
    </div>
  `;
});
