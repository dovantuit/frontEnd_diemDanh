import React, { Component } from "react";
import { scale, verticalScale, moderateScale, WINDOW_SIZE, SPACING_CONSTANTS } from '../../../../src/utils/scale'
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ToastAndroid, StyleSheet
} from "react-native";
import {
  Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text
} from "native-base";
import QRCode from "react-native-qrcode";
import axios from "axios";
import api from '../../../services/config/index';
// const api.hostApi = api.api.hostApi
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
          link: "sync_list",
          icon: "cloud-sync",
          lib: "MaterialCommunityIcons"
        },
        {
          title: "Profile",
          link: "profile",
          icon: "face-profile",
          lib: "MaterialCommunityIcons"
        }
      ]
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
      is_delete: false,
      is_sentMail: false
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

  async loadData_SQL() {
    axios
      .get(`${api.hostApi}/accounts_read`)

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
        <Header style={{ backgroundColor: "#0086FF" }} androidStatusBarColor="black">
          <Left>
            {/* <Button transparent>
              <Icon
                type="AntDesign"
                style={{ fontSize: 25, color: "white" }}
                name="contacts"
              />

            </Button> */}
          </Left>
          <Body>
            <Title style={{ color: 'white' }}>Menu</Title>
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
          {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
          <FlatList
            style={styles.MenuItem}
            numColumns={2}
            data={this.state.menu_list}
            keyExtractor={(item, index) => item.key}
            renderItem={this._renderItem}
          />
        </Content>

        <Toast ref="toast"
          // style={{ backgroundColor: 'red' }}
          position='bottom'
          // positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.9}
        // textStyle={{ color: 'white' }}
        />
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
