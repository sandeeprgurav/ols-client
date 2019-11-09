import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
	searchCriteria:{},
	students:[]
})

export default function ols(state = initState, action) {
	switch(action.type) {
		case actions.GET_STUDENTS:
		return state
			.set('loading',true);
		case actions.GET_STUDENTS_SUCCESS:
		return state
			.set('loading',false)
			.set('students',action.students);
		default:
      	return state;
	}
}
