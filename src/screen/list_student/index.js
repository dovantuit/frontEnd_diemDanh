import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, ScrollView, TextInput, RefreshControl, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import callApi from '../../api/helper';
import querystring from 'querystring';
import { nameOfMovieReducers, nameOfLoadingReducers } from '../../reducers';
import { studentActions } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const endPoint = '/cnm';

class list_student extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>




            </View>
        );
    }
}

// đây là phần container của Redux-sagas 
const mapStateToProps = (state, ownProps) => {
    return {
        ...state[nameOfMovieReducers],
        ...state[nameOfLoadingReducers][studentActions.FETCH_STUDENT],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({ ...studentActions }, dispatch)
    }
}
// có 2 cách viết connect default
// const list_student = connect(mapStateToProps,mapDispatchToProps)(list_student);
// export default list_student;

export default connect(mapStateToProps, mapDispatchToProps)(list_student);