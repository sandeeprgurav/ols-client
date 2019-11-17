import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import { callAPI } from './apiutils'
import { API } from "aws-amplify";

const API_LIST = {
	GET_NOTES : 'notes',
	GET_NOTES_URL: "/notes",
	STUDENTS_API : 'students',
	STUDENTS_URL: "/students",
	GET_TRAINERS : 'trainer/list',
	POST_TRAINER : 'trainer/save',
	PUT_TRAINER : 'trainer/update',
	DELETE_TRAINER : 'trainer/delete?trainerId=',
	GET_TRAINER : 'trainer/get?trainerId=',
	GET_COURSES : 'course/list',
	POST_COURSE : 'trainer/save',
	PUT_COURSE : 'course/update',
	DELETE_COURSE : 'course/delete?courseId=',
	GET_COURSE : 'course/get?courseId=',
}


function* getNotes(data) {
  try {
		let notes = yield call([API, API.get], API_LIST.GET_NOTES, API_LIST.GET_NOTES_URL);
    yield put(
      actions.getNotesSuccess(notes)
    );
  } catch (error) {
    yield put(actions.getNotesSuccess([]));
  }
}

function* getStudents(data) {
  try {
		let APIinit ={};
		let students = yield call([API, API.get], API_LIST.STUDENTS_API, API_LIST.STUDENTS_URL, APIinit);
    yield put(
      actions.getStudentsSuccess(students)
    );
  } catch (error) {
    yield put(actions.getStudentsSuccess([]));
  }
}

function* postStudent(data) {
  try {
		let student = data.student;
		yield call([API, API.post], API_LIST.STUDENTS_API, API_LIST.STUDENTS_URL,student);
    yield put(
      actions.postStudentSuccess(student)
    );
  } catch (error) {
    yield put(actions.postStudentSuccess({}));
  }
}

function* updateStudent(data) {
  try {
		let student = data.student;
		let studentId = data.student.studentId;
		yield call([API, API.put], API_LIST.STUDENTS_API, API_LIST.STUDENTS_URL+"/"+studentId,student);
    yield put(
      actions.updateStudentSuccess(student)
    );
  } catch (error) {
    yield put(actions.updateStudentSuccess({}));
  }
}

function* deleteStudent(data) {
  try {
		let studentId = data.studentId;
		yield call([API, API.delete], API_LIST.STUDENTS_API, API_LIST.STUDENTS_URL+"/"+studentId);
    yield put(
      actions.deleteStudentSuccess(studentId)
    );
  } catch (error) {
    yield put(actions.deleteStudentSuccess(""));
  }
}

function* getStudent(data) {
  try {
		let studentId = data.studentId;
		let student = yield call([API, API.get], API_LIST.STUDENTS_API, API_LIST.STUDENTS_URL+"/"+studentId);
    yield put(
      actions.postStudentSuccess(student)
    );
  } catch (error) {
    yield put(actions.postStudentSuccess({}));
  }
}

function* getTrainers(data) {
  try {
		debugger;
		let APIinit ={};
		let trainers = yield call(callAPI.bind(this, API_LIST.GET_TRAINERS, 'GET'));
    yield put(
      actions.getTrainersSuccess(trainers)
    );
  } catch (error) {
    yield put(actions.getTrainersSuccess([]));
  }
}

function* postTrainer(data) {
  try {
		let trainer = data.trainer;
    yield call(callAPI.bind(this, API_LIST.POST_TRAINER, 'POST', trainer));
    yield put(
      actions.postTrainerSuccess(trainer)
    );
  } catch (error) {
    yield put(actions.postTrainerSuccess({}));
  }
}

function* updateTrainer(data) {
	debugger;
  try {
		let trainer = data.trainer;
		yield call(callAPI.bind(this, API_LIST.PUT_TRAINER, 'PUT', trainer));
    yield put(
      actions.updateTrainerSuccess(trainer)
    );
  } catch (error) {
    yield put(actions.updateTrainerSuccess({}));
  }
}

function* deleteTrainer(data) {
  try {
		let trainerId = data.trainerId;
		yield call(callAPI.bind(this, API_LIST.POST_TRAINER+trainerId, 'DELETE'));
    yield put(
      actions.deleteTrainerSuccess(trainerId)
    );
  } catch (error) {
    yield put(actions.deleteTrainerSuccess(""));
  }
}

function* getTrainer(data) {
  try {
		debugger;
		let trainerId = data.trainerId;
		let trainer = yield call(callAPI.bind(this, API_LIST.GET_TRAINER+trainerId, 'GET'));;
    yield put(
      actions.postTrainerSuccess(trainer)
    );
  } catch (error) {
    yield put(actions.postTrainerSuccess({}));
  }
}

function* getCourses(data) {
  try {
		let APIinit ={};
		let courses = yield call(callAPI.bind(this, API_LIST.GET_COURSES, 'GET'));
    yield put(
      actions.getCoursesSuccess(courses)
    );
  } catch (error) {
    yield put(actions.getCoursesSuccess([]));
  }
}

function* postCourse(data) {
  try {
		let course = data.course;
    yield call(callAPI.bind(this, API_LIST.POST_COURSE, 'POST', course));
    yield put(
      actions.postCourseSuccess(course)
    );
  } catch (error) {
    yield put(actions.postCourseSuccess({}));
  }
}

function* updateCourse(data) {
  try {
		let course = data.course;
		yield call(callAPI.bind(this, API_LIST.PUT_COURSE, 'PUT', course));
    yield put(
      actions.updateCourseSuccess(course)
    );
  } catch (error) {
    yield put(actions.updateCourseSuccess({}));
  }
}

function* deleteCourse(data) {
  try {
		let courseId = data.courseId;
		yield call(callAPI.bind(this, API_LIST.POST_COURSE+courseId, 'DELETE'));
    yield put(
      actions.deleteCourseSuccess(courseId)
    );
  } catch (error) {
    yield put(actions.deleteCourseSuccess(""));
  }
}

function* getCourse(data) {
  try {
		let courseId = data.courseId;
		let course = yield call(callAPI.bind(this, API_LIST.GET_COURSE+courseId, 'GET'));;
    yield put(
      actions.postCourseSuccess(course)
    );
  } catch (error) {
    yield put(actions.postCourseSuccess({}));
  }
}

// Root Saga
export default function* rootSaga() {
  yield all([
		takeEvery(actions.GET_NOTES, getNotes),
    takeEvery(actions.GET_STUDENTS, getStudents),
		takeEvery(actions.POST_STUDENT, postStudent),
		takeEvery(actions.PUT_STUDENT, updateStudent),
		takeEvery(actions.DELETE_STUDENT, deleteStudent),
		takeEvery(actions.GET_STUDENT, getStudent),
		takeEvery(actions.GET_TRAINERS, getTrainers),
		takeEvery(actions.POST_TRAINER, postTrainer),
		takeEvery(actions.PUT_TRAINER, updateTrainer),
		takeEvery(actions.DELETE_TRAINER, deleteTrainer),
		takeEvery(actions.GET_TRAINER, getTrainer),
		takeEvery(actions.GET_COURSES, getCourses),
		takeEvery(actions.POST_COURSE, postCourse),
		takeEvery(actions.PUT_COURSE, updateCourse),
		takeEvery(actions.DELETE_COURSE, deleteCourse),
		takeEvery(actions.GET_COURSE, getCourse),
  ])
}
