import React, { Component } from "react";
import { Field, reduxForm, initialize } from "redux-form";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { bindActionCreators } from "redux";
import { withNavigation } from "react-navigation";
import { thisExpression } from "@babel/types";
import axios from "axios";

import api from '../../../services/config/index';


// const api.hostApi = `http://10.0.5.180:3000`;
// const api.hostApi = Api.api.hostApi

// validation
const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = `Require!`;
  } else if (!values.password.length > 5) {
    errors.password = `pass more than 5 letters`;
  }
  if (!values.email) {
    errors.email = "Require!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  return errors;
};

const renderField = ({
  label,
  keyboardType,
  meta: { touched, error, warning },
  input: { onChange, ...restInput }
}) => {
  return (
    <View style={{ flexDirection: "row", height: 50, alignItems: "center" }}>
      <Text style={{ fontSize: 14, fontWeight: "bold", width: 90, marginLeft: 20 }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderColor: "steeblue",
          borderWidth: 1,
          height: 37,
          width: 200,
          padding: 5
        }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        {...restInput}
      ></TextInput>

      {touched &&
        ((error && (
          <Text style={{ color: "red", marginLeft: -200, marginTop: 47, fontSize: 9 }}>{error}</Text>
        )) ||
          (warning && <Text style={{ color: "orange" }}>{warning}</Text>))}
    </View>
  );
};

class ContactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      accounts: [],
      // google_data: [],
      students: []
    };
  }

  onChangeTextEmail = email => this.setState({ email });

  onChangeTextPassword = password => this.setState({ password });

  checkDiemDanh = string_code => {
    var ton_tai = false;
    var id_tontai = "";
    this.state.students.map(that_student => {
      if (`${that_student.email}${that_student.phone_number}` === string_code) {
        ton_tai = true;
        id_tontai = that_student.id;
      }
    });
    if (ton_tai == true) {
      this.updateData_SQL1(id_tontai);
      //   alert(` da update ${id_tontai}`);
      this.props.navigation.navigate("list_student", {
        email: this.state.email
      });
    } else {
      alert(`không tìm thấy sinh viên`);
      this.props.navigation.navigate("menu", {
        email: this.state.email
      });
    }
  };

  submit = user => {
    var trung = 0;
    this.state.accounts.map(that_account => {
      if (
        that_account.email === user.email &&
        that_account.password === user.password
      ) {
        trung += 1;
      }
    });

    if (trung === 1) {
      this.props.navigation.navigate("menu", {
        email: user.email
      });
    } else {
      Alert.alert("Chú ý!", ` tài khoản hoặc mật khẩu không đúng  `, [
        { text: "Yes", onPress: () => console.log("okie") }
      ]);
    }
  };

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

  // loadData_google() {
  //   axios
  //     .get(`${api.hostApi}/gg_read`)

  //     .then(responseJson => {
  //       this.setState(
  //         {
  //           google_data: responseJson.data.rows.values
  //         },
  //         () => {
  //           var dem = 0;
  //           this.state.google_data.map(row => {
  //             this.state.students.map(student => {
  //               // dem = 0;
  //               if (student.email === row[1]) {
  //                 dem = 1;
  //                 // alert("trung");
  //               }
  //             });
  //             if (dem === 0) {
  //               this.addData_SQL_from_GG(row);
  //             }
  //             // this.state.student
  //             //   var email = row[1];
  //             //   var full_name = row[2];
  //             //   var phone_number = row[3];
  //             //   var address = row[4];
  //             //   alert(phone_number);
  //             // this.addData_SQL_from_GG(row);
  //           });
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

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
      .then(response =>
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

  componentWillMount = async () => {
    await this.loadData_SQL();
    // this.loadData_SQL_students();
    // this.loadData_google();
  };
  componentDidMount = () => { };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          margin: 10,
          justifyContent: "flex-start"
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            width: 200,
            textAlign: "center",
            margin: 40,
            alignContent: "center"
          }}
        >
          LOGIN
        </Text>

        <Field
          name="email"
          // d
          keyboardType="email-address"
          label="Email:"
          component={renderField}
        />
        <Field
          name="password"
          keyboardType="default"
          label="Password:"
          component={renderField}
        />
        <TouchableOpacity
          onPress={handleSubmit(this.submit.bind(this))}
          style={{
            borderRadius: 10,
            margin: 10,
            alignItems: "center",
            backgroundColor: "blue",
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              //   backgroundColor: "steeblue",
              color: "white",
              fontSize: 15,
              height: 37,
              width: 200,
              textAlign: "center",
              padding: 10,
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("sign_up")}
          style={{
            borderRadius: 10,
            margin: 10,
            alignItems: "center",
            backgroundColor: "blue"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              height: 37,
              width: 200,
              textAlign: "center",
              padding: 10
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const ContactForm = reduxForm({
  form: "contact", // a unit name for only this form
  validate
})(
  ContactComponent // class
);

function mapStateToProps(state) {
  return {};
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initialize
    },
    dispatch
  );
}

export default withNavigation(ContactForm);
