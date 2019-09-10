//https://www.getpostman.com/collections/6d720bfe30ef339d13f1
//Here is reusable logic
// import fetch from 'isomorphic-fetch';
import _ from 'lodash';
const hostApi = 'https://kw.freecinema.info/m';

export default function callApi(endpoint, method = 'get' , body, header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1MTY4NTQ0NjAsInVrZXkiOiJCWCIsImV4cCI6MTUxOTQ0NjQ2MCwiaWF0IjoxNTE2ODU0NDYwLCJkaWQiOiIwOUNFMkE4REUyNTY0MjFEQTNGOUM0OTQwMEFBNzNERiIsImp0aSI6ImVjZWM5MmM0NGUwZDQ4MGFhYmVlNTY0ZTFjMWEyYWMxIiwiY2lkIjoiMjkyMjY0ODg0NSJ9.VQUbNvT5QgVNwQ2OUriWEezt3goPi0Th2kSGDM0mc0o",
}) {
    return new Promise((resolve, reject) => {
        fetch(`${hostApi}${endpoint}`, {
            headers: header,
            method,
            body: body,
        })
            .then(response => response.json()
                .then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (!response.ok) {
                    reject({ status: response.status, msg: json });
                }
                return resolve(json);
            })
            .then(
                response => response
            )
            .catch(err => console.log(err));
    });
}