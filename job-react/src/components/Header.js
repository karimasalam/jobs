import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  renderSignIn = () => {
    if(localStorage.getItem("user"))
      return <div className="item">{`Welcome ${localStorage.getItem("user")}`}</div>;
    else return <Link to="/Login" className="item">Log In</Link>;
  }
  render() {
    return (
      <div>
        <div className="ui menu">
          <div className="item"><Link to='/' >
              Jobs
            </Link></div>         
          <div className="right menu">
            {this.renderSignIn()}
            <div className="item">Help</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { Auth: state.Auth };
};
export default connect(mapStateToProps)(Header);
