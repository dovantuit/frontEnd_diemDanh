import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text } from 'native-base';
import QRCode from 'react-native-qrcode';
import axios from 'axios'
// import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';

class menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            email: ''

        };
    }
    async addData_SQL() {
        // alert('update now')
        var url = 'http://10.0.5.180:3000/students_add';
        var data = {
            email: 'email',
            full_name: 'full_name',
            phone_number: 'phone_number',
            address: 'address',
            attended: 'attended',
            createBy: 'createBy',
            updateBy: 'updateBy',
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

    async  loadData_SQL() {
        axios.get('http://10.0.5.180:3000/students_read')
            .then((responseJson) => {
                // console.log('list data')
                // console.log(responseJson)
                this.setState({
                    students: responseJson.data.students,
                }, () => console.log(this.state.students)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }


    async updateData_SQL1(id) {
        var data = {
            id: id,
            // email: 'ttttttttttttttt',
            // full_name: 'full_name',
            // phone_number: 'phone_number',
            // address: 'address',
            attended: true,
            // createBy: 'createBy',
            // updateBy: 'updateBy',
            // is_delete: false,
        };

        axios.post(
            'http://10.0.5.180:3000/students_update',
            {
                'id': id,
                'attended': 'false',
            },
            {
                headers: {
                    'api-Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //other header fields
                }
            }
        ).then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    // async updateData_SQL(id) {
    //     var url = 'http://10.0.5.180:3000/students_update';
    //     var data = {
    //         id: id,
    //         // email: 'ttttttttttttttt',
    //         // full_name: 'full_name',
    //         // phone_number: 'phone_number',
    //         // address: 'address',
    //         attended: true,
    //         // createBy: 'createBy',
    //         // updateBy: 'updateBy',
    //         // is_delete: false,
    //     };

    //     fetch(url, {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data), // data can be `string` or {object}!
    //     }).then(res => res.json())
    //         .then(response => console.log('Success:', JSON.stringify(response)))
    //         .catch(error => console.error('Error:', error));
    // }
    componentWillMount() {
        // this.setState({
        //     email: this.props.navigation.state.params.email
        // }, () => console.log(`>>> email dang nhap: ${this.state.email}`))
    }

    componentDidMount() {
        this.loadData_SQL()
        // this.updateData_SQL1(54)
        // this.addData_SQL()

    }

    async diemDanh(id) {
        await this.updateData_SQL(id)
        await this.props.navigation.navigate('list_student', {
            email: this.state.email,
        });
        alert('da diem danh thanh cong ')
    }
    taoQR = (student) => {
        this.props.navigation.navigate('codeGenerateScreen', {
            text_code: `${student.id}${student.email}${student.phone_number}`,
            full_name: student.full_name
        });

    }

    renderList = (student) => {
        if (student.attended == true) {
            return (

                <List>
                    <ListItem avatar>
                        <Body>
                            <TouchableOpacity
                                // onPress={() => alert(`id:${student.id},email: ${student.email}, phone: ${student.phone_number}`)}
                                onPress={() => this.taoQR(student)}
                            ><Text>{student.full_name}</Text></TouchableOpacity>
                            <Text note>{student.email}</Text>
                        </Body>
                        <Right>
                            <Text note>đã tham dự</Text>

                        </Right>
                    </ListItem>
                </List>
            )
        }
        else {
            return (
                <List>
                    <ListItem avatar>
                        <Body>
                            <Text>{student.full_name}</Text>
                            <Text note>{student.email}</Text>
                        </Body>
                        <Right>
                            <Text note>chưa tham dự</Text>
                            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'orange' }} onPress={() => { this.diemDanh(student.id) }}><Text note>điểm danh</Text></TouchableOpacity>
                        </Right>
                    </ListItem>
                </List>
            )
        }
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
                            {/* <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'orange' }} onPress={() => { this.diemDanh(student.id) }}><Text note>điểm danh</Text></TouchableOpacity> */}

                            <Icon onPress={() => {
                                Alert.alert('Notice!',
                                    `Bạn đang đăng nhập bằng tài khoản: ${this.state.email}`,
                                    [
                                        { text: 'Okay', onPress: () => console.log('okie') }
                                    ])
                            }} type="MaterialCommunityIcons" style={{ fontSize: 25, color: 'white' }} name="face-profile" />
                            {/* <Text>Profile</Text> */}
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: '99.8%', paddingLeft: "0.2%", }}>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'lightblue', paddingVertical: 15, marginVertical:10 }} onPress={() => {
                        this.props.navigation.navigate('list_student', {
                            email: this.state.email,
                        })
                    }}><Text note>Danh sách học sinh</Text></TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'lightblue', paddingVertical:15 }} onPress={() => {
                        this.props.navigation.navigate('scanQRScreen')
                    }}><Text note>Scan QR code</Text></TouchableOpacity>

                </Content>
            </Container>

        );
    }
}

export default menu;
