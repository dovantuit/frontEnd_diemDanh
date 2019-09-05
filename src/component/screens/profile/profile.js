import React, { Component } from "react";
import {
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    ToastAndroid
} from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Content,
    Form,
    Item,
    Input,
    Label,
    List,
    ListItem,
    Thumbnail,
    Text
} from "native-base";
import QRCode from "react-native-qrcode";
import axios from "axios";
// import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../services/config/index';

// const api.hostApi = `http://10.0.5.180:3000`;

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            email: "",
            lastRefresh: Date(Date.now()).toString()
        };
    }

    addData_SQL = async (student) => {
        // alert('update now')
        var url = `${api.hostApi}/students_add`;
        var data = {
            email: student.email,
            full_name: "full_name",
            phone_number: student.phone_number,
            address: "address",
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
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
    };

    async loadData_SQL() {
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

    async updateData_SQL1(id) {
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
        this.loadData_SQL();
    }

    async diemDanh(id) {
        await this.updateData_SQL1(id);
        await this.props.navigation.navigate("menu", {
            email: this.state.email
        });
        // alert('đã điểm danh ')
        ToastAndroid.show("Đã điểm danh !!", ToastAndroid.SHORT);
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
                            <Text note>chưa tham dự</Text>
                            <TouchableOpacity
                                style={{ borderRadius: 5, backgroundColor: "orange" }}
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

                            {/* <Icon type="AntDesign" style={{ fontSize: 25, color: 'white' }} name="contacts" /> */}

                            {/* <Text>Back</Text> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Profile</Title>
                    </Body>
                    <Right>



                    </Right>
                </Header>
                <Content style={{ width: "99.8%", paddingLeft: "0.2%" }}>
                    <ScrollView>

                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

export default profile;
