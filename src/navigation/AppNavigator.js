import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from '../../src/screen/LoginScreen';
import NewScreen from '../../src/screen/NewScreen';
import DetailMovieScreen from '../../src/screen/DetailMovieScreen';

export default createSwitchNavigator(
  {
    Login: LoginScreen,
    New: NewScreen,
    DetailMovie: DetailMovieScreen,

  }, {
    initialRouteName: 'Login'
  }
);