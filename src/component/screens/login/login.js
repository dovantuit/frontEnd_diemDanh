import React, { Component } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: 'dovantuit@gmail.com',
            password: '123456',
            name: "",
            accounts: []
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

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onPressLogin = async () => {
        var dem  = 0
        this.state.accounts.map(that_account => {
            // if (that_account.email === this.state.email || that_account.password != this.state.password) {
            //     Alert.alert('Chú ý!',
            //     ` tài khoản hoặc mật khẩu không đúng  `,
            //     [
            //         { text: 'Yes', onPress: () => console.log('okie') }
                    
            //     ])
            // }
            if (that_account.email === this.state.email && that_account.password === this.state.password) {
                this.props.navigation.navigate('list_student', {
                    email: that_account.email,
                });
            }
           
        })
    }

    // taoUser = (user) => {
    //     // check trùng usesr
    //     // var trung = 0;
    //     //  this.state.users.map(that_user => {
    //     //     if (that_user.email === user.email) {
    //     //         trung += 1
    //     //     }
    //     // })
    //     // if (trung = 0) {

    //     firebase.database().ref('user').push({
    //         email: user.email,
    //         user_id: Backend.getUid(),
    //         name: this.state.name,
    //         avatar: 'https://placeimg.com/140/140/any',
    //         sub_id: Backend.S4() + Backend.S4(),

    //     });
    //     // }

    //     ///

    //     // alert(user.email)
    // }

    // loginSuccess = () => {
    //     /// --- get user information
    //     var user = firebase.auth().currentUser;
    //     if (user) {

    //         // User is signed in.
    //         if (user != null) {

    //             this.taoUser(user);
    //             email = user.email;
    //             uid = user.uid;
    //             name = user.name;
    //             // alert(uid)
    //         }
    //     } else {
    //         // No user is signed in.
    //     }
    //     ///

    //     // Alert.alert('Notice!',
    //     //     `Successed login under ${this.state.email},\n you are in chat now`,
    //     //     [
    //     //         { text: 'Okie Great', onPress: () => console.log('okie') }
    //     //     ])
    //     // alert('login successful, navigate.');
    //     this.props.navigation.navigate('menu', {
    //         uid: Backend.getUid(),
    //         name: this.state.name,
    //         email: this.state.email,
    //         user: user.name
    //     });
    // };

    // loginFailed = () => {
    //     alert('Login failure. Please tried again.');
    // };

    // componentWillMount() {
    //     // if (!firebase.apps.length) { // avoid re-build firebase
    //     //     var config = {
    //     //         apiKey: "AIzaSyAQpkf7fbY5Pie65N8I83imKp6yVAMPUWg",
    //     //         authDomain: "unitchat-37201.firebaseapp.com",
    //     //         databaseURL: "https://unitchat-37201.firebaseio.com",
    //     //         projectId: "unitchat-37201",
    //     //         storageBucket: "",
    //     //         messagingSenderId: "701005589704",
    //     //         appId: "1:701005589704:web:164635bca576ee06"
    //     //     };
    //     //     firebase.initializeApp(config);
    //     // }
    //     // firebase.database().ref('user').on("value", snapshot => {
    //     //     if (snapshot.val() !== undefined && snapshot.val() !== null) {
    //     //         this.setState({
    //     //             users: Object.values(snapshot.val())
    //     //         }, () => console.log(this.state.users));
    //     //     }
    //     // });

    // };

    // componentDidMount() {
    //     // let username = await AsyncStorage.getItem('name');
    //     // this.setState({ username })
    //     // firebase.database().ref('user').on("value", snapshot => {
    //     //     if (snapshot.val() !== undefined && snapshot.val() !== null) {
    //     //         this.setState({
    //     //             users: Object.values(snapshot.val())
    //     //         }, () => console.log(this.state.users));
    //     //     }
    //     // });
    // }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Login</Title>
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
                            <Label>Email</Label>
                            <Input onChangeText={(email) => this.onChangeTextEmail(email)} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(password) => this.onChangeTextPassword(password)} />
                        </Item>
                    </Form>
                    <Button full
                        onPress={() => this.onPressLogin()}
                    >
                        <Text>Login</Text>
                    </Button>
                    <Text style={{ paddingLeft: 180 }}>OR</Text>
                    <Button full
                        onPress={() => this.props.navigation.navigate('sign_up')}
                    >
                        <Text>Sign up</Text>
                    </Button>

                    <Text style={{ paddingLeft: 180 }}>OR</Text>
                    <Button full
                        onPress={() => this.props.navigation.navigate('scanQRScreen')}
                    >
                        <Text>scan QR</Text>
                    </Button>

                    <Text style={{ paddingLeft: 180 }}>OR</Text>
                    <Button full
                        onPress={() => this.props.navigation.navigate('codeGenerateScreen')}
                    >
                        <Text>generate QR</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default login;
