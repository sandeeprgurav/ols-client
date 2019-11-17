import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./Trainer.css";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const { updateTrainer, deleteTrainer, getTrainer } = actions;

class Trainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainer: {},
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      country: "",
      contactNumber: "",
      education: "",
      certification: "",
      loading: true,
      deleting: false,
    };
  }

  componentDidMount() {
       let trainerId = this.props.match.params.id;
       let trainer = this.props.getTrainer(trainerId);
       this.setState({"loading":false});
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.trainer !== this.props.trainer) {
      let trainerObject= nextProps.trainer;
        if(trainerObject!==null && trainerObject!==undefined){
          this.setState({"firstName":trainerObject.firstName,
          "lastName":trainerObject.lastName,
          "city":trainerObject.city,
          "state":trainerObject.state,
          "country":trainerObject.country,
          "contactNumber":trainerObject.contactNumber,
          "education":trainerObject.education,
          "certification":trainerObject.certification});
      }
    }
    return true;
  }

  validateForm =()=> {
      return this.state.firstName.length > 0 && this.state.lastName.length >0;
  }

  formatFilename= (str)=> {
    return str.replace(/^\w+-/, "");
  }

  handleSubmit=(event)=> {
    debugger;
   event.preventDefault();
   this.setState({"loading":true});
   try {

     const trainerId = this.props.match.params.id;
     const trainer = {"id":trainerId,
                      "firstName":this.state.firstName,
                      "lastName":this.state.lastName,
                      "city":this.state.city,
                      "state":this.state.state,
                      "country":this.state.country,
                      "contactNumber":this.state.contactNumber,
                      "education":this.state.education,
                      "certification":this.state.certification};
     this.props.updateTrainer(trainer);
     this.props.history.push("/trainers");
   } catch (e) {
     alert(e);
     this.setState({"loading":false});
   }
 }

  handleDelete =(event)=> {
      event.preventDefault();
      const confirmed = window.confirm(
        "Are you sure you want to delete this trainer?"
      );
      if (!confirmed) {
        return;
      }
      this.props.deleteTrainer({body:this.state.trainer.id});
      this.setState({"deleting":true});
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

render(){
  return (
    <div className="Notes">
      {!this.state.loading && this.props.trainer!==null  && (
        <form onSubmit={this.handleSubmit}>
            <FormGroup bsSize="small" controlId="firstName">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.firstName}
                type="text"
                onChange={e => this.setState({"firstName":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="lastName">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.lastName}
                type="text"
                onChange={e => this.setState({"lastName":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="city">
              <ControlLabel>City</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.city}
                type="text"
                onChange={e => this.setState({"city":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="state">
              <ControlLabel>State</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.state}
                type="text"
                onChange={e => this.setState({"state":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="country">
              <ControlLabel>Country</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.country}
                type="text"
                onChange={e => this.setState({"country":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="contactNumber">
              <ControlLabel>Contact Number</ControlLabel>
              <FormControl
                defaultValue={this.props.trainer.contactNumber}
                type="text"
                onChange={e => this.setState({"contactNumber":e.target.value})}
              />
           </FormGroup>
           <FormGroup bsSize="small" controlId="education">
             <ControlLabel>Education</ControlLabel>
             <FormControl
               defaultValue={this.props.trainer.education}
               type="text"
               onChange={e => this.setState({"education":e.target.value})}
             />
          </FormGroup>
          <FormGroup bsSize="small" controlId="certification">
            <ControlLabel>Certification</ControlLabel>
            <FormControl
              defaultValue={this.props.trainer.certification}
              type="text"
              onChange={e => this.setState({"certification":e.target.value})}
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
    trainer: stateObj.trainer,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ updateTrainer, deleteTrainer, getTrainer})(Trainer);
