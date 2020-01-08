import React from "react";
import { connect } from "react-redux";

import { fetchJob, applyToJob, getUserJobs } from "../../actions";
import history from '../../History';

class JobDetails extends React.Component {
  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id);
    this.props.getUserJobs();

    
  }
  disableButton = () => {       
    if (this.props.userJobs && this.props.userJobs.includes(parseInt(this.props.match.params.id)) )   
      return true;    
    else return false;
  }
  onSubmit = () => {
    if(!localStorage.getItem("userid"))
      history.push('/Login');
    else this.props.applyToJob(this.props.match.params.id);
  }
  render() {
    // console.log(this.props.jobs);

    if (!this.props.job) return null;
    const { jobTitle, jobDescription, jobCode } = this.props.job;
    return (
      <div className="ui card" style={{width: '100%'}}>
        <div className="content">
          <div className="header">{jobTitle}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Description</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>{jobDescription}</a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>{jobCode}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <button ref={this.buttonRef} className="ui button" onClick={this.onSubmit} disabled={this.disableButton()}>Apply</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  return { job: state.jobs[ownProps.match.params.id], userJobs: state.userJobs  };
};

export default connect(mapStateToProps, { fetchJob, applyToJob, getUserJobs })(JobDetails);
