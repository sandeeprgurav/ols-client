import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Student.css";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import actions from "../redux/actions";

const { getStudents } = actions;

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: true,
    };
  }

  componentDidMount() {
     try {
          let students = this.props.getStudents();
        } catch (e) {
          alert(e);
        }
      this.setState({"isLoading":false});
    }

   renderStudentsList =(students)=> {
     debugger;
     if(students!=='undefined' && students!==null){
      return [{}].concat(students).map((student, i) =>
        i !== 0 ? (
          <LinkContainer key={i} to={`/notes/${student.noteid}`}>
            <ListGroupItem>
              {"Created: " + new Date(student.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/students/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a Student
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
      );
    }
  }

  renderStudents =()=> {
    return (
      <div className="students">
        <PageHeader>Student List</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderStudentsList(this.props.students)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Student">
        {this.renderStudents()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    students: stateObj.students,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ getStudents})(Student);
