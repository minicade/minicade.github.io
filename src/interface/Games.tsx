import * as React from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"

export default class Component extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className={`grid grid-cols-3`}>
          {
            require("./../games/games.json").map((game: {name: string}, index: number) => {
              return (
                <div key={game.name + index}>
                  {
                    game.name
                  }
                </div>
              )
            })
          }
        </div>
        <Footer />
      </div> 
    );
  }
}
