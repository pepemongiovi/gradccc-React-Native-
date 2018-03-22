import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import Cadeira from '../components/Cadeira';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { loadGradeAntiga, toggleCadeira, selecionarTodasAsCadeiras, selecionarTodasAsCadeirasDoPeriodo } from '../actions';

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
      alignSelf: 'stretch',
      height: 55,
      borderWidth: 2, borderColor: '#069',
      backgroundColor: '#B22222',
      borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
    },
    buttonMigrar: {
      padding: 20,
      margin: 10,
      alignItems: 'center',
      alignSelf: 'stretch',
      height: 60,
      borderWidth: 2, borderColor: '#069',
      backgroundColor: '#3CB371',
      borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
    },
    buttonPeriodo: {
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
      fontSize: 16,
      color: '#fff',
      alignSelf: 'center'
    }
});

class GradeAntigaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount(){
    this.props.loadGradeAntiga();
  }

  renderPeriodo(periodo) {
    const cadeiras = this.props.cadeiras[periodo];
    var label = periodo == '*' ? 'Optativas' : periodo + 'º período';
    return (
      <View>
          <TouchableOpacity style={styles.buttonPeriodo} onPress={ () => this.selecionarCadeirasPorPeriodo(periodo) }>
              <Text style={styles.textStyle}>{label}</Text>
          </TouchableOpacity>
          {this.renderDisciplinas(periodo, cadeiras)}
      </View>
    )
  }

  renderDisciplinas(periodo, cadeiras){
    // TODO: Provavelmente corrigir o bind
    return (cadeiras || []).map((cadeira)=>
      (<Cadeira periodo={periodo} cadeira={cadeira} selecionar={this.selecionarCadeira.bind(this)}></Cadeira>)
    );
  }

  selecionarCadeira(periodo, cadeiraId){
    this.props.toggleCadeira(periodo, cadeiraId);
  };

  selecionarTudo() {
    this.props.selecionarTodasAsCadeiras();
  }

  selecionarCadeirasPorPeriodo(periodo) {
    const numeroPeriodo = parseInt(periodo);
    this.props.selecionarTodasAsCadeirasDoPeriodo(numeroPeriodo);
  }

  goToHome(){
    const {navigate} = this.props.navigation;
    navigate('Home');
  }

  irParaGradeNova() {
    const {navigate} = this.props.navigation;
    navigate('GradeNova');
  }

  mostrarSelecionarTudo() {
    if (this.props.loading && !this.props.cadeiras) return <Spinner size="large" />;

    return(
      <TouchableOpacity style={styles.button} onPress={this.selecionarTudo.bind(this)}>
        <Text style={styles.buttonText}>Selecionar todas disciplinas</Text>
      </TouchableOpacity>
    );
  }

  mostrarBotaoMigrar() {
    if (this.props.loading && !this.props.cadeiras) return;
    return(
      <TouchableOpacity style={styles.buttonMigrar} onPress={() => this.irParaGradeNova()}>
          <Text style={styles.buttonText}>Realizar Migração</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Grade antiga" backFunction = {() => this.goToHome()}
                navigation={ this.props.navigation }/>
        <ScrollView>
          <View style={{padding: 10}}>
            {this.mostrarSelecionarTudo()}
            {Object.keys(this.props.cadeiras || {}).map((periodo)=>
              this.renderPeriodo(periodo)
            )}
          </View>
        </ScrollView>
        {this.mostrarBotaoMigrar()}
        <Footer  navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { cadeiras, loading } = state.gradeAntiga;

  return { cadeiras, loading };
};

export default connect(mapStateToProps, {loadGradeAntiga, toggleCadeira, selecionarTodasAsCadeiras, selecionarTodasAsCadeirasDoPeriodo})(GradeAntigaScreen);
