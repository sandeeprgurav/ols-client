import React, { Component } from "react";
import {ListGroup, ListGroupItem } from "react-bootstrap";
import "./Trainers.css";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import actions from "../../redux/actions";
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from "react-data-grid-addons";
const selectors = Data.Selectors;

const { getTrainers } = actions;

class LinkFormatter extends Component {
  constructor(props){
    super();
  }

  showTrainerDetail = () => {
    let id = this.props.value;
    document.location.href  = '/trainers/'+id;
  }

  render() {
    const value = this.props.value;
    return (
      <div>
          <a onClick={this.showTrainerDetail}>{value}</a>
      </div>
   );
  }

}
const ROW_COUNT = 50;
class Trainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainers: [],
      isLoading: true,
      filters:{}
    };
  }

  componentDidMount() {
     try {
          this.props.getTrainers();
        } catch (e) {
          alert(e);
        }
      this.setState({"isLoading":false});
    }

   renderTrainersList =(trainers)=> {
     if(trainers!=='undefined' && trainers!==null){
      return [{}].concat(trainers).map((trainer, i) =>
        i !== 0 ? (
          <LinkContainer key={i} to={`/trainers/${trainer.trainerId}`}>
            <ListGroupItem>
              {"Created: " + new Date(trainer.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/trainers/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a Trainer
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

  renderTrainersGrid=(trainers)=>{
    const defaultColumnProperties = {
      resizable: true,
      width: 140,
      filterable : true
    };
      const columns = [
                      { key: 'id', name: 'ID', formatter:LinkFormatter},
                      { key: 'firstName', name: 'First Name' },
                      { key: 'lastName', name: 'Last Name' },
                      { key: 'city', name: 'City' },
                      { key: 'state', name: 'State' },
                      { key: 'country', name: 'Country' },
                      { key: 'contactNumber', name: 'Contact Number' },
                      { key: 'education', name: 'Education' },
                      { key: 'certification', name: 'Certification' },
                    ].map(c => ({ ...c, ...defaultColumnProperties }));
    const filteredRows = this.getRows(trainers, this.state.filters);
    if(trainers!=='undefined' && trainers!==null){
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

  renderTrainers =()=> {
    return (
      <div className="trainers">
        <hr/>
        <div className="header"><h1>Trainer List</h1></div>
        <ListGroup>
        <LinkContainer key="new" to="/trainers/new">
          <ListGroupItem>
            <h4 className="link">
              <b>{"\uFF0B"}</b> Create a new Trainer
            </h4>
          </ListGroupItem>
        </LinkContainer>
          {!this.state.isLoading && this.renderTrainersGrid(this.props.trainers)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Trainer">
        {this.renderTrainers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    trainers: stateObj.trainers,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ getTrainers})(Trainers);
