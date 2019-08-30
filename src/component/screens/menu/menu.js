import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text } from 'native-base';
import QRCode from 'react-native-qrcode';
import axios from 'axios'
// import { ScrollView } from 'react-native-gesture-handler';

class menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''

        };
    }

    componentWillMount() {
        this.setState({
            email: this.props.navigation.state.params.email
        })
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'ligtgray' }} >
                <Header>
                    <Left>
                        <Button transparent >
                            <Icon type="AntDesign" style={{ fontSize: 25, color: 'white' }} name="contacts" />

                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Menu</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                          
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: '99.8%', paddingLeft: "0.2%", }}>
                    <TouchableOpacity style={{  backgroundColor: 'blue', paddingVertical: 15, marginVertical: 10 }} onPress={() => {
                        this.props.navigation.navigate('list_student', {
                            email: this.state.email,
                        })
                    }}><Text note style={{color:'white', fontWeight:'bold'}}>Danh sách học sinh</Text></TouchableOpacity>
                    <TouchableOpacity style={{  backgroundColor: 'blue', paddingVertical: 15 }} onPress={() => {
                        this.props.navigation.navigate('scanQRScreen', {
                            email: this.state.email
                        })
                    }}><Text note style={{color:'white', fontWeight:'bold'}}>Scan QR code</Text></TouchableOpacity>

                </Content>
            </Container>

        );
    }
}

export default menu;
