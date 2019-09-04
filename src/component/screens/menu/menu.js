import React, { Component } from "react";
import { scale, verticalScale, moderateScale, WINDOW_SIZE, SPACING_CONSTANTS } from '../../../../src/utils/scale'

import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  StyleSheet
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
import { SectionGrid } from "react-native-super-grid";

// import { ScrollView } from 'react-native-gesture-handler';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "test@gmail.com",
      students: [],
      google_data: [],
      menu_list: [
        {
          title: "danh sách",
          link: "list_student",
          icon: "format-list-checkbox",
          lib: "MaterialCommunityIcons"
        },
        {
          title: "Scan QR",
          link: "scanQRScreen",
          icon: "qrcode",
          lib: "AntDesign"
        },
        {
          title: "Đồng bộ",
          link: "Sync",
          icon: "cloud-sync",
          lib: "MaterialCommunityIcons"
        },
        {
          title: "Profile",
          link: "Profile",
          icon: "face-profile",
          lib: "MaterialCommunityIcons"
        }
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
    // ToastAndroid.show("Đang đồng bộ !", ToastAndroid.SHORT);
    alert('Đang đồng bộ!')
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
              alert('Đồng bộ thành công!')
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

  _renderItem = ({ item }) => (
    <View style={styles.SingleItem}>
      <View style={{ alignContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(`${item.link}`, {
              email: this.state.email
            });
          }}
        >
          <Icon
            type={item.lib}
            style={{ fontSize: 60, color: "#0086FF", marginLeft: 60 }}
            name={item.icon}
          />
          <Text
            style={{ margin: 5, textAlign: "center", fontWeight: "bold" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  componentWillMount() {
    this.setState({
      // bật để lấy email user
      // email: this.props.navigation.state.params.email
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
          {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
          <FlatList
            style={styles.MenuItem}
            numColumns={2}
            data={this.state.menu_list}
            keyExtractor={(item, index) => item.key}
            renderItem={this._renderItem}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    width: "100%"
    // backgroundColor: "lightgray"
  },
  MenuItem: {
    flex: 1,
    backgroundColor: "white",
    width: "98%"
    // borderRadius: 5
  },
  SingleItem: {
    // borderRadius: 16,
    overflow: "hidden",
    height: 200,
    width: "49%",
    paddingTop: verticalScale(50),
    marginHorizontal: verticalScale(2.5),
    backgroundColor: "white"
  }
});

export default menu;
