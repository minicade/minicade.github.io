import * as React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default class Component extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div
          className={`h-[calc(100vh-4.5rem)] bg-[url("./assets/MiniCade_Branding_Background.svg")] w-full flex items-center justify-center flex-col bg-fixed bg-cover`}>
          <div className={`mb-4 rounded-xl bg-theme-500 bg-opacity-80 backdrop-blur-sm`}>
            <h1 className={`text-6xl p-6`}>Welcome to MiniCade</h1>
          </div>
          <button
            className={`text-2xl bg-branding p-4 pl-8 pr-8 rounded-2xl m-0 hover:bg-branding-light active:bg-branding-dark transition-colors border-branding-light hover:border-branding hover:border-opacity-100 border-4 border-opacity-0`}>
            Browse Games
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}
