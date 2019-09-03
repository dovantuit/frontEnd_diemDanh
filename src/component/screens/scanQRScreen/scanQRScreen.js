import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  PermissionsAndroid
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
  Icon
} from "native-base";
import axios from "axios";
const hostApi = `http://10.0.5.180:3000`;

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
    this.loadData_SQL();
    email: this.props.navigation.state.params.email;
  }

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

  openLink_in_browser = () => {
    Linking.openURL(this.state.QR_Code_Value);
  };

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
        <View style={styles.MainContainer}>
          <Text style={{ fontSize: 22, textAlign: "center" }}>
            Check QR code của bạn ở đây
          </Text>

          <Text style={styles.QR_text}>
            {this.state.QR_Code_Value
              ? "Scanned QR Code: " + this.state.QR_Code_Value
              : ""}
          </Text>

          {this.state.QR_Code_Value.includes("http") ? (
            <TouchableOpacity
              onPress={this.openLink_in_browser}
              style={styles.button}
            >
              <Text style={{ color: "#FFF", fontSize: 14 }}>
                Open Link in default Browser
              </Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}
          >
            <Text style={{ color: "#FFF", fontSize: 14 }}>
              Click to scan now
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Header>
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
              <Title>QR CODE SCAN</Title>
            </Body>
            <Right />
          </Header>

          <CameraKitCameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={"#FF3D00"}
            frameColor={"#00C853"}
            colorForScannerFrame={"black"}
            onReadCode={event =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            }
          />
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
    backgroundColor: "#2979FF",
    alignItems: "center",
    padding: 12,
    width: 300,
    marginTop: 14
  }
});
