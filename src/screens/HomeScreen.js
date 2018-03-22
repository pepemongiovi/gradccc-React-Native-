import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'column',
        flex: 1
    },
    tile: {
      flex: 0.5,
      backgroundColor: '#069'
    },
    screenContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    messageContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
      fontSize: 14
    }
});
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  goToGradeAntiga() {
    const {navigate} = this.props.navigation;
    navigate('GradeAntiga');
  }

  goToFAQ() {
    const {navigate} = this.props.navigation;
    navigate('FAQ');
  }

  renderInitialMessage(){
      const { user } = this.props.auth;
      const message = "Bem Vindo ao GradCCC" + ( user!=null ?
          ", " + user.displayName : "" ) + "!";
      return (
          <View style={styles.messageContent}>
            <Text style={styles.textStyle}>{message}</Text>
            <Text style={styles.textStyle}>Para começar, clique no botão abaixo.</Text>
          </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="GradCCC" navigation={ this.props.navigation }/>
        <View style={styles.screenContent}>
          <Image
            source={{uri: 'data:image/png;base64,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'}}
            style={{width: 189, height: 40, margin: 10}}
            />
          {this.renderInitialMessage()}
          <Button onPress={() => this.goToGradeAntiga()}>
            Vamos lá!
          </Button>
          <Button onPress={() => this.goToFAQ()}>
            FAQ
          </Button>
        </View>
        <Footer  navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(HomeScreen);

