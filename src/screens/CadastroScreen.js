import React from "react";
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationActions } from 'react-navigation';
import CadastroForm from '../components/CadastroForm';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'column',
        flex: 1
    },
    screenContent: {
      flex: 1
    }
});

class CadastroScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  goToLogin(){
    const {navigate} = this.props.navigation;

    Alert.alert('Conta criada com sucesso!',
                'Você será redirecionado para a página de login.',
                [{text: 'Ok', onPress: () => navigate('Login')}],
                { cancelable: false }
    );
  };

  redirecionarAposSucesso(){
    if(this.props.cadastro.user!=null){
      this.props.cadastro.user = null;
      this.goToLogin();
    }
  };

  goToLogin(){
    const {navigate} = this.props.navigation;
    navigate('Login');
  };

  render() {
    return (
        <View style={styles.container}>
            <Header headerText="Cadastro" backFunction = {() => this.goToLogin()}
                    navigation={ this.props.navigation }/>
            <CadastroForm />
            {this.redirecionarAposSucesso()}
            <Footer  navigation={ this.props.navigation }/>
        </View>
    );
  };
};

const mapStateToProps = state => {
  return { cadastro: state.cadastro }
}

export default connect(mapStateToProps)(CadastroScreen);
