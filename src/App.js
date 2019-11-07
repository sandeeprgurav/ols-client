import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import config from "./config";
import Routes from "./Routes";
import { Auth } from "aws-amplify";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
  }

  setIsAuthenticating(false);
  loadFb();
}

async function handleLogout() {
  await Auth.signOut();
  userHasAuthenticated(false);
  props.history.push("/login");
}

async function  loadFb() {
  loadFacebookSDK();

  try {
    await Auth.currentAuthenticatedUser();
    userHasAuthenticated(true);
  } catch (e) {
    if (e !== "not authenticated") {
      alert(e);
    }
  }
  setIsAuthenticating(false);
}

function loadFacebookSDK() {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId            : config.social.FB,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

return (
!isAuthenticating && (
  <div className="App container">
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {isAuthenticated ? (
            <>
              <LinkContainer to="/settings">
                <NavItem>Settings</NavItem>
              </LinkContainer>
              <LinkContainer to="/changeUserInfo">
                <NavItem>Change User Info</NavItem>
              </LinkContainer>
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </>
          ) : (
            <>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
  </div>
)
);
}

export default withRouter(App);
