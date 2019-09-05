import React, { Component } from "react";
import {
    View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ToastAndroid
} from "react-native";
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text
} from "native-base";
import axios from "axios";
// import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';
// const api.hostApi = `http://10.0.5.180:3000`;
import api from '../../../services/config/index';

import Toast, { DURATION } from 'react-native-easy-toast';
{/* <Toast ref="toast" /> */ }
// this.refs.toast.show(`Thêm thành công!`)


class sync_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            email: "",
            lastRefresh: Date(Date.now()).toString()
        };
    }

    async loadData_SQL_students() {
        axios
            .get(`${api.hostApi}/students_read`)
            .then(responseJson => {
                // console.log('list data')
                // console.log(responseJson)
                this.setState(
                    {
                        students: responseJson.data.students
                    },
                    () => console.log(this.state.students)
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadData_google() {
        // ToastAndroid.show("Đang đồng bộ !", ToastAndroid.SHORT);
        // alert('Đang đồng bộ!')
        this.refs.toast.show('Đang đồng bộ!');
        axios
            .get(`${api.hostApi}/gg_read`)

            .then(responseJson => {
                this.setState(
                    {
                        google_data: responseJson.data.rows.values
                    },
                    () => {
                        var dem = 0;
                        this.state.google_data.map(row => {
                            this.state.students.map(student => {
                                // dem = 0;
                                if (student.email === row[1]) {
                                    dem = 1;
                                    // alert("trung");
                                }
                            });
                            if (dem === 0) {
                                this.addData_SQL_from_GG(row);
                            }
                            this.refs.toast.show('Đồng bộ thành công!');
                            // alert('Đồng bộ thành công!')
                            // ToastAndroid.show("Đồng bộ thành công!!", ToastAndroid.SHORT);

                            // this.state.student
                            //   var email = row[1];
                            //   var full_name = row[2];
                            //   var phone_number = row[3];
                            //   var address = row[4];
                            //   alert(phone_number);
                            // this.addData_SQL_from_GG(row);
                        });
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    addData_SQL_from_GG = async student => {
        email = student[1];
        full_name = student[2];
        phone_number = student[3];
        address = student[4];
        // alert('update now')
        var url = `${api.hostApi}/students_add`;
        var data = {
            email: email,
            full_name: full_name,
            phone_number: phone_number,
            address: address,
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
                // ToastAndroid.show("Đồng bộ thành công!!", ToastAndroid.SHORT),
                console.log("add student Success:", JSON.stringify(response))
            )
            .catch(error => console.error("Error:", error));
    };

    async updateData_SQL_from_google() {
        var data = {
            id: id,
            // email: 'ttttttttttttttt',
            // full_name: 'full_name',
            // phone_number: 'phone_number',
            // address: 'address',
            attended: true
            // createBy: 'createBy',
            // updateBy: 'updateBy',
            // is_delete: false,
        };

        axios
            .post(
                `${api.hostApi}/students_update`,
                {
                    id: id,
                    attended: "true"
                },
                {
                    headers: {
                        "api-Accept": "application/json",
                        "Content-Type": "application/json"
                        //other header fields
                    }
                }
            )
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
    }



    componentWillMount() {

    }

    componentDidMount() {
        this.loadData_SQL_students();
    }

    async diemDanh(id) {
        // await this.updateData_SQL1(id);
        // await this.props.navigation.navigate("menu", {
        //     email: this.state.email
        // });
        // alert('đã điểm danh ')
        this.refs.toast.show(`đã điểm danh!`)

        // ToastAndroid.show("Đã điểm danh !!", ToastAndroid.SHORT);
    }
    taoQR = student => {
        this.props.navigation.navigate("codeGenerateScreen", {
            text_code: `${student.id}${student.email}${student.phone_number}`,
            full_name: student.full_name,
            id: student.id,
            email: student.email,
            phone_number: student.phone_number
        });
    };

    renderList = student => {
        if (student.attended == true) {
            return (
                <List>
                    <ListItem avatar>
                        <Body>
                            <TouchableOpacity onPress={() => this.taoQR(student)}>
                                <Text>{student.full_name}</Text>
                            </TouchableOpacity>
                            <Text note>{student.email}</Text>
                        </Body>
                        <Right>
                            <Text note>đã tham dự</Text>
                        </Right>
                    </ListItem>
                </List>
            );
        } else {
            return (
                <List>
                    <ListItem avatar>
                        <Body>
                            <TouchableOpacity
                                // onPress={() => alert(`id:${student.id},email: ${student.email}, phone: ${student.phone_number}`)}
                                onPress={() => this.taoQR(student)}
                            >
                                <Text>{student.full_name}</Text>
                            </TouchableOpacity>
                            <Text note>{student.email}</Text>
                        </Body>
                        <Right>
                            <Text note
                            >chưa tham dự</Text>
                            <TouchableOpacity
                                style={{ borderRadius: 5, backgroundColor: "orange", marginVertical: 15 }}
                                onPress={() => {
                                    this.diemDanh(student.id);
                                }}
                            >
                                <Text note>điểm danh</Text>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                </List>
            );
        }
    };

    render() {
        return (
            <Container style={{ backgroundColor: "ligtgray" }}>
                <Header style={{ backgroundColor: "#0086FF" }} androidStatusBarColor="black">
                    <Left>
                        <Button transparent>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("menu", {
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

                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}> Đồng bộ</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <TouchableOpacity
                                style={{ marginBottom: 5 }}
                                onPress={() => {
                                    this.loadData_google();
                                }}
                            >
                                <Icon
                                    type="MaterialCommunityIcons"
                                    style={{ fontSize: 30, color: "white" }}
                                    name="sync"
                                />
                            </TouchableOpacity>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: "99.8%", paddingLeft: "0.2%" }}>
                    <ScrollView>
                        <FlatList
                            style={{ marginBottom: 1 }}
                            data={this.state.students}
                            renderItem={({ item }, index) => this.renderList(item)}
                            column={1}
                        />
                    </ScrollView>
                    <Toast ref="toast" />
                </Content>
            </Container>
        );
    }
}

export default sync_list;
