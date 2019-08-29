import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
const rootReducer = combineReducers({
    // ...nhung reducer khac
    form: formReducer
})

const store = createStore(rootReducer)
export default store;