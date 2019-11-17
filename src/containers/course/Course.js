import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./Course.css";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const { updateCourse, deleteCourse, getCourse } = actions;

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      name: "",
      description: "",
      category: "",
      loading: true,
      deleting: false,
    };
  }

  componentDidMount() {
       let courseId = this.props.match.params.id;
       let course = this.props.getCourse(courseId);
       this.setState({"loading":false});
  }


  validateForm =()=> {
      return this.state.name.length > 0 && this.state.category.length >0;
  }

  handleSubmit=(event)=> {
   event.preventDefault();
   this.setState({"loading":true});
   try {
     const courseId= this.course!==undefined && this.course.id;
     const course = {"id":courseId,
                      "name":this.state.name,
                      "description":this.state.description,
                      "category":this.state.category
                      };
     this.props.updateCourse(course);
     this.props.history.push("/courses");
   } catch (e) {
     alert(e);
     this.setState({"loading":false});
   }
 }

  handleDelete =(event)=> {
      event.preventDefault();
      const confirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (!confirmed) {
        return;
      }
      this.props.deleteCourse({body:this.state.course.id});
      this.setState({"deleting":true});
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

render(){
  return (
    <div className="Notes">
      {!this.state.loading && this.props.course!==null  && (
        <form onSubmit={this.handleSubmit}>
            <FormGroup bsSize="small" controlId="name">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                defaultValue={this.props.course.name}
                type="text"
                onChange={e => this.setState({"name":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                defaultValue={this.props.course.description}
                type="text"
                onChange={e => this.setState({"description":e.target.value})}
              />
            </FormGroup>
            <FormGroup bsSize="small" controlId="category">
              <ControlLabel>Category</ControlLabel>
              <FormControl
                defaultValue={this.props.course.category}
                type="text"
                onChange={e => this.setState({"category":e.target.value})}
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
    course: stateObj.course,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ updateCourse, deleteCourse, getCourse})(Course);
