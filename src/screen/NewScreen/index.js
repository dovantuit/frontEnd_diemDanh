import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import NavigationService from '../../navigation/NavigationService';

class NewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>NewScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    width: 100,
    height: 150,
    backgroundColor: 'pink'
  },
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default NewScreen;