// File mặc định, ko cần chỉnh sửa
import { store as reduxStore, persistor as persistStore } from '../../App';
import { get } from 'lodash';

/*
export const clearPersist = () => {
  persistor.purge()
}
*/

export const getInstance = () =>{
  return reduxStore
}

//get global state of application
// lấy state toàn cục của ứng dụng 
export const getGlobalState = () => {
  return reduxStore.getState();
}

export const purge = () => {
  persistStore.purge();
}

//get specific state
export const getSpecificState = (name) => {
  return get(getGlobalState(), name);
}

//dispatch action to current store
//dispatch action tới store hiện tại 
export const dispatch = (action) => {
  return reduxStore.dispatch(action);
}