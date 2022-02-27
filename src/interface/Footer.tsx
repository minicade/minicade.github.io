import * as React from "react"

export default class Component extends React.Component {
  render() {
    return (
      <div className={`w-full h-20 bg-theme-600 absolute top-[100%] flex justify-center items-center`}>
        <p className={`text-center text-xl w-full`}>MiniCade by @Ewsgit</p>
      </div>
    );
  }
}