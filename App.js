import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import codeGenerateScreen from "./src/component/screens/codeGenerateScreen/codeGenerateScreen";
import scanQRScreen from "./src/component/screens/scanQRScreen/scanQRScreen";
import login from "./src/component/screens/login/login";
import sign_up from "./src/component/screens/sign_up/sign_up";
import list_student from "./src/component/screens/list_student/list_student";
import login_redux_form from "./src/component/screens/login/login_redux_form";
import menu from "./src/component/screens/menu/menu";

console.disableYellowBox = true;

export default createAppContainer(
  createSwitchNavigator(
    {
      codeGenerateScreen: codeGenerateScreen,
      scanQRScreen: scanQRScreen,
      login: login,
      sign_up: sign_up,
      list_student: list_student,
      login_redux_form: login_redux_form,
      menu: menu
    },
    {
      // initialRouteName: 'sign_up',
      // initialRouteName: 'list_student',
      // initialRouteName: 'codeGenerateScreen',
      // initialRouteName: 'scanQRScreen',
      initialRouteName: "login_redux_form"
    }
  )
);
