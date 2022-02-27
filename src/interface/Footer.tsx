import * as React from "react";

export default class Component extends React.Component {
  render() {
    return (
      <div
        className={`w-full h-20 bg-theme-600 absolute top-[100%] flex justify-center items-center`}>
        <p className={`text-center text-xl`}>
          MiniCade by
          <a
            href="https://github.com/ewsgit"
            className={`font-encodesans font-bold hover:underline pl-1 text-[#EF4444]`}>
            EWSGIT
          </a>
        </p>
      </div>
    );
  }
}
