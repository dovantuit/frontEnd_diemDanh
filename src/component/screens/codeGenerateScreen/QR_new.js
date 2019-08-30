import React, { Component } from 'react'
// import RNFS from "react-native-fs"
import { StyleSheet, ScrollView, View, Button,CameraRoll , ToastAndroid } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const PATH_TO_LOGO = '../../../assets/image/logo.png'


export default class QR_new extends Component {
//     saveQrToDisk() {
//         this.svg.toDataURL((data) => {
//             RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
//               .then((success) => {
//                   return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
//               })
//               .then(() => {
//                   this.setState({ busy: false, imageSaved: true  })
//                   ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
//               })
//         })
//    }
    handlePress = () => {
        this.qrcode.toDataURL(this.callback)
    }
    callback = (dataURL) => {
        console.log(dataURL)
    }
    render() {
        let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.section}>
                    <QRCode
                        value="Just some string value"
                        logo={{ uri: base64Logo }}
                        logoSize={30}
                        logoBackgroundColor='transparent'
                    />
                </View>
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            size={200}
          />
        </View> */}
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            color='blue'
            backgroundColor='yellow'
          />
        </View> */}
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            // logo={require(PATH_TO_LOGO)}
          />
        </View> */}
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            // logo={require(PATH_TO_LOGO)}
            logoSize={50}
          />
        </View> */}
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            // logo={require(PATH_TO_LOGO)}
            logoMargin={10}
          />
        </View> */}
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            // logo={require(PATH_TO_LOGO)}
            logoBorderRadius={15}
          />
        </View> */}
                <View style={styles.section}>
                    <QRCode
                        value='hello world'
                        // logo={require(PATH_TO_LOGO)}
                        size={200}
                        logoBackgroundColor='blue'
                        getRef={(c) => (this.qrcode = c)}
                    />
                    <Button title={'getDataURL'} onPress={this.handlePress} />
                </View>
                <View style={styles.section}>
                    <QRCode
                        value='hello world'
                        // logo={require(PATH_TO_LOGO)}
                        size={200}
                        logoBackgroundColor='blue'
                        getRef={(c) => (this.qrcode = c)}
                    />
                    <Button title={'getDataURL'} onPress={()=>ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)} />
                </View>
                {/* <View style={styles.section}>
          <QRCode
            value='hello world'
            ecl='H'
          />
        </View> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 15,
        paddingBottom: 15
    },
    section: {
        marginTop: 15,
        marginBottom: 15
    }
})


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import { View, Alert, Button } from 'react-native';
// import Mailer from 'react-native-mail';

// export default class QR_new extends Component {

//   handleEmail = () => {
//     Mailer.mail({
//       subject: 'need help',
//       recipients: ['support@example.com'],
//       ccRecipients: ['supportCC@example.com'],
//       bccRecipients: ['supportBCC@example.com'],
//       body: '<b>A Bold Body</b>',
//       isHTML: true,
//       attachment: {
//         path: '',  // The absolute path of the file from which to read data.
//         type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
//         name: '',   // Optional: Custom filename for attachment
//       }
//     }, (error, event) => {
//       Alert.alert(
//         error,
//         event,
//         [
//           {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
//           {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
//         ],
//         { cancelable: true }
//       )
//     });
//   }

//   render() {
//     return (
//       <View style={{flex:1}}>
//         <Button
//           onPress={this.handleEmail}
//           title="Email Me"
//           color="#841584"
//           accessabilityLabel="Purple Email Me Button"
//         />
//       </View>
//     );
//   }
// }
