import { StackNavigator } from "react-navigation";
import React from 'React';
import HomeScreen from "./../screens/HomeScreen";
import GradeAntigaScreen from "./../screens/GradeAntigaScreen";
import GradeNovaScreen from "./../screens/GradeNovaScreen";
import EstatisticasScreen from "./../screens/EstatisticasScreen";
import FeedbackScreen from "./../screens/FeedbackScreen";
import LoginScreen from "./../screens/LoginScreen";
import FAQScreen from "./../screens/FAQScreen";
import CadastroScreen from './../screens/CadastroScreen';

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GradeAntiga: {
        screen: GradeAntigaScreen,
        navigationOptions: {
          gesturesEnabled: false
        }
    },
    GradeNova: {
        screen: GradeNovaScreen,
        navigationOptions: {
          gesturesEnabled: false
        }
    },
    Estatisticas: {
      screen: EstatisticasScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    FAQ: {
      screen: FAQScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Cadastro: {
      screen: CadastroScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "screen",
    mode: "modal"
  }
);
