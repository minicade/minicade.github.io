import * as React from "react"

export default class Component extends React.Component {
  render() {
    return (
      <div>
        <iframe src={require("./../games/snek/index.html")} frameBorder="0"></iframe>
      </div>
    );
  }
}