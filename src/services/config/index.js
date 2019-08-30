import React, { Component } from 'react';
import { View, Text } from 'react-native';

const hostApi = `http://10.0.5.180:3000`;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View>
        <Text> index </Text>
      </View>
    );
  }
}

export default index;
