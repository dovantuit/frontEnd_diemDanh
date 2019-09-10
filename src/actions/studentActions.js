import { createAction } from 'redux-actions'
// hàm tạo Action từ thư viện redux-actions

export const FETCH_STUDENT = 'FETCH_STUDENT'
const FETCH_STUDENT_REQUEST = 'FETCH_STUDENT_REQUEST'
const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS'
const FETCH_STUDENT_ERROR = 'FETCH_STUDENT_ERROR'

export const fetchStudentRequest = createAction(FETCH_STUDENT_REQUEST)
export const fetchStudentSuccess = createAction(FETCH_STUDENT_SUCCESS)
export const fetchStudentError = createAction(FETCH_STUDENT_ERROR)
