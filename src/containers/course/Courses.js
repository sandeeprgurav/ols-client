import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Courses.css";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import actions from "../../redux/actions";
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from "react-data-grid-addons";
const selectors = Data.Selectors;

const { getCourses } = actions;

class LinkFormatter extends Component {
  constructor(props){
    super();
  }

  showCourseDetail = () => {
    let id = this.props.value;
    document.location.href  = '/courses/'+id;
  }

  render() {
    const value = this.props.value;
    return (
      <div>
          <a onClick={this.showCourseDetail}>{value}</a>
      </div>
   );
  }

}
const ROW_COUNT = 50;
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isLoading: true,
      filters:{}
    };
  }

  componentDidMount() {
     try {
          this.props.getCourses();
        } catch (e) {
          alert(e);
        }
      this.setState({"isLoading":false});
    }

   renderCoursesList =(courses)=> {
     if(courses!=='undefined' && courses!==null){
      return [{}].concat(courses).map((course, i) =>
        i !== 0 ? (
          <LinkContainer key={i} to={`/courses/${course.courseId}`}>
            <ListGroupItem>
              {"Created: " + new Date(course.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/courses/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a Course
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
      );
    }
  }

  handleFilterChange = (filter) => {
   let newFilters = Object.assign({}, this.state.filters);
   if (filter.filterTerm) {
     newFilters[filter.column.key] = filter;
   } else {
     delete newFilters[filter.column.key];
   }
   this.setState({ filters: newFilters });
 };


 onClearFilters = () => {
   this.setState({ filters: {} });
 };

  getRows=(rows, filters)=> {
    return selectors.getRows({ rows, filters });
  }

  renderCoursesGrid=(courses)=>{
    const defaultColumnProperties = {
      resizable: true,
      width: 140,
      filterable : true
    };
      const columns = [
                      { key: 'id', name: 'ID', formatter:LinkFormatter},
                      { key: 'name', name: 'Name' },
                      { key: 'description', name: 'Description' },
                      { key: 'category', name: 'Category' },
                    ].map(c => ({ ...c, ...defaultColumnProperties }));
    const filteredRows = this.getRows(courses, this.state.filters);
    if(courses!=='undefined' && courses!==null){
      return (
        <ReactDataGrid
           columns={columns}
           rowGetter={i => filteredRows[i]}
           rowsCount={filteredRows.length}
           minHeight={500}
           toolbar={<Toolbar enableFilter={true} />}
           onAddFilter={this.handleFilterChange}
           onClearFilters={this.onClearFilters}
           />
      );
    }
  }

  renderCourses =()=> {
    return (
      <div className="courses">
        <hr/>
        <PageHeader>Course List</PageHeader>
        <ListGroup>
        <LinkContainer key="new" to="/courses/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new Course
            </h4>
          </ListGroupItem>
        </LinkContainer>
          {!this.state.isLoading && this.renderCoursesGrid(this.props.courses)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Course">
        {this.renderCourses()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    courses: stateObj.courses,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ getCourses})(Courses);
