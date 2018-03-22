import React from "react";
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'column',
        flex: 1
    },
    screenContent: {
      flex: 1
    },
    buttonStyle: {
        padding: 20,
        margin: 5,
        height: 65,
        width: undefined,
        alignItems: 'center',
        backgroundColor: '#069',
        borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center'
    }
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  goToCadastro() {
    const {navigate} = this.props.navigation;
    navigate('Cadastro');
  };

  goToHome(){
    const {navigate} = this.props.navigation;
    navigate('Home');
  };

  redirecionarAposSucesso(){
    if(this.props.auth.user!=null){
      this.goToHome();
    }
  };

  render() {
    return (
        <View style={styles.container}>
            <Header headerText="Login" backFunction = {() => this.goToHome()}
                    navigation={ this.props.navigation }/>
            <LoginForm />
            {this.redirecionarAposSucesso()}
            <View style={styles.screenContent}>
                <TouchableOpacity onPress={() => this.goToCadastro()}
                                style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        Não possui conta? Cadastre-se aqui.
                    </Text>
                </TouchableOpacity>
            </View>
            <Footer  navigation={ this.props.navigation }/>
        </View>
    );
  };
};

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(LoginScreen);
