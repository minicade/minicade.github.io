import * as React from "react";

export default class Component extends React.Component {
  render() {
    return (
      <div className={`w-full sticky top-0 h-14 bg-theme-600 flex justify-center items-center`}>
        <img
          src={
            require("./../assets/branding_assets/Minicade Transparent wide.svg")
              .default
          }
          alt="minicade logo"
          className={`h-full absolute left-1 top-0`}
        />
        <div className={`right-1 absolute`}>
          <img src={require("./../assets/FlatIcons/interface-user-avatar-1.svg").default} alt="profile" />
        </div>
      </div>
    );
  }
}
