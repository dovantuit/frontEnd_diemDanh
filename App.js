import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import codeGenerateScreen from './src/component/screens/codeGenerateScreen/codeGenerateScreen';
import scanQRScreen from './src/component/screens/scanQRScreen/scanQRScreen';
import login from './src/component/screens/login/login';
import sign_up from './src/component/screens/sign_up/sign_up';


console.disableYellowBox = true;

export default createAppContainer(createSwitchNavigator(
  {
    codeGenerateScreen: codeGenerateScreen,
    scanQRScreen: scanQRScreen,
    login: login,
    sign_up:sign_up,


  },
  {
    initialRouteName: 'sign_up',
    // initialRouteName: 'login_redux_form',

  }
));