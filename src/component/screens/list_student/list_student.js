import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text } from 'native-base';

import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';

class room_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomLists: [],
            users: [],
            user_sql: [],

        };
    }

    // async updateData_SQL() {
    //     // alert('update now')
    //     var url = 'http://10.0.5.179:3000/user_update';
    //     var data = {
    //         id: '18',
    //         id_user: '9',
    //         avatar: '9',
    //         emai: '9',
    //         name: '9',
    //         sub_id: '9',
    //         user_id: '9'
    //     };

    //     fetch(url, {
    //         method: 'POST', // or 'PUT'
    //         body: JSON.stringify(data), // data can be `string` or {object}!
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(res => res.json())
    //         .then(response => console.log('Success:', JSON.stringify(response)))
    //         .catch(error => console.error('Error:', error));
    // }

    async  loadData_SQL() {

        fetch('http://10.0.5.179:3000/user_read')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    user_sql: responseJson.user,
                }, () => console.log(this.state.user_sql)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        // this.loadData_SQL()
        // this.updateData_SQL()
       
    }

    _renderRoomList = (item) => {
        
        return (
            <TouchableOpacity
                // style={{borderWidth:1}}
                onPress={() => this.props.navigation.navigate("login", {
                    // key: item.key,
                    room_id: item.room_id,
                    room_name: item.room_name,
                    user_id: item.user_id[0].id_guess
                }
                )}>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 10 }}>{item.room_name}</Text>
                </View></TouchableOpacity>

            // <TouchableOpacity onPress={() => this.props.navigation.navigate('Chatdetail'
            // )}>
            //     <View>
            //         <Text>{item.room_name}</Text>
            //     </View>
            // </TouchableOpacity>
        );
    }

    _renderUserList = (user) => {
        var this_user = user
        // console.log(room)
        // console.log(room.user_id)
        return (
            <TouchableOpacity style={{
                // borderWidth: 1,
                // borderRadius: 15, 
                marginVertical: 0, // tren duoi
                // flexDirection: 'column',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                backgroundColor: 'white',
                height: 80,
                borderBottomWidth: 1,
                borderBottomStartRadius: 50
                // borderWidth:50

            }}
                onPress={() => { this.taoChatRoom(this_user) }}
            >
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between', }}>
                    <Image source={{ uri: this_user.avatar }} style={{

                        marginTop: 10,
                        height: 60,
                        width: 60,
                        borderRadius: 30,

                    }}
                    />

                </View>
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between', marginLeft: 70, marginTop: -65 }}>

                    <Text style={{
                        // borderWidth: 1, borderRadius: 5,
                        paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 0, fontWeight: 'bold'
                    }}>{this_user.name}</Text>
                </View>
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between', marginLeft: 70, marginTop: -5 }}>

                    <Text style={{
                        fontSize: 11,
                        // borderWidth: 1, borderRadius: 5,
                        paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 0
                    }}>{this_user.sub_id}</Text>
                </View>
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between', marginLeft: 340, marginTop: -45 }}>


                    <Icon type="AntDesign" style={{ fontSize: 35, color: 'black' }} name="right" />
                </View>

            </TouchableOpacity>
        );
    }

    taoChatRoom = (user_khach) => {
        const list_room = this.state.roomLists;
        const current_user = Backend.getUid();
        var dem = 0
        var id_phong_trung = 0
        var ten_phong_trung = ""

        list_room.forEach((earch_room) => {
            if (earch_room.user_id[0].id_owner == current_user && earch_room.user_id[0].id_guess == user_khach.user_id) {
                dem++
                id_phong_trung = earch_room.room_id
                ten_phong_trung = earch_room.room_name
            }
        });


        if (dem > 0) {
            // console.log(user)

            // alert('phong da ton tai')
            this.props.navigation.navigate("chat_room", {
                // key: item.key,
                room_id: id_phong_trung,
                ten_phong: ten_phong_trung,

                // room_name: item.room_name,
                // user_id: item.user_id[0].id_guess
            })

        }
        else {
            var new_room_id = Backend.S4() + Backend.S4()

            firebase.database().ref('roomlists').push({
                room_id: new_room_id,
                room_name: user_khach.name,
                last_mess: "hello",
                user_id: [{
                    id_guess: user_khach.user_id,
                    id_owner: Backend.getUid(),
                }]

            });
            // alert('da tao phong thanh cong')
        }
        // this.props.navigation.navigate("chat_room", {
        //     // key: item.key,
        //     room_id: new_room_id,
        //     room_name: user_khach.earch_room,
        //     // user_id: item.user_id[0].id_guess
        // })

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
                        <Title>Danh sách bạn bè</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: '99.8%', paddingLeft: "0.2%", }}>
                    <ScrollView >
                        {/* <FlatList
                            style={{ marginBottom: 10 }}
                            data={this.state.roomLists}
                            renderItem={({ item }, index) => this._renderRoomList(item)}s
                        /> */}
                        <FlatList
                            style={{ marginBottom: 1 }}
                            data={this.state.roomLists}
                            renderItem={({ item }, index) => this._renderUserList(item)}
                            column={1}
                        />

                    </ScrollView>

                </Content>
            </Container>

        );
    }
}

export default room_list;
