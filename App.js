import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import codeGenerateScreen from './src/component/screens/codeGenerateScreen/codeGenerateScreen';
import scanQRScreen from './src/component/screens/scanQRScreen/scanQRScreen';



console.disableYellowBox = true;

export default createAppContainer(createSwitchNavigator(
  {
    codeGenerateScreen: codeGenerateScreen,
    scanQRScreen: scanQRScreen,
   

  },
  {
    initialRouteName: 'scanQRScreen',
    // initialRouteName: 'login_redux_form',

  }
));