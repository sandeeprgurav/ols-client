import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";
import ChangeEmail from "./containers/ChangeEmail";
import ChangePassword from "./containers/ChangePassword";
import Loadable from "react-loadable";

const MyLoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

const AsyncHome = Loadable({
  loader: () => import("./containers/Home"),
  loading: MyLoadingComponent
});
const AsyncLogin = Loadable({
 loader: () => import("./containers/Login"),
 loading: MyLoadingComponent
});
const AsyncNotes = Loadable({
 loader: () => import("./containers/Notes"),
 loading: MyLoadingComponent
});
const AsyncSignup = Loadable({
 loader: () => import("./containers/Signup"),
 loading: MyLoadingComponent
});
const AsyncNewNote =Loadable({
 loader: () => import("./containers/NewNote"),
 loading: MyLoadingComponent
});
const AsyncNotFound =Loadable({
 loader: () => import("./containers/NotFound"),
 loading: MyLoadingComponent
});
const AsyncChangeUserInfo =Loadable({
 loader: () => import("./containers/ChangeUserInfo"),
 loading: MyLoadingComponent
});

export default ({ appProps }) =>
  <Switch>
    <AppliedRoute
      path="/"
      exact
      component={AsyncHome}
      appProps={appProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLogin}
      appProps={appProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignup}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/notes/new"
      exact
      component={AsyncNewNote}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/notes/:id"
      exact
      component={AsyncNotes}
      appProps={appProps}
    />
    <UnauthenticatedRoute
      path="/login/reset"
      exact
      component={ResetPassword}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/changeUserInfo"
      exact
      component={AsyncChangeUserInfo}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/changeUserInfo/email"
      exact
      component={ChangeEmail}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/changeUserInfo/password"
      exact
      component={ChangePassword}
      appProps={appProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>
;
