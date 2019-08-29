import React, { Component } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';
import Format from './style'
import axios from 'axios'
import Backend from '../../../services/http/index'

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
        axios.get('http://10.0.5.180:3000/accounts_read')
        // .then((log)=>console.log(log))
        // .catch(()=>console.log('error'))
            // fetch('http://10.0.5.180:3000/accounts_read')
            // .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    accounts: responseJson.data.accounts,
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
        var dem = 0
        this.state.accounts.map(that_account => {
           
            if (that_account.email === this.state.email && that_account.password === this.state.password) {
                this.props.navigation.navigate('list_student', {
                    email: that_account.email,
                });
                
            }
            if (that_account.email === this.state.email || that_account.password != this.state.password) {
                // Alert.alert('Chú ý!',
                //     ` tài khoản hoặc mật khẩu không đúng  `,
                //     [
                //         { text: 'Yes', onPress: () => console.log('okie') }

                //     ])
            }

        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon type="SimpleLineIcons" style={{ fontSize: 25, color: 'white' }} name="login" />
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
                    <Form style={Format.form}>
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
                        style={Format.button_login}
                        onPress={() => this.onPressLogin()}
                    >
                        <Text style={Format.button_text}>LOGIN</Text>
                    </Button>
                    <Text style={Format.button_text}></Text>
                    <Button full
                        style={Format.button_login}
                        onPress={() => this.props.navigation.navigate('sign_up')}
                    >
                        <Text style={Format.button_text}>SIGN UP</Text>
                    </Button>

                    <Text style={Format.button_text}></Text>
                    <Button full
                        style={Format.button_login}
                        onPress={() => this.props.navigation.navigate('scanQRScreen')}
                    >
                        <Text style={Format.button_text}>SCAN QR</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

export default login;
