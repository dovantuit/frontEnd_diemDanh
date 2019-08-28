// 'use strict';
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput, Text
} from 'react-native';
import { bold } from 'ansi-colors';

export default class codeGenerateScreen extends Component {

    state = {
        text: 'http://facebook.github.io/react-native/',
        text_code: '',
        full_name: ''
    }

    
    componentDidMount() {
        this.setState({
            text_code: this.props.navigation.state.params.text_code,
            full_name: this.props.navigation.state.params.full_name,
        })
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold' }}>{this.state.full_name.toUpperCase()}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ text: text })}
                    value={this.state.text_code}
                />
                <QRCode
                    value={this.state.text_code.toString()}
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
