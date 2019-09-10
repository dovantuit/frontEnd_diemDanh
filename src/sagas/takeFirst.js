// File mặc định, không chỉnh sửa
// Redux-saga cung cấp một số method gọi là effect , chúng ta sẽ định nghĩa một số chúng:

// Fork: thực hiện một hoạt động non-blocking trên function được truyền cho nó.
// Take: tạm dừng cho đến khi nhận được action
// Race: chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc.
// Call: gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
// Put: dispatch một action.
// Select: chạy một selector function để lấy data từ state.
// takeLatest: có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
// takeEvery: thực thi và trả lại kết quả của mọi actions được gọi.

import {call, take, fork, takeEvery} from 'redux-saga/effects'

export default function* takeFirst(pattern, saga, ...args){
    const task = yield fork(function*(){
        while (true){
            const action = yield take(pattern);
            yield call(saga, ...args.concat(action));
        }
    });
    return task;
}

export function* takeAll(pattern, saga, ...args){
    const task = yield fork(function*(){
        while (true){
            const action = yield takeEvery(pattern);
            yield call(saga, ...args.concat(action));
        }
    });
    return task;
}