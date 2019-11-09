import { all, takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { callAPI,callServerlessAPI } from './apiutils'
import { API } from "aws-amplify";

const API_LIST = {
	GET_STUDENTS : 'notes',
	GET_STUDENTS_URL: "/notes"
}


function* getStudents(data) {
  try {
		let APIinit ={};
		let students = yield call([API, API.get], API_LIST.GET_STUDENTS, API_LIST.GET_STUDENTS_URL, APIinit);
    yield put(
      actions.getStudentsSuccess(students)
    );
  } catch (error) {
    yield put(actions.getStudentsSuccess([]));
  }
}


// Root Saga
export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_STUDENTS, getStudents),
  ])
}
