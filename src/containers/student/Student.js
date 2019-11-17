import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./Student.css";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const { updateStudent, deleteStudent, getStudent } = actions;

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      loading: true,
      deleting: false,
    };
  }

  componentDidMount() {
       let studentId = this.props.match.params.id;
       let student = this.props.getStudent(studentId);
       this.setState({"loading":false});
  }


  validateForm =()=> {
      return this.state.firstName.length > 0 && this.state.lastName.length >0;
  }

  formatFilename= (str)=> {
    return str.replace(/^\w+-/, "");
  }

  handleSubmit=(event)=> {
   event.preventDefault();
   this.setState({"loading":true});
   try {
     const studentId= this.student!==undefined && this.student.studentId;
     const student = {"studentId":studentId,
                      "firstName":this.state.firstName,
                      "lastName":this.state.lastName,
                      "email":this.state.email,
                      "city":this.state.city,
                      "state":this.state.state,
                      "country":this.state.country,
                      "pincode":this.state.pincode
                     };
     this.props.updateStudent({body:student});
     this.props.history.push("/students");
   } catch (e) {
     alert(e);
     this.setState({"loading":false});
   }
 }

  handleDelete =(event)=> {
      event.preventDefault();
      const confirmed = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (!confirmed) {
        return;
      }
      this.props.deleteStudent({body:this.state.student.studentId});
      this.setState({"deleting":true});
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

render(){
  return (
    <div className="Notes">
      {!this.state.loading && this.props.student!==null  && (
        <form onSubmit={this.handleSubmit}>
            <FormGroup bsSize="small" controlId="firstName">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                defaultValue={this.props.student.firstName}
                type="text"
                onChange={e => this.setState({"firstName":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="lastName">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                defaultValue={this.props.student.lastName}
                type="text"
                onChange={e => this.setState({"lastName":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                defaultValue={this.props.student.email}
                type="text"
                onChange={e => this.setState({"email":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="city">
              <ControlLabel>City</ControlLabel>
              <FormControl
                defaultValue={this.props.student.city}
                type="text"
                onChange={e => this.setState({"city":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="state">
              <ControlLabel>State</ControlLabel>
              <FormControl
                defaultValue={this.props.student.state}
                type="text"
                onChange={e => this.setState({"state":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="country">
              <ControlLabel>Country</ControlLabel>
              <FormControl
                defaultValue={this.props.student.country}
                type="text"
                onChange={e => this.setState({"country":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="pincode">
              <ControlLabel>Pincode</ControlLabel>
              <FormControl
                defaultValue={this.props.student.pincode}
                type="text"
                onChange={e => this.setState({"pincode":e.target.value})}
              />
           </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={this.state.loading}
            disabled={!this.validateForm}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={this.handleDelete}
            isLoading={this.state.deleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
}

function mapStateToProps(state) {
  debugger;
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    student: stateObj.student,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ updateStudent, deleteStudent, getStudent})(Student);
