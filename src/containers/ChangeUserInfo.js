import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ChangeUserInfo.css";

export default class ChangeUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Settings">
        <LinkContainer to="/changeUserInfo/email">
          <LoaderButton
            block
            bsSize="large"
          >Change Email</LoaderButton>
        </LinkContainer>
        <LinkContainer to="/changeUserInfo/password">
          <LoaderButton
            block
            bsSize="large"
            text="Change Password"
          >Change Password</LoaderButton>
        </LinkContainer>
      </div>
    );
  }
}
