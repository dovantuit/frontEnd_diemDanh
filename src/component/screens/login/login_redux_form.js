import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import React, { Component } from 'react'
// import App from './App';
import { name as appName } from '../../../../app.json';
import store from '../../../../store'
// import ContactForm from './src/component/redux/contactForm'
import ContactForm from '../../redux/contactForm/contactForm'

    // const handleSummit = value => {
    //     alert(`submit success with value = ${value}`)
    // };
export default class Login_redux_form extends Component {
    
    // submit = values => {
    //     // print the form values to the console
    //     console.log(values)
    //   }

    render() {
        return (
            <Provider store={store}>
                <ContactForm />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Login_redux_form);
