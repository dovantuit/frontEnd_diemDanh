import { call, put } from 'redux-saga/effects'
import takeFirst from '../takeFirst'
import * as movieApi from '../../api/movieApi'  //api lấy movies
import { movieActions as actions } from '../../actions'
import _ from 'lodash';

// hàm của saga function*
function* handleFetchMovieRequest(action) {
    try {
        const { next, callback } = action.payload   // bắt [next] từ view của LoginScreen
        const Response = yield call(movieApi.getMoviesCinema, next)
        console.log('response handleFetchMovieRequest', Response)
        const data = {
            'dataMovie': Response.data // lấy data từ api 
        }
        // console.log('##### lấy data xong')
        console.log(data)
        yield put(actions.fetchMovieSuccess(data));
        yield callback && callback();
    }
    catch (error) {
        yield put(actions.fetchMovieError(error.message));
    }
}
// đăng kí Saga
// Redux-saga cung cấp một số method gọi là effect , chúng ta sẽ định nghĩa một số chúng:
// Fork: thực hiện một hoạt động non-blocking trên function được truyền cho nó.
// Take: tạm dừng cho đến khi nhận được action
// Race: chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc.
// Call: gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
// Put: dispatch một action.
// Select: chạy một selector function để lấy data từ state.
// takeLatest: có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
// takeEvery: thực thi và trả lại kết quả của mọi actions được gọi.
function* fetchMovieRequest() {
    yield takeFirst(actions.fetchMovieRequest, handleFetchMovieRequest);
}

export default {
    fetchMovieRequest
}