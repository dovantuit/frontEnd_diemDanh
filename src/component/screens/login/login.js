import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: 'admin@gmail.com',
            password: '123456',
            name: "",
        };
    }

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onPressLogin = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: (this.state.name === "") ? 'default' : this.state.name,
        };
        // await firebaseSvc.login(user, this.loginSuccess(), this.loginFailed());
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
