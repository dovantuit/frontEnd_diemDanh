import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';
// import firebase from 'firebase';
// import Firebase from 'firebase';

class sign_up extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: "",
            accounts: [],
        };
    }
    async  loadData_SQL() {

        fetch('http://10.0.5.180:3000/accounts_read')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    accounts: responseJson.accounts,
                }, () => console.log(this.state.accounts)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async componentDidMount() {
        await this.loadData_SQL()
    }
    async addData_SQL() {
        // alert('update now')
        var url = 'http://10.0.5.180:3000/accounts_add';
        var data = {
            email: this.state.email,
            password: this.state.password,
            full_name: this.state.name,
            phone_number: '',
            address: '',
            attended: false,
            createBy: '',
            updateBy: '',
            is_delete: false,
        };

        fetch(url, {
            method: 'POST', // or 'PUT'

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                data
            ), // data can be `string` or {object}!
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    onPressSignup = async () => {
        var dem = 0
        this.state.accounts.map(that_account => {
            if (that_account.email == this.state.email) {
                dem +=1
            }
        })
        if(dem > 0){
            alert('tài khoản đã tồn tại!')
        }else{
            this.addData_SQL()
            alert('đã tạo tài khoản thành công!')
            this.props.navigation.navigate('login')
        }
    }

    signupSuccess = () => {
        // alert('successed signup, please login to get in chat room')
        // console.log('signup successful, navigate to login.');
        Alert.alert('Successed!',
            'please login in order get in chat rooms',
            [
                { text: 'Okay' }
            ])
        this.props.navigation.navigate('login_redux_form', {
            name: this.state.name,
            email: this.state.email,
        });
    };

    signupFailed = () => {
        Alert.alert('Failed!',
            'Signup failure. Please tried again.',
            [
                { text: 'Okay', onPress: () => console.log('okie') }
            ])
    };

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onChangeTextName = name => this.setState({ name });



    render() {
        return (
            // <SafeAreaView>
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.navigate('login')}>
                            <Icon name='arrow-back' />

                        </Button>
                    </Left>
                    <Body>
                        <Title>Sign up</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form style={{ paddingBottom: 15 }}>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(name) => this.onChangeTextName(name)} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(email) => this.onChangeTextEmail(email)} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(password) => this.onChangeTextPassword(password)} />
                        </Item>
                    </Form>
                    <Button full
                        onPress={() => this.onPressSignup()}
                    >
                        <Text>Sign up</Text>
                    </Button>
                </Content>
            </Container>

            // </SafeAreaView>
        );
    }
}

export default sign_up;
