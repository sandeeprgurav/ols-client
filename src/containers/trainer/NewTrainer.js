import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import "./NewTrainer.css";
import actions from "../../redux/actions";

const { postTrainer } = actions;

function NewTrainer(props) {
  const file = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [education, setEducation] = useState("");
  const [certification, setCertification] = useState("");
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
       let trainer = { firstName, lastName, city,state,country,contactNumber, education, certification};
       props.postTrainer({body:trainer});
       props.history.push("/trainer");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
 }

return (
    <div className="NewTrainer">
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
        <FormGroup bsSize="small" controlId="contactNumber">
          <ControlLabel>Contact Number</ControlLabel>
          <FormControl
            type="contactNumber"
            onChange={e => setContactNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="small" controlId="education">
          <ControlLabel>Education</ControlLabel>
          <FormControl
            type="education"
            onChange={e => setEducation(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="small" controlId="certification">
          <ControlLabel>Certification</ControlLabel>
          <FormControl
            type="certification"
            onChange={e => setCertification(e.target.value)}
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
    trainer: stateObj.trainer,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ postTrainer})(NewTrainer);
