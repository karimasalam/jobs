import React from "react";
import { connect } from "react-redux";

import { fetchJobs } from "../../actions";
import { Link } from "react-router-dom";

class JobList extends React.Component {
  componentDidMount() {
    this.props.fetchJobs();
  }
  renderList = () => {
    return  this.props.jobs.map(job => {
      return (
        <div key={job.id} className="item">
          <i className="large middle aligned icon id badge outline" />
          <div className="content">
            <Link to={`/jobs/${job.id}`} className="header">
              {job.jobTitle}
            </Link>

            <div className="description"> {job.jobDescription}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    if (!this.props.jobs) return null;
    return (
      <div>
        <h2>jobs</h2>
        <div className="ui celled list">{this.renderList()}</div>        
      </div>
    );
  }
}

const mapStateToProps = state => {
 
  return { jobs: Object.values(state.jobs) };
};

export default connect(mapStateToProps, { fetchJobs })(JobList);
