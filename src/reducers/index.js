// reducer là nơi chứa các hàm để thay đổi state
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as fromReducer } from 'redux-form'

//import reduders here 
import movieReducers, { name as nameOfMovieReducers } from './movieReducers'
import loadingReducers, { name as nameOfLoadingReducers } from './loadingReducers'; // import 
////

const rootPersisConfig = {
    key: 'root',
    storage: storage,
    debug: true,
    timeout: null,
    blacklist: [nameOfLoadingReducers]
};

const reducers = {
    [nameOfMovieReducers]: movieReducers,
    [nameOfLoadingReducers]: loadingReducers
}

////search here Object.assign(reducers,{form: fromReducer})
const rootReducer = combineReducers(
    Object.assign(reducers, {
        form: fromReducer
    })
);

export default persistReducer(rootPersisConfig, rootReducer);

export {
    nameOfMovieReducers,
    nameOfLoadingReducers
}