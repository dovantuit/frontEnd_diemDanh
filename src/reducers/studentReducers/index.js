import { handleActions } from 'redux-actions'
import { studentActions as actions } from '../../actions'
import { PURGE } from 'redux-persist'

export const name = 'Student'

const initialState = {
    dataStudent: [], // data fetch từ api
};

export default handleActions(
    {
        [actions.fetchStudentSuccess]: (state, action) => {
            // console.log('# check payload của action');
            console.log('action.fetchStudentSuccess: ', action.payload)
            const { dataStudent } = action.payload    // data trả về từ api lưu vào [dataMovie]
            //console.log('fetchMovieSuccess: ', dataMovie) // check log 
            return {
                // ...state, 
                dataStudent: [...dataStudent] // setState
            };
        },
        [actions.fetchStudentError]: (state, action) => {
            return {
                ...state
            };
        },
        [PURGE]: (state, action) => {
            return initialState;
        }
    },
    initialState
)