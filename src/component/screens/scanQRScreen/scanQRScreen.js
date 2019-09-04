import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  PermissionsAndroid, Alert
} from "react-native";
import React, { Component } from "react";
import { CameraKitCameraScreen } from "react-native-camera-kit";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Content
} from "native-base";
import axios from "axios";
const hostApi = `http://10.0.5.180:3000`;
import Toast, { DURATION } from 'react-native-easy-toast'


// scan QR code
export default class scanQRScreen extends Component {
  constructor() {
    super();

    this.state = {
      QR_Code_Value: "",

      Start_Scanner: false,
      students: [],
      email: ""
    };
  }

  async loadData_SQL() {
    fetch(`${hostApi}/students_read`)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
        this.setState(
          {
            students: responseJson.students
          },
          () => console.log(this.state.students)
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  async updateData_SQL1(id) {
    // this.refs.toast.show('đã đỉêm danh!');e
    alert('checked done!')

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
  // async loadData_SQL_students() {
  //   axios
  //     .get(`${hostApi}/students_read`)
  //     .then(responseJson => {
  //       // console.log('list data')
  //       // console.log(responseJson)
  //       this.setState(
  //         {
  //           students: responseJson.data.students
  //         },
  //         () => console.log(this.state.students)
  //       );
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }
  // addData_SQL_from_GG = async student => {
  //   email = student[1];
  //   full_name = student[2];
  //   phone_number = student[3];
  //   address = student[4];
  //   // alert('update now')
  //   var url = `${hostApi}/students_add`;
  //   var data = {
  //     email: email,
  //     full_name: full_name,
  //     phone_number: phone_number,
  //     address: address,
  //     attended: "attended",
  //     createBy: "createBy",
  //     updateBy: "updateBy",
  //     is_delete: false
  //   };

  //   fetch(url, {
  //     method: "POST", // or 'PUT'

  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data) // data can be `string` or {object}!
  //   })
  //     .then(res => res.json())
  //     .then(
  //       // ToastAndroid.show("Đồng bộ thành công!!", ToastAndroid.SHORT),
  //       console.log("add student Success:", JSON.stringify(response))
  //     )
  //     .catch(error => console.error("Error:", error));
  // };


  // loadData_google() {
  //   // ToastAndroid.show("Đang đồng bộ !", ToastAndroid.SHORT);
  //   // alert('Đang đồng bộ!')
  //   this.refs.toast.show('Đang đồng bộ!');
  //   axios
  //     .get(`${hostApi}/gg_read`)

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
  //             this.refs.toast.show('Đồng bộ thành công!');
  //           });
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  componentWillMount() {
    this.loadData_SQL();
    email: this.props.navigation.state.params.email;
  }

  checkDiemDanh = string_code => {
    var student_object = JSON.parse(string_code) // chuyen lại thành object
    console.log(student_object)





    var ton_tai = false;
    var id_tontai = "";
    this.state.students.map(that_student => {
      var prepare_scan_code = {
        email: that_student.email,
        phone_number: that_student.phone_number,
        full_name: that_student.full_name,
      }
      if (that_student.email === student_object.email) {
        ton_tai = true;
        id_tontai = that_student.id;
        mail_trung = that_student.email;
      }
    });
    if (ton_tai == true) {
      this.updateData_SQL1(id_tontai);

    } else {
      ////////////////////////////////////////////////////////////////////////////////////////////
      Alert.alert("Chú ý!", ` Can't find this student have email ${student_object.email}  `, [
        { text: "Add this student", onPress: () => { this.addData_SQL(student_object) } },
        { text: 'Cancel', onPress: () => console.log('CANCEL') }
      ], { cancelable: true });
    }
  };

  addData_SQL = async (student) => {
    alert('update now')
    var url = `${hostApi}/students_add`;
    var data = {
      email: student.email,
      full_name: student.full_name,
      phone_number: student.phone_number,
      address: "address",
      attended: "false",
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

  // openLink_in_browser = () => {
  //   Linking.openURL(this.state.QR_Code_Value);
  // };

  onQR_Code_Scan_Done = async QR_Code => {
    await this.setState({ QR_Code_Value: QR_Code });
    await this.checkDiemDanh(this.state.QR_Code_Value);
    this.setState({ Start_Scanner: false });
  };

  open_QR_Code_Scanner = () => {
    var that = this;

    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera App Permission",
              message: "Camera App needs access to your camera "
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({ QR_Code_Value: "" });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: "" });
      that.setState({ Start_Scanner: true });
    }
  };
  render() {
    if (!this.state.Start_Scanner) {
      return (
        // <View style={styles.MainContainer}>
        <Container>
          <Header style={{ backgroundColor: "#0086FF" }} androidStatusBarColor="black">

            <Left>
              <Button
                transparent
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
              </Button>
            </Left>
            <Body>
              <Title>QR CODE</Title>
            </Body>
            <Right />
          </Header>
          <Toast ref="toast" />

          {/* ////////////////////////////////////////////////////// */}
          <Content>


            <Text style={styles.QR_text}>
              {this.state.QR_Code_Value
                ? "value: " + this.state.QR_Code_Value
                : ""}
            </Text>

            <TouchableOpacity
              onPress={this.open_QR_Code_Scanner}
              style={styles.button}
            >
              <Text style={{ color: "#FFF", fontSize: 14 }}>
                Click to scan now
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("add_student")}
              style={styles.button}
            >
              <Text style={{ color: "#FFF", fontSize: 14 }}>
                Add student
            </Text>
            </TouchableOpacity>
          </Content>
        </Container>


        // </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Header style={{ backgroundColor: "#0086FF" }} androidStatusBarColor="black">

            <Left>
              <Button
                transparent
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
              </Button>
            </Left>
            <Body>
              <Title>QR CODE</Title>
            </Body>
            <Right />
          </Header>

          <CameraKitCameraScreen
            // actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            showFrame={true}
            scanBarcode={true}
            laserColor={"#FF3D00"}
            frameColor={"#00C853"}
            colorForScannerFrame={"black"}
            onReadCode={event => this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)}
            offsetForScannerFrame={10}   //(default 30) optional, offset from left and right side of the screen
            heightForScannerFrame={300}  //(default 200) optional, change height of the scanner frame
            colorForScannerFrame={'blue'} //(default white) optional, change colot of the scanner frame
            hideControls={true}           //(default false) optional, hide buttons and additional controls on top and bottom of screen

          />
          {/* <CameraKitCameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            scanBarcode={true}
            laserColor={"blue"}
            frameColor={"yellow"}

            onReadQRCode={((event) => this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue))} //optional
            hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
            showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            offsetForScannerFrame={10}   //(default 30) optional, offset from left and right side of the screen
            heightForScannerFrame={300}  //(default 200) optional, change height of the scanner frame
            colorForScannerFrame={'red'} //(default white) optional, change colot of the scanner frame
          /> */}
        </Container>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center"
  },
  QR_text: {
    color: "#000",
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    marginHorizontal: '9%',
    backgroundColor: "#2979FF",
    alignItems: "center",
    padding: 12,
    width: 300,
    marginTop: 14
  }
});
