import React from "react";
import { Route,Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";
import ChangeEmail from "./containers/ChangeEmail";
import ChangePassword from "./containers/ChangePassword";
import Loadable from "react-loadable";

const MyLoadingComponent = ({isLoading, error}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (error) {
    return <div> Sorry, there was a problem loading the page.</div>;
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
const AsyncStudents = Loadable({
  loader: () => import("./containers/student/Students"),
  loading: MyLoadingComponent
});
const AsyncNewStudent =Loadable({
 loader: () => import("./containers/student/NewStudent"),
 loading: MyLoadingComponent
});
const AsyncStudent = Loadable({
  loader: () => import("./containers/student/Student"),
  loading: MyLoadingComponent
});
const AsyncTrainers = Loadable({
  loader: () => import("./containers/trainer/Trainers"),
  loading: MyLoadingComponent
});
const AsyncNewTrainer =Loadable({
 loader: () => import("./containers/trainer/NewTrainer"),
 loading: MyLoadingComponent
});
const AsyncTrainer = Loadable({
  loader: () => import("./containers/trainer/Trainer"),
  loading: MyLoadingComponent
});
const AsyncCourses = Loadable({
  loader: () => import("./containers/course/Courses"),
  loading: MyLoadingComponent
});
const AsyncNewCourse =Loadable({
 loader: () => import("./containers/course/NewCourse"),
 loading: MyLoadingComponent
});
const AsyncCourse = Loadable({
  loader: () => import("./containers/course/Course"),
  loading: MyLoadingComponent
});
const AsyncSettings = Loadable({
  loader: () => import("./containers/Settings"),
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
    <AuthenticatedRoute
      path="/students"
      exact
      component={AsyncStudents}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/students/new"
      exact
      component={AsyncNewStudent}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/students/:id"
      exact
      component={AsyncStudent}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/trainers"
      exact
      component={AsyncTrainers}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/trainers/new"
      exact
      component={AsyncNewTrainer}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/trainers/:id"
      exact
      component={AsyncTrainer}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/courses"
      exact
      component={AsyncCourses}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/courses/new"
      exact
      component={AsyncNewCourse}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/courses/:id"
      exact
      component={AsyncCourse}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path="/settings"
      exact
      component={AsyncSettings}
      appProps={appProps}
    />

    {/* Finally, catch all unmatched routes*/}
      <Route component={AsyncNotFound} />

  </Switch>
;
