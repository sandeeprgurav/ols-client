import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import actions from "../redux/actions";

const { getNotes } = actions;

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  },[]);

function onLoad() {
   try {
         props.getNotes();
       } catch (e) {
         alert(e);
       }
     setIsLoading(false);
  }


function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteid} to={`/notes/${note.noteid}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
}

function renderLander() {
return (
  <div className="lander">
    <h1>Scratch</h1>
    <p>A simple note taking app</p>
    <div>
      <Link to="/login" className="btn btn-info btn-lg">
        Login
      </Link>
      <Link to="/signup" className="btn btn-success btn-lg">
        Signup
      </Link>
    </div>
  </div>
);
}

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(props.notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}

function mapStateToProps(state) {
  var stateObj = state.ols!==undefined && state.ols.toJS();
  return {
    notes: stateObj.notes,
    loading: stateObj.loading,
  };
}
export default connect(mapStateToProps,{ getNotes})(Home);
