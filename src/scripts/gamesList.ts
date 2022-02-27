import { GAMES } from "./../games/games.js";

let documentPage = document.getElementById("appsList") as HTMLDivElement;

GAMES.map((game: string) => {
  documentPage.innerHTML += `
    <div>
      <a href="./game/?game=${game}">${game}</a>
    </div>
  `;
});
