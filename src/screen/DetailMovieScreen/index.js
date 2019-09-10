import React, { Component } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, Button, ImageBackground, StatusBar,
  WebView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationService from '../../navigation/NavigationService';

class DetailMovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imagePosterUrl: 'none',
      releaseDate: '',
      trailer: ''

    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', 'none'),
      imagePosterUrl: navigation.getParam('imagePosterUrl', 'none'),
      releaseDate: navigation.getParam('releaseDate'),
      trailer: navigation.getParam('trailer'),

    });
  }

  render() {
    return (

      <View style={styles.container}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />

        <Image
          style={styles.backgroundImage}
          source={{ uri: `${this.state.imagePosterUrl}` }}
        />
        <Text style={{
          // color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginTop: '-100%',
          marginBottom: 10,
          marginHorizontal: 30,
          // borderColor: 'black', borderWidth: 1
        }}>{this.state.title}</Text>
        <WebView
          style={{ height: 400, width: 350, borderRadius: 15, overflow: 'hidden' }}
          source={{ uri: "https://www.youtube.com/embed/" + this.state.trailer }}

          startInLoadingState={true}
        />
        <Button
          title="BACK"
          color="#841584"
          onPress={() => NavigationService.navigate("Login")}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'lightgray',
  },
  tieude: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    flex: 1,
    width: '90%',
    backgroundColor: 'gray'
  },
  backgroundImage: {
    borderRadius: 16,
    opacity: 0.3,
    marginTop: 30,
    width: '98%',
    height: '98%',
  }
})

export default DetailMovieScreen;
