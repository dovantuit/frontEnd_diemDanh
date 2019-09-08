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
import sync_list from "./src/component/screens/sync_list/sync_list";
import profile from "./src/component/screens/profile/profile";
import add_student from "./src/component/screens/add_student/add_student";


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
      menu: menu,
      sync_list: sync_list,
      profile: profile,
      add_student: add_student
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
