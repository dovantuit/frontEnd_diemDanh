// 'use strict';
import React, { Component } from "react";
import QRCode from "react-native-qrcode";

import { AppRegistry, StyleSheet, View, TextInput, Text } from "react-native";
import { bold } from "ansi-colors";

const hostApi = `http://10.0.5.180:3000`;

export default class codeGenerateScreen extends Component {
  state = {
    text: "http://facebook.github.io/react-native/",
    text_code: "",
    full_name: "",
    id: "",
    email: "",
    phone_number: ""
  };

  componentDidMount() {
    this.setState({
      text_code: this.props.navigation.state.params.text_code,
      full_name: this.props.navigation.state.params.full_name,
      id: this.props.navigation.state.params.id,
      email: this.props.navigation.state.params.email,
      phone_number: this.props.navigation.state.params.phone_number
    });
  }
  async mail_updateData_SQL(id) {
    var url = "http://10.0.5.180:3000/students_mail";
    var data = {
      id: id,
      email: this.state.email,
      // full_name: 'full_name',
      phone_number: this.state.phone_number
      // address: 'address',
      // attended: true,
      // createBy: 'createBy',
      // updateBy: 'updateBy',
      // is_delete: false,
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
  }
  async sentCode(id) {
    await this.mail_updateData_SQL(id);
    await this.props.navigation.navigate("list_student", {
      email: this.state.email
    });
    alert("đã gửi code ");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>
          {this.state.full_name.toUpperCase()}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text: text })}
          value={this.state.text_code}
        />
        <QRCode
          value={this.state.text_code.toString()}
          size={200}
          bgColor="black"
          fgColor="white"
        />
        <Text
          onPress={() =>
            this.props.navigation.navigate("list_student", {
              email: this.state.full_name
            })
          }
          style={{ fontWeight: "bold" }}
        >
          BACK
        </Text>

        <Text
          onPress={() => this.sentCode(this.state.id)}
          style={{ fontWeight: "bold" }}
        >
          GỬI LẠI CODE CHO HỌC SINH NÀY
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5
  }
});
