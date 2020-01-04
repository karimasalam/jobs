import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {login} from '../../actions/index'
import {connect} from 'react-redux';
import history from "../../History";

class Login extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  renderPassword = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input type="password" {...input} />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = formValues => {
      //console.log(formValues);
      
      this.props.login(formValues);      
        
  };

  componentDidMount() {
      
      if(localStorage.getItem("token"))
        history.push('/');
  }
  componentDidUpdate() {
    if(localStorage.getItem("token"))
        history.push('/');
  }
  

  render() {
    return (
      <div>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            label="User Name"
            name="username"
            component={this.renderInput}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderPassword}
          />
           
          <button className="ui button" type="submit">
            Submit
          </button>
          {this.props.Auth.error}
        </form>
        <div className="ui message">
          <div className="header"><Link to="/register">Register a new user</Link></div>
          <p>
         
          </p>
        </div>
        
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a username";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

const mapStateToProps = state => {
    
    
    return {Auth: state.Auth}
}

const LoginForm =  reduxForm({
  form: "loginForm",
  validate: validate
})(Login);

export default connect(mapStateToProps, {login})(LoginForm);
