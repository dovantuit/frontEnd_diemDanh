
// import Toast, { DURATION } from 'react-native-easy-toast';
{/* <Toast ref="toast" /> */ }
// this.refs.toast.show(`Thêm thành công!`)

import React, { Component } from "react";
import {
  View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ToastAndroid
} from "react-native";
import {
  Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text
} from "native-base";
import axios from "axios";
import api from '../../../services/config/index';
import Toast, { DURATION } from 'react-native-easy-toast';

class list_student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      email: "",
      lastRefresh: Date(Date.now()).toString()
    };
  }

  addData_SQL = async () => {
    this.refs.toast.show(`Updating!`)
    var url = `${api.hostApi}/students_add`;
    var data = {
      email: "email",
      full_name: "full_name",
      phone_number: "phone_number",
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
      attended: true
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
          }
        }
      )
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  }

  componentWillMount() {
    this.setState(
      {
        email: this.props.navigation.state.params.email
      },
      () => console.log(`>>> email dang nhap: ${this.state.email}`)
    );
  }

  componentDidMount() {
    this.loadData_SQL();
  }

  async diemDanh(id) {
    await this.updateData_SQL1(id);
    // await this.props.navigation.navigate("menu", {
    //   email: this.state.email
    // });
    // alert('đã điểm danh ')
    this.refs.toast.show(`Đã điểm danh !!`);

    // ToastAndroid.show("Đã điểm danh !!", ToastAndroid.SHORT);
  }
  taoQR = student => {
    var prepare_text_code = { "email": student.email, "phone_number": student.phone_number, "full_name:": student.full_name }

    this.props.navigation.navigate("codeGenerateScreen", {
      text_code: `${JSON.stringify(prepare_text_code)}`,
      full_name: student.full_name,
      id: student.id,
      email: student.email,
      phone_number: student.phone_number
    });
  };

  renderList = student => {
    if (student.attended == true) {
      return (
        <ListItem avatar>
          <Left>
            <Thumbnail source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BjeQGUSCx149zAAEW_uZUeAOQIsieFtozn_1t9GNYeuL0ahl0Q` }} />
          </Left>
          <Body>
            <TouchableOpacity onPress={() => this.taoQR(student)}>
              <Text>{student.full_name}</Text>
            </TouchableOpacity>
            <Text note style={{ width: 150 }}
              numberOfLines={2}
              ellipsizeMode='tail'>
              {student.email + "\n"}
            </Text>
          </Body>
          <Right>
            <Text note>đã tham dự</Text>
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem avatar>
          <Left>
            <Thumbnail source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BjeQGUSCx149zAAEW_uZUeAOQIsieFtozn_1t9GNYeuL0ahl0Q` }} />
          </Left>
          <Body>
            <TouchableOpacity
              onPress={() => this.taoQR(student)}
            >
              <Text>{student.full_name}</Text>
            </TouchableOpacity>
            <Text note style={{ width: 150 }}
              numberOfLines={2}
              ellipsizeMode='tail'>
              {student.email + "\n"}
            </Text>
          </Body>
          <Right>
            <Text note>chưa tham dự</Text>
            <TouchableOpacity
              onPress={() => {
                this.diemDanh(student.id);
              }}
            >
              <Icon
                // style={{ marginTop: -10, }}
                type="MaterialCommunityIcons"
                style={{ fontSize: 30, color: "green" }}
                name="checkbox-marked-outline"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.diemDanh(student.id);
              }}
            >
              <Icon
                style={{ marginLeft: -20, }}
                type="MaterialCommunityIcons"
                style={{ fontSize: 30, color: "green" }}
                name="checkbox-marked-outline"
              />
            </TouchableOpacity>
          </Right>
        </ListItem>
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
            <Title style={{ color: 'white' }}>Students list</Title>
          </Body>
          <Right>
            <Button transparent>
              <TouchableOpacity onPress={() => { this.diemDanh(student.id) }}>
                <Icon onPress={() => {
                  this.refs.toast.show(`Mailing!`)
                }} type="MaterialIcons" style={{ fontSize: 30, color: 'white' }} name="email" />
              </TouchableOpacity>
            </Button>
            <Button transparent>
              <TouchableOpacity onPress={() => { this.diemDanh(student.id) }}>
                <Icon onPress={() => {
                  this.props.navigation.navigate("add_student")
                }} type="AntDesign" style={{ fontSize: 30, color: 'white' }} name="adduser" />
              </TouchableOpacity>
            </Button>
          </Right>
        </Header>
        <Content style={{ width: "99.8%", paddingLeft: "0.2%" }}>
          <ScrollView>
            <List>
              <FlatList
                style={{ marginBottom: 1 }}
                data={this.state.students}
                renderItem={({ item }, index) => this.renderList(item)}
                column={1}
              />
            </List>
          </ScrollView>
          <Toast ref="toast"
            // style={{ backgroundColor: 'red' }}
            // position='bottom'
            // positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.9}
          // textStyle={{ color: 'white' }}
          />
        </Content>
      </Container>
    );
  }
}

export default list_student;
