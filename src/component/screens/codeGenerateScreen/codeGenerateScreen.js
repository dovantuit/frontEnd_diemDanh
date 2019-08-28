// 'use strict';
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput, Text
} from 'react-native';

export default class codeGenerateScreen extends Component {

    state = {
        text: 'http://facebook.github.io/react-native/',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Input here plz:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ text: text })}
                    value={this.state.text}
                />
                <QRCode
                    value={this.state.text.toString()}
                    size={200}
                    bgColor='black'
                    fgColor='white' />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
