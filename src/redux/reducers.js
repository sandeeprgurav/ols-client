import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
	searchCriteria:{},
	notes:[],
	students:[],
	student:null,
	studentId:"",
	trainers:[],
	trainer:null,
	trainerId:"",
	courses:[],
	course:null,
	courseId:""
})

export default function ols(state = initState, action) {
	switch(action.type) {
		case actions.GET_NOTES:
			return state
				.set('loading',true);
		case actions.GET_NOTES_SUCCESS:
			return state
				.set('loading',false)
				.set('notes',action.notes);
		case actions.GET_STUDENTS:
			return state
				.set('loading',true);
		case actions.GET_STUDENTS_SUCCESS:
			return state
				.set('loading',false)
				.set('students',action.students);
		case actions.POST_STUDENT:
			return state
				.set('loading',true)
				.set('student',action.student);
		case actions.POST_STUDENT_SUCCESS:
			return state
				.set('loading',false)
				.set('student',action.student);
		case actions.PUT_STUDENT:
			return state
				.set('loading',true)
				.set('student',action.student);
		case actions.PUT_STUDENT_SUCCESS:
			return state
				.set('loading',false)
				.set('student',action.student);
		case actions.DELETE_STUDENT:
			return state
				.set('loading',true)
				.set('studentId',action.studentId);
		case actions.DELETE_STUDENT_SUCCESS:
			return state
				.set('loading',false)
				.set('studentId',action.studentId);
		case actions.GET_STUDENT:
			return state
				.set('loading',true)
				.set('studentId',action.studentId);
		case actions.GET_STUDENT_SUCCESS:
			return state
				.set('loading',false)
				.set('student',action.student);
		case actions.GET_TRAINERS:
		  return state
		    .set('loading',true);
		case actions.GET_TRAINERS_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('trainers',action.trainers);
		case actions.POST_TRAINER:
		  return state
		    .set('loading',true)
		    .set('trainer',action.trainer);
		case actions.POST_TRAINER_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('trainer',action.trainer);
		case actions.PUT_TRAINER:
		  return state
		    .set('loading',true)
		    .set('trainer',action.trainer);
		case actions.PUT_TRAINER_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('trainer',action.trainer);
		case actions.DELETE_TRAINER:
		  return state
		    .set('loading',true)
		    .set('trainerId',action.trainerId);
		case actions.DELETE_TRAINER_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('trainerId',action.trainerId);
		case actions.GET_TRAINER:
		  return state
		    .set('loading',true)
		    .set('trainerId',action.trainerId);
		case actions.GET_TRAINER_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('trainer',action.trainer);
		case actions.GET_COURSES:
		  return state
		    .set('loading',true);
		case actions.GET_COURSES_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('courses',action.courses);
		case actions.POST_COURSE:
		  return state
		    .set('loading',true)
		    .set('course',action.course);
		case actions.POST_COURSE_SUCCESS:
		  return state
		    .set('loading',false)
		    .set('course',action.course);
	  case actions.PUT_COURSE:
	    return state
	      .set('loading',true)
	      .set('course',action.course);
	  case actions.PUT_COURSE_SUCCESS:
	    return state
	      .set('loading',false)
	      .set('course',action.course);
	  case actions.DELETE_COURSE:
	    return state
	      .set('loading',true)
	      .set('courseId',action.courseId);
	  case actions.DELETE_COURSE_SUCCESS:
	    return state
	      .set('loading',false)
	      .set('courseId',action.courseId);
	  case actions.GET_COURSE:
	    return state
	      .set('loading',true)
	      .set('courseId',action.courseId);
	  case actions.GET_COURSE_SUCCESS:
	    return state
	      .set('loading',false)
	      .set('course',action.course);
		default:
      return state;
	}
}
