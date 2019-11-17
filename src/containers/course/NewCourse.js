import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import "./NewCourse.css";
import actions from "../../redux/actions";

const { postCourse } = actions;

function NewCourse(props) {
  const file = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (name.length > 0 && category.length > 0);
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
       let course = { name, description, category};
       props.postCourse({body:course});
       props.history.push("/course");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
 }

return (
    <div className="NewCourse">
      <form onSubmit={handleSubmit}>
        <FormGroup bsSize="small" controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="name"
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="small" controlId="description">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="description"
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <hr/>
        <hr />
        <FormGroup bsSize="small" controlId="category">
          <ControlLabel>Category</ControlLabel>
          <FormControl
            type="category"
            onChange={e => setCategory(e.target.value)}
          />
        </FormGroup>
        <hr/>
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
    course: stateObj.course,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ postCourse})(NewCourse);
