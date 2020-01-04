import {Router, Route, Switch } from "react-router-dom";

import React from "react";
import Header from "./Header";
import history from '../History';
import JobList from "./jobs/JobList";
import JobDetails from "./jobs/JobDetails";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


class App extends React.Component {
  render() {
    return (
      <div className="ui container">
          <Router history={history}>
              <div>
                <Header />               
                <Switch>
                    <Route path='/' exact component={JobList} />
                    <Route path='/Login' exact component={Login} />
                    <Route path='/Register' exact component={Register} />
                    <Route path='/jobs/:id' exact component={JobDetails} />
                </Switch>
              </div>
          </Router>
        
      </div>
    );
  }
}

export default App;
