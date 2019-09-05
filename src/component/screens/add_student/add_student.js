import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';
import axios from 'axios'
import Format from '../login/style'
import Toast, { DURATION } from 'react-native-easy-toast'
import api from '../../../services/config/index';

class add_student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            address: "",
            phone_number: "",
            full_name: ""
        };
    }

    onPressLogin = () => {
        alert(this.state.email)
    }

    addData_SQL_from_GG = async => {
        var url = `${api.hostApi}/students_add`;
        var data = {
            email: this.state.email,
            full_name: this.state.full_name,
            phone_number: this.state.phone_number,
            address: this.state.address,
            attended: "attended",
            createBy: "createBy",
            updateBy: "updateBy",
            is_delete: false
        };

        fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // data can be `string` or {object}!
        })
            .then(res => res.json())
            .then(
                // alert('Thêm thành công!'),
                this.refs.toast.show(`Thêm thành công!`),

                // ToastAndroid.show("Đồng bộ thành công!!", ToastAndroid.SHORT),
                // console.log("add student Success:", JSON.stringify(response))
            )
            .catch(error => console.error("Error:", error));
    };

    render() {
        return (
            <Container style={{ backgroundColor: "ligtgray" }}>
                <Header style={{ backgroundColor: "#0086FF" }} androidStatusBarColor="black">
                    <Left>
                        <Button transparent>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("list_student", {
                                        email: this.state.email
                                    })
                                }
                            >
                                <Icon
                                    type="AntDesign"
                                    style={{ fontSize: 25, color: "white" }}
                                    name="back"
                                />
                            </TouchableOpacity>

                            {/* <Icon type="AntDesign" style={{ fontSize: 25, color: 'white' }} name="contacts" /> */}

                            {/* <Text>Back</Text> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Add student</Title>
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
                            <Input onChangeText={email => this.setState({ email })} />

                        </Item>
                        <Item stackedLabel last>
                            <Label>Full name</Label>
                            <Input onChangeText={full_name => this.setState({ full_name })} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Phone number</Label>
                            <Input onChangeText={phone_number => this.setState({ phone_number })} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Address</Label>
                            <Input onChangeText={address => this.setState({ address })} />
                        </Item>
                    </Form>
                    <Button full
                        style={Format.button_login}
                        onPress={() => this.addData_SQL_from_GG()}
                    >
                        <Text style={Format.button_text}>ADD</Text>
                    </Button>
                    <Toast ref="toast" />

                </Content>
            </Container>
        );
    }
}

export default add_student;
