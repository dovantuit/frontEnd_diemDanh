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
const hostApi = `http://10.0.5.180:3000`;

// import { ScrollView } from 'react-native-gesture-handler';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      students: [],
      google_data: [],
      menu_list: [
        { title: "danh sách sinh viên", link: "list_student" },
        { title: "Scan QR", link: "scanQRScreen" },
        { title: "Đồng bộ", link: "Sync" },
        { title: "Profile", link: "Profile" }
      ]
    };
  }
  async loadData_SQL_students() {
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
  addData_SQL_from_GG = async student => {
    email = student[1];
    full_name = student[2];
    phone_number = student[3];
    address = student[4];
    // alert('update now')
    var url = `${hostApi}/students_add`;
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

  loadData_google() {
    ToastAndroid.show("Đang đồng bộ !", ToastAndroid.SHORT);
    axios
      .get(`${hostApi}/gg_read`)

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
              ToastAndroid.show("Đồng bộ thành công!!", ToastAndroid.SHORT);

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
  async loadData_SQL() {
    axios
      .get(`${hostApi}/accounts_read`)

      .then(responseJson => {
        this.setState({
          accounts: responseJson.data.accounts
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.setState({
      email: this.props.navigation.state.params.email
    });
  }
  componentDidMount() {
    this.loadData_SQL();
    this.loadData_SQL_students();
  }

  render() {
    return (
      <Container style={{ backgroundColor: "ligtgray" }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                type="AntDesign"
                style={{ fontSize: 25, color: "white" }}
                name="contacts"
              />

              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Menu</Title>
          </Body>
          <Right>
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

            <Button transparent></Button>
          </Right>
        </Header>
        <Content style={{ width: "99.8%", paddingLeft: "0.2%" }}>
          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20
            }}
          >
            <View
              style={{ backgroundColor: "0086FF", flex: 0.5, borderWidth: 1 }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("list_student", {
                    email: this.state.email
                  });
                }}
              >
                <Icon
                  type="AntDesign"
                  style={{ fontSize: 25, color: "blue" }}
                  name="back"
                />
                <Text>List</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ backgroundColor: "0086FF", flex: 0.5, borderWidth: 1 }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("list_student", {
                    email: this.state.email
                  });
                }}
              >
                <Icon
                  type="AntDesign"
                  style={{ fontSize: 25, color: "blue" }}
                  name="back"
                />
                <Text>QR code</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20
            }}
          >
            <View
              style={{ backgroundColor: "0086FF", flex: 0.5, borderWidth: 1 }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("list_student", {
                    email: this.state.email
                  });
                }}
              >
                <Icon
                  type="AntDesign"
                  style={{ fontSize: 25, color: "blue" }}
                  name="back"
                />
                <Text>Sync</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ backgroundColor: "0086FF", flex: 0.5, borderWidth: 1 }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("list_student", {
                    email: this.state.email
                  });
                }}
              >
                <Icon
                  type="AntDesign"
                  style={{ fontSize: 25, color: "blue" }}
                  name="back"
                />
                <Text>Danh sách học sinh</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              paddingVertical: 15,
              marginVertical: 10
            }}
            onPress={() => {
              this.props.navigation.navigate("scanQRScreen", {
                email: this.state.email
              });
            }}
          >
            <Text note style={{ color: "white", fontWeight: "bold" }}>
              Scan QR code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "blue", paddingVertical: 15 }}
            onPress={() => {
              this.props.navigation.navigate("scanQRScreen", {
                email: this.state.email
              });
            }}
          >
            <Text note style={{ color: "white", fontWeight: "bold" }}>
              Đồng bộ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "blue", paddingVertical: 15 }}
            onPress={() => {
              this.props.navigation.navigate("scanQRScreen", {
                email: this.state.email
              });
            }}
          >
            <Text note style={{ color: "white", fontWeight: "bold" }}>
              Profile
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default menu;
