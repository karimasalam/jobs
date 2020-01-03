import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="ui menu">
          <div className="item"><Link to='/' >
              Jobs
            </Link></div>         
          <div className="right menu">
            <div className="item">Sign In</div>
            <div className="item">Help</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
