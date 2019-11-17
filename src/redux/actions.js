const actions = {
	GET_NOTES : 'GET_NOTES',
	GET_NOTES_SUCCESS: 'GET_NOTES_SUCCESS',
	GET_STUDENTS : 'GET_STUDENTS',
	GET_STUDENTS_SUCCESS: 'GET_STUDENTS_SUCCESS',
	POST_STUDENT : 'POST_STUDENT',
	POST_STUDENT_SUCCESS: 'POST_STUDENT_SUCCESS',
	PUT_STUDENT : 'PUT_STUDENT',
	PUT_STUDENT_SUCCESS: 'PUT_STUDENT_SUCCESS',
	DELETE_STUDENT : 'DELETE_STUDENT',
	DELETE_STUDENT_SUCCESS: 'DELETE_STUDENT_SUCCESS',
	GET_STUDENT : 'GET_STUDENT',
	GET_STUDENT_SUCCESS: 'GET_STUDENT_SUCCESS',
	GET_TRAINERS : 'GET_TRAINERS',
	GET_TRAINERS_SUCCESS: 'GET_TRAINERS_SUCCESS',
	POST_TRAINER : 'POST_TRAINER',
	POST_TRAINER_SUCCESS: 'POST_TRAINER_SUCCESS',
	PUT_TRAINER : 'PUT_TRAINER',
	PUT_TRAINER_SUCCESS: 'PUT_TRAINER_SUCCESS',
	DELETE_TRAINER : 'DELETE_TRAINER',
	DELETE_TRAINER_SUCCESS: 'DELETE_TRAINER_SUCCESS',
	GET_TRAINER : 'GET_TRAINER',
	GET_TRAINER_SUCCESS: 'GET_TRAINER_SUCCESS',
	GET_COURSES : 'GET_COURSES',
	GET_COURSES_SUCCESS: 'GET_COURSES_SUCCESS',
	POST_COURSE : 'POST_COURSE',
	POST_COURSE_SUCCESS: 'POST_COURSE_SUCCESS',
	PUT_COURSE : 'PUT_COURSE',
	PUT_COURSE_SUCCESS: 'PUT_COURSE_SUCCESS',
	DELETE_COURSE : 'DELETE_COURSE',
	DELETE_COURSE_SUCCESS: 'DELETE_COURSE_SUCCESS',
	GET_COURSE : 'GET_COURSE',
	GET_COURSE_SUCCESS: 'GET_COURSE_SUCCESS',

	getNotes: () => ({
		type: actions.GET_NOTES
	}),
	getNotesSuccess: (notes) => ({
		type: actions.GET_NOTES_SUCCESS,
		notes
	}),
 	getStudents: () => ({
    type: actions.GET_STUDENTS
  }),
  getStudentsSuccess: (students) => ({
    type: actions.GET_STUDENTS_SUCCESS,
    students
  }),
	postStudent: (student) => ({
    type: actions.POST_STUDENT,
		student
  }),
  postStudentSuccess: (student) => ({
    type: actions.POST_STUDENT_SUCCESS,
    student
  }),
	updateStudent: (student) => ({
    type: actions.PUT_STUDENT,
		student
  }),
  updateStudentSuccess: (student) => ({
    type: actions.PUT_STUDENT_SUCCESS,
    student
  }),
	deleteStudent: (studentId) => ({
    type: actions.DELETE_STUDENT,
		studentId
  }),
  deleteStudentSuccess: (studentId) => ({
    type: actions.DELETE_STUDENT_SUCCESS,
    studentId
  }),
	getStudent: (studentId) => ({
    type: actions.GET_STUDENT,
		studentId
  }),
  getStudentSuccess: (student) => ({
    type: actions.GET_STUDENT_SUCCESS,
    student
  }),
	getTrainers: () => ({
	  type: actions.GET_TRAINERS
	}),
	getTrainersSuccess: (trainers) => ({
	  type: actions.GET_TRAINERS_SUCCESS,
	  trainers
	}),
	postTrainer: (trainer) => ({
	  type: actions.POST_TRAINER,
	  trainer
	}),
	postTrainerSuccess: (trainer) => ({
	  type: actions.POST_TRAINER_SUCCESS,
	  trainer
	}),
	updateTrainer: (trainer) => ({
	  type: actions.PUT_TRAINER,
	  trainer
	}),
	updateTrainerSuccess: (trainer) => ({
	  type: actions.PUT_TRAINER_SUCCESS,
	  trainer
	}),
	deleteTrainer: (trainerId) => ({
	  type: actions.DELETE_TRAINER,
	  trainerId
	}),
	deleteTrainerSuccess: (trainerId) => ({
	  type: actions.DELETE_TRAINER_SUCCESS,
	  trainerId
	}),
	getTrainer: (trainerId) => ({
	  type: actions.GET_TRAINER,
	  trainerId
	}),
	getTrainerSuccess: (trainer) => ({
	  type: actions.GET_TRAINER_SUCCESS,
	  trainer
	}),
	getCourses: () => ({
	  type: actions.GET_COURSES
	}),
	getCoursesSuccess: (courses) => ({
	  type: actions.GET_COURSES_SUCCESS,
	  courses
	}),
	postCourse: (course) => ({
	  type: actions.POST_COURSE,
	  course
	}),
	postCourseSuccess: (course) => ({
	  type: actions.POST_COURSE_SUCCESS,
	  course
	}),
	updateCourse: (course) => ({
	  type: actions.PUT_COURSE,
	  course
	}),
	updateCourseSuccess: (course) => ({
	  type: actions.PUT_COURSE_SUCCESS,
	  course
	}),
	deleteCourse: (courseId) => ({
	  type: actions.DELETE_COURSE,
	  courseId
	}),
	deleteCourseSuccess: (courseId) => ({
	  type: actions.DELETE_COURSE_SUCCESS,
	  courseId
	}),
	getCourse: (courseId) => ({
	  type: actions.GET_COURSE,
	  courseId
	}),
	getCourseSuccess: (course) => ({
	  type: actions.GET_COURSE_SUCCESS,
	  course
	}),	
}

export default actions;
