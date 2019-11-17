import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Students.css";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import actions from "../../redux/actions";
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from "react-data-grid-addons";
const selectors = Data.Selectors;

const { getStudents } = actions;

class LinkFormatter extends Component {
  constructor(props){
    super();
  }

  showStudentDetail = () => {
    let id = this.props.value;
    document.location.href  = '/students/'+id;
  }

  render() {
    const value = this.props.value;
    return (
      <div>
          <a onClick={this.showStudentDetail}>{value}</a>
      </div>
   );
  }

}
const ROW_COUNT = 50;
class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: true,
      filters:{}
    };
  }

  componentDidMount() {
     try {
          this.props.getStudents();
        } catch (e) {
          alert(e);
        }
      this.setState({"isLoading":false});
    }

   renderStudentsList =(students)=> {
     if(students!=='undefined' && students!==null){
      return [{}].concat(students).map((student, i) =>
        i !== 0 ? (
          <LinkContainer key={i} to={`/students/${student.studentId}`}>
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

  renderStudentsGrid=(students)=>{
    const defaultColumnProperties = {
      resizable: true,
      width: 140,
      filterable : true
    };
      const columns = [
                      { key: 'studentId', name: 'ID', formatter:LinkFormatter},
                      { key: 'firstName', name: 'First Name' },
                      { key: 'lastName', name: 'Last Name' },
                      { key: 'email', name: 'Email' },
                      { key: 'city', name: 'City' },
                      { key: 'state', name: 'State' },
                      { key: 'country', name: 'Country' },
                      { key: 'pincode', name: 'pincode' },
                    ].map(c => ({ ...c, ...defaultColumnProperties }));
    const filteredRows = this.getRows(students, this.state.filters);
    if(students!=='undefined' && students!==null){
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

  renderStudents =()=> {
    return (
      <div className="students">
        <hr/>
        <PageHeader>Student List</PageHeader>
        <ListGroup>
        <LinkContainer key="new" to="/students/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new Student
            </h4>
          </ListGroupItem>
        </LinkContainer>
          {!this.state.isLoading && this.renderStudentsGrid(this.props.students)}
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
export default connect(mapStateToProps,{ getStudents})(Students);
