import { flatten } from 'lodash/array'
import { values } from 'lodash/object'
import { fork, all } from 'redux-saga/effects'

//// import các thư viện action cần dùng ở đây ( trong redux-saga)
//import sagas list here
import movieSagas from './movieSagas';
///

const sagaList = [
    ////
    //add sagas list here
    movieSagas,
    ///
];

export default function* () {
    yield all(
        flatten(sagaList.map(sagas => values(sagas))).map(saga => fork(saga))
    );
}