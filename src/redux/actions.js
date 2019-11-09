const actions = {
	GET_STUDENTS : 'GET_STUDENTS',
	GET_STUDENTS_SUCCESS: 'GET_STUDENTS_SUCCESS',

	getStudents: () => ({
    type: actions.GET_STUDENTS
  }),
  getStudentsSuccess: (students) => ({
    type: actions.GET_STUDENTS_SUCCESS,
    students
  })
}

export default actions;
