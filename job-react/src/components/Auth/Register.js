import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { register } from "../../actions/index";
import { connect } from "react-redux";
import history from "../../History";

class Register extends React.Component {
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

  componentDidMount() {
    if (localStorage.getItem("token")) history.push("/");
  }
  componentDidUpdate() {
    if (localStorage.getItem("token")) history.push("/");
  }

  onSubmit = formValues => {
    //console.log(formValues);

    this.props.register(formValues);
  };
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
          <Field label="Gender" name="gender" component={this.renderInput} />
          <Field
            label="Birth date"
            name="dateofbirth"
            component={this.renderInput}
          />
          <Field label="About" name="about" component={this.renderInput} />
          <Field label="City" name="city" component={this.renderInput} />
          <Field label="Country" name="country" component={this.renderInput} />

          <button className="ui button" type="submit">
            Submit
          </button>
          {this.props.Auth.error}
        </form>
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
  if (!formValues.dateofbirth) {
    errors.dateofbirth = "You must enter a dateofbirth";
  }
  if (!formValues.gender) {
    errors.gender = "You must enter a gender";
  }
  if (!formValues.about) {
    errors.about = "You must enter an about";
  }
  if (!formValues.city) {
    errors.city = "You must enter a city";
  }
  if (!formValues.country) {
    errors.country = "You must enter a country";
  }

  return errors;
};
const mapStateToProps = state => {
  return { Auth: state.Auth };
};

const RegisterForm = reduxForm({
  form: "registerForm",
  validate: validate
})(Register);

export default connect(mapStateToProps, { register })(RegisterForm);
