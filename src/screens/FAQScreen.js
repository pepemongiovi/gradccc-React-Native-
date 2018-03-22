import React from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import { NavigationActions } from 'react-navigation';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ListaDePerguntas from '../components/ListaDePerguntas';


const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'column',
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        fontSize: 14
    },
    textarea: {
        marginTop: 20,
        height: 100,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 20
    },
    textStyle: {
        fontSize: 18,
        width: 300
      }
});

class FAQScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    goToHome(){
        const {navigate} = this.props.navigation;
        navigate('Home');
    }
    
    constructor(props) {
        super(props);
        this.state = {text: ''};
      }
    
    render() {
        return (
            <View style={styles.container}>
                <Header headerText="FAQ"  backFunction = {() => this.goToHome()}
                        navigation={ this.props.navigation }/>
                <View style={styles.content}>
                    <Text style = {styles.textStyle}> 
                    Acesse as perguntas frequentes e tire suas dúvidas sobre o 
                    Novo Curso de Ciência da Computação da UFCG
                     </Text>
                     <ListaDePerguntas />
                </View>
                <Footer  navigation={ this.props.navigation }/>
            </View> 
        );
    }
}

export default FAQScreen;