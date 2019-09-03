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
const hostApi = `http://10.0.5.180:3000`;

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
    // alert('update now')
    var url = `${hostApi}/students_add`;
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
      .get(`${hostApi}/students_read`)
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
        `${hostApi}/students_update`,
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
        <Header>
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

              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Students list</Title>
          </Body>
          <Right>
            {/* <Button transparent> */}
            {/* <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'orange' }} onPress={() => { this.diemDanh(student.id) }}><Text note>điểm danh</Text></TouchableOpacity> */}

            {/* <Icon onPress={() => { */}
            {/* Alert.alert('Notice!', */}
            {/* `Bạn đang đăng nhập bằng tài khoản: ${this.state.email}`, */}
            {/* [ */}
            {/* { text: 'Okay', onPress: () => console.log('okie') } */}
            {/* ]) */}
            {/* }} type="MaterialCommunityIcons" style={{ fontSize: 25, color: 'white' }} name="face-profile" /> */}
            {/* <Text>Profile</Text> */}
            {/* </Button> */}
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
        </Content>
      </Container>
    );
  }
}

export default list_student;
