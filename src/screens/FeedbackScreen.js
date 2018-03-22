import React from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import { NavigationActions } from 'react-navigation';
import Header from '../components/Header';
import Button from '../components/Button';
import RadioButton from 'radio-button-react-native';
import email from 'react-native-email'

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

class FeedbackScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    goToHome(){
        const {navigate} = this.props.navigation;
        navigate('Home');
    }
    
    constructor(props) {
        super(props);
        this.state = {text: '', feedback: 'suportegradccc@gmail.com'};
      }
    handleOnPress(value){
        this.setState({feedback:value})
    }
    _onPressSendButton() { 
        if(this.state.text == ''){
            Alert.alert('Por favor, digite algum texto.')
        }else{
            this.handleEmail();
            Alert.alert('Obrigado pelo seu feedback!')
            this.goToHome();
        }

      }
    handleEmail(){
        const to = [this.state.feedback] // string or array of email addresses
        email(to, {
            subject: 'GradCCC FeedBack',
            body: this.state.text
        }).catch(console.error)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header headerText="Feedback" backFunction = {() => this.goToHome()}
                        navigation={ this.props.navigation }/>
                <View style={styles.content}>
                    <Text style = {styles.textStyle}> 
                    O aplicativo GradCCC foi elaborado para auxiliar os alunos
                     do curso de Ciência da Computação da UFCG
                     na migração para a nova grade curricular. 
                     O seu feedback é muito importante pra nós. 
                     Entre em contato conosco através do campo abaixo indicando melhorias ou fazendo críticas.
                     </Text>
                    <TextInput
                        placeholder = "Escreva aqui seu comentário."
                        style = {styles.textarea}
                        multiline = {true}
                        autoGrow = {true}
                        editable = {true}
                        blurOnSubmit={true}
                        maxLength = {2000}
                        underlineColorAndroid= 'rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({text})}
                    />
                    <Button onPress={() => {this._onPressSendButton()}}>
                        Enviar
                    </Button>
                </View>
            </View> 
        );
    }
}

export default FeedbackScreen;