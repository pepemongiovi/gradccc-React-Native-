import React from "react";
import firebase from 'firebase';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadGradeNova } from '../actions';
import Cadeira from '../components/Cadeira';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import CadeiraNovaGrade from '../components/CadeiraNovaGrade';

const styles = StyleSheet.create({
  container:{
      marginTop: 20,
      flexDirection: 'column',
      flex: 1
  },
  titulo: {
    fontSize: 25,
    color: '#111'
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  button: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    height: 70,
    borderWidth: 2, borderColor: '#069',
    backgroundColor: '#069'
  },
  divPeriodo: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 60,
    borderWidth: 2, borderColor: '#069',
    backgroundColor: '#D3D3D3',
    borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  }
});

class GradeNovaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.loadGradeNova(this.props.idCadeirasSelecionadas);
    const { currentUser } = firebase.auth();

    if(currentUser){
        firebase.database().ref(`/users/${currentUser.uid}/cadeiras_selecionadas`)
            .set(this.props.idCadeirasSelecionadas);
    }
  }

  renderPeriodo(periodo) {
    const cadeiras = this.props.cadeirasGradeNova[periodo];
    return (
      <View>
        <View style={styles.divPeriodo}>
          <Text style={styles.textStyle}>
            {periodo === "*" ? "Optativas" : `${periodo}º período`}
          </Text>
        </View>
        {this.renderDisciplinas(periodo, cadeiras)}
      </View>
    )
  }

  renderDisciplinas(periodo, cadeiras){
    return (cadeiras || []).filter(cadeira => (periodo === "*" && cadeira.selecionada || periodo !== "*"))
                          .map((cadeira) => (<CadeiraNovaGrade periodo={periodo} cadeira={cadeira}></CadeiraNovaGrade>)
    );
  }

  goToGradeAntiga() {
    const {navigate} = this.props.navigation;
    navigate('GradeAntiga');
  }

  goToEstatisticas(){
    const {navigate} = this.props.navigation;
    navigate('Estatisticas');
  }

  mostrarDetalhes() {
    if (this.props.loading && !this.props.cadeirasGradeNova) return <Spinner size="large" />;

    return(
      <TouchableOpacity style={styles.button} onPress={() => this.goToEstatisticas()}>
        <Text style={styles.buttonText}>Detalhes</Text>
      </TouchableOpacity>
    );
  }

  // FIXME: Consertar o cálculo para mostrar o componente novamente
  // {this.mostrarDetalhes()}

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Grade Nova" backFunction = {() => this.goToGradeAntiga()}
                navigation={ this.props.navigation }/>
        <ScrollView>
          <View style={{padding: 10}}>
            {Object.keys(this.props.cadeirasGradeNova || {}).map((periodo)=>
              this.renderPeriodo(periodo)
            )}
          </View>

        </ScrollView>
        <Footer  navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { cadeirasGradeNova, loading } = state.gradeNova;
  const { idCadeirasSelecionadas } = state.gradeAntiga;
  return { cadeirasGradeNova, loading, idCadeirasSelecionadas };
};

export default connect(mapStateToProps, { loadGradeNova })(GradeNovaScreen);
