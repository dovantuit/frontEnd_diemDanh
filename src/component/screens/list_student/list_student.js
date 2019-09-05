
// import Toast, { DURATION } from 'react-native-easy-toast';
{/* <Toast ref="toast" /> */ }
// this.refs.toast.show(`Thêm thành công!`)

import React, { Component } from "react";
import {
  View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ToastAndroid, RefreshControl, ActivityIndicator
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
      lastRefresh: Date(Date.now()).toString(),
      isRefreshing: false, //for pull to refresh,
      loading: false,
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
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  async loadData_SQL() {
    this.setState({ loading: true })
    axios
      .get(`${api.hostApi}/students_read`)
      .then(responseJson => {
        this.setState(
          {
            students: responseJson.data.students,
            loading: false
          },
          () => console.log(this.state.students)
        );
      })
      .catch(error => {
        this.setState({ loading: false })
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
  /// gửi mai báo cáo
  sent_report_mail_attend = async email => {

    var data_student_checked = [];
    this.state.students.map(student => {
      if (student.attended === true) {
        data_student_checked.push(student)
      }
    })

    // alert('update now')
    var url = `${api.hostApi}/report_mail`;
    var data = {
      email: email,
      data: data_student_checked
      //   full_name: full_name,
      //   phone_number: phone_number,
      //   address: address,
      //   attended: "attended",
      //   createBy: "createBy",
      //   updateBy: "updateBy",
      //   is_delete: false
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
        this.refs.toast.show(`mail thành công!`),

        console.log("add student Success:", JSON.stringify(response))
      )
      .catch(error => console.error("Error:", error));
  };

  sent_report_mail_miss = async email => {

    var data_student_checked = [];
    this.state.students.map(student => {
      if (student.attended === false) {
        data_student_checked.push(student)
      }
    })

    // alert('update now')
    var url = `${api.hostApi}/report_mail`;
    var data = {
      email: email,
      data: data_student_checked
      //   full_name: full_name,
      //   phone_number: phone_number,
      //   address: address,
      //   attended: "attended",
      //   createBy: "createBy",
      //   updateBy: "updateBy",
      //   is_delete: false
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
        this.refs.toast.show(`mail thành công!`),

        console.log("add student Success:", JSON.stringify(response))
      )
      .catch(error => console.error("Error:", error));
  };

  componentWillMount() {
    this.loadData_SQL();
    this.setState(
      {
        email: this.props.navigation.state.params.email
      },
      () => console.log(`>>> email dang nhap: ${this.state.email}`)
    );
  }

  componentDidMount() {
  }

  async diemDanh(id) {
    await this.updateData_SQL1(id);
    this.refs.toast.show(`Đã điểm danh !!`);
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
            <Icon
              type="SimpleLineIcons"
              style={{ fontSize: 30, color: "green" }}
              name="check"
            />
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
                type="SimpleLineIcons"
                style={{ fontSize: 30, color: "red" }}
                name="check"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </Right>
        </ListItem>
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <View style={{
        width: '100%',
        height: '100%'
      }}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <ActivityIndicator style={{ fontSize: 500, color: '#000' }} />
      </View>;
    }
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
                  // this.sent_report_mail(`dovantuit@gmail.com`)

                  Alert.alert("Pick report!", `  `, [
                    { text: "Checked student", onPress: () => { this.sent_report_mail_attend(`dovantuit@gmail.com`) } },
                    { text: 'missed student', onPress: () => { this.sent_report_mail_miss(`dovantuit@gmail.com`) } },
                    { text: 'cancel', onPress: () => console.log('CANCEL') }
                  ], { cancelable: true });
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
                extraData={this.state}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.loadData_SQL.bind(this)}
                  />
                }
                renderItem={({ item }, index) => this.renderList(item)}
                column={1}
              // onEndReachedThreshold={0.4}
              // onEndReached={() => this.refs.toast.show(`Load more`)}
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
