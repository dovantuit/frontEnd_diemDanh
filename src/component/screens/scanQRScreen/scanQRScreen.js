import { StyleSheet, View, Text, Platform, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';
import React, { Component } from 'react';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
// scan QR code
export default class scanQRScreen extends Component {
    constructor() {

        super();

        this.state = {

            QR_Code_Value: '',

            Start_Scanner: false,
            students: []

        };
    }

    async  loadData_SQL() {

        fetch('http://10.0.5.180:3000/students_read')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    students: responseJson.students,
                }, () => console.log(this.state.students)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async updateData_SQL(id) {
        var url = 'http://10.0.5.180:3000/students_update';
        var data = {
            id: id,
            // email: 'ttttttttttttttt',
            // full_name: 'full_name',
            // phone_number: 'phone_number',
            // address: 'address',
            attended: true,
            // createBy: 'createBy',
            // updateBy: 'updateBy',
            // is_delete: false,
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // data can be `string` or {object}!
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    componentWillMount() {
        this.loadData_SQL()
    }

    checkDiemDanh = (text_code) => {
        this.state.students.map(that_student =>{
            if(that_student.id+that_student.email+that_student.phone_number === text_code){
                this.updateData_SQL(that_student.id)
                alert('đã check in')
            }
            if(that_student.id+that_student.email+that_student.phone_number != text_code){
                // this.updateData_SQL(that_student.id)
                alert('không tìm thấy sinh viên này trong danh sách!')
            }
        })
    }

    openLink_in_browser = () => {

        Linking.openURL(this.state.QR_Code_Value);

    }

    onQR_Code_Scan_Done = (QR_Code) => {

        this.setState({ QR_Code_Value: QR_Code });

        this.setState({ Start_Scanner: false });

        this.checkDiemDanh(this.state.QR_Code_Value)
    }

    open_QR_Code_Scanner = () => {

        var that = this;

        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                            'title': 'Camera App Permission',
                            'message': 'Camera App needs access to your camera '
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                        that.setState({ QR_Code_Value: '' });
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
            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
        }
    }
    render() {
        if (!this.state.Start_Scanner) {

            return (
                <View style={styles.MainContainer}>

                    <Text style={{ fontSize: 22, textAlign: 'center' }}>React Native Scan QR Code Example</Text>

                    <Text style={styles.QR_text}>
                        {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
                    </Text>

                    {this.state.QR_Code_Value.includes("http") ?
                        <TouchableOpacity
                            onPress={this.openLink_in_browser}
                            style={styles.button}>
                            <Text style={{ color: '#FFF', fontSize: 14 }}>Open Link in default Browser</Text>
                        </TouchableOpacity> : null
                    }

                    <TouchableOpacity
                        onPress={this.open_QR_Code_Scanner}
                        style={styles.button}>
                        <Text style={{ color: '#FFF', fontSize: 14 }}>
                            Open QR Scanner
            </Text>
                    </TouchableOpacity>

                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>

                <CameraKitCameraScreen
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={'#FF3D00'}
                    frameColor={'#00C853'}
                    colorForScannerFrame={'black'}
                    onReadCode={event =>
                        this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                    }
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    QR_text: {
        color: '#000',
        fontSize: 19,
        padding: 8,
        marginTop: 12
    },
    button: {
        backgroundColor: '#2979FF',
        alignItems: 'center',
        padding: 12,
        width: 300,
        marginTop: 14
    },
});