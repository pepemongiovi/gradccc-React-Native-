import React, { Component } from 'react';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';
import Button from './Button';
import Spinner from './Spinner';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component
{
    onEmailChange(text){
        this.props.emailChanged(text);
    };

    onPasswordChange(text){
        this.props.passwordChanged(text);
    };

    onButtonPress(){
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    };

    renderButton(){
        if(this.props.loading){
            return <Spinner />;
        }
        return (
            <Button style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    };

    render()
    {
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@ccc.ufcg.edu.br"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Senha"
                        placeholder="digite sua senha.."
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    };
};

const styles = {
    buttonStyle: {
        flex: 1,
        padding: 20,
        margin: 5,
        height: 65,
        alignItems: 'center',
        backgroundColor: '#069',
        borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;

    return{ email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
