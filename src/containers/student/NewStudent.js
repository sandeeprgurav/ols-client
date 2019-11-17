import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import "./NewStudent.css";
import actions from "../../redux/actions";

const { postStudent } = actions;

function NewStudent(props) {
  const file = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (firstName.length > 0 && lastName.length > 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    /*if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }*/
    setIsLoading(true);
    try {
       let student = { firstName, lastName, email, city,state,country,pincode};
       props.postStudent({body:student});
       props.history.push("/student");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
 }

return (
    <div className="NewStudent">
      <form onSubmit={handleSubmit}>
        <FormGroup bsSize="small" controlId="firstName">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="firstName"
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="small" controlId="lastName">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="lastName"
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <hr/>
        <FormGroup bsSize="small" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="small" controlId="city">
          <ControlLabel>City</ControlLabel>
          <FormControl
            type="city"
            onChange={e => setCity(e.target.value)}
          />
        </FormGroup>
        <hr/>
        <FormGroup bsSize="small" controlId="state">
          <ControlLabel>State</ControlLabel>
          <FormControl
            type="state"
            onChange={e => setState(e.target.value)}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="small" controlId="country">
          <ControlLabel>Country</ControlLabel>
          <FormControl
            type="country"
            onChange={e => setCountry(e.target.value)}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="small" controlId="pincode">
          <ControlLabel>Pincode</ControlLabel>
          <FormControl
            type="pincode"
            onChange={e => setPincode(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    student: stateObj.student,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ postStudent})(NewStudent);
