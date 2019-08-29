import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import { thisExpression } from '@babel/types';
import axios from 'axios'

// validation
const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = `Require!`
    }
    else if (!values.password.length > 5) {
        errors.password = `pass more than 5 letters`
    }
    if (!values.email) {
        errors.email = 'Require!'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    return errors
}

const renderField = ({ label, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (<View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>

        <Text style={{ fontSize: 14, fontWeight: 'bold', width: 70 }}>{label}</Text>
        <TextInput style={{ borderColor: 'steeblue', borderWidth: 1, height: 37, width: 200, padding: 5 }}
            keyboardType={keyboardType} onChangeText={onChange} {...restInput}>

        </TextInput>

        {touched && ((error && <Text style={{ color: 'red', marginLeft: 10, }}>{error}</Text>) ||
            (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))
        }
    </View>
    );
};

class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: "",
            accounts: []
        };
    }

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    submit = user => {

        // const user = {
        //     email: values.email,
        //     password: values.password,
        // };

        this.state.accounts.map(that_account => {

            if (that_account.email === user.email && that_account.password === user.password) {
                this.props.navigation.navigate('list_student', {
                    email: that_account.email,
                });

            }
            else if (that_account.email === user.email || that_account.password != user.password) {
                // Alert.alert('Chú ý!',
                //     ` tài khoản hoặc mật khẩu không đúng  `,
                //     [
                //         { text: 'Yes', onPress: () => console.log('okie') }

                //     ])
            }

        })
    }

    componentWillMount() {
        this.loadData_SQL()
    };

    async  loadData_SQL() {
        axios.get('http://10.0.5.180:3000/accounts_read')

            .then((responseJson) => {
                this.setState({
                    accounts: responseJson.data.accounts,
                }, () => console.log(this.state.accounts)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'flex-start' }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 40, alignContent: 'center', }} >LOGIN</Text>

                <Field name="email" d keyboardType="email-address" label="Email:" component={renderField} />
                <Field name="password" keyboardType="default" label="Password:" component={renderField} />
                <TouchableOpacity onPress={handleSubmit(this.submit.bind(this))} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'blue', paddingHorizontal: 10 }} >
                    <Text style={{
                        backgroundColor: 'steeblue', color: 'white', fontSize: 15,
                        height: 37, width: 200, textAlign: 'center', padding: 10,
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('sign_up')} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'blue' }} >
                    <Text style={{
                        color: 'white', fontSize: 15,
                        height: 37, width: 200, textAlign: 'center', padding: 10,
                    }}>Sign up</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const ContactForm = reduxForm({
    form: 'contact', // a unit name for only this form
    validate,
})(ContactComponent // class
)

function mapStateToProps(state) {
    return {
    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        initialize,
    }, dispatch);
}

export default withNavigation(ContactForm);