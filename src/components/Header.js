import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { logoutUser } from '../actions';
import { connect } from 'react-redux';

class Header extends React.Component {

    goToLogin() {
        const {navigate} = this.props.navigation;
        navigate('Login');
    }

    logout(){
        this.props.logoutUser();
        const {navigate} = this.props.navigation;
        navigate('Home');
    }

    renderLoginButton(){
        if(this.props.auth.user==null){
            return(
                <TouchableOpacity onPress={() => this.goToLogin()}>
                    <Text style={styles.textStyle}> Login </Text>
                </TouchableOpacity>
            );
        }
        else{
            return (
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text style={styles.textStyle}> Logout </Text>
                </TouchableOpacity>
            );
        }
    }

    renderBackButton(){
        if(this.props.backFunction){
            return (
                    <TouchableOpacity onPress={this.props.backFunction}>
                        <Text style={styles.textStyle}> Back </Text>
                    </TouchableOpacity>
            );
        }
    }

    render(){
        return(
            <View style={styles.headerStyle}>
                <View style={styles.backButtonStyle}>
                    {this.renderBackButton()}
                </View>
                <View style={styles.headerTitleStyle}>
                    <Text style={styles.headerTitleTextStyle}>{this.props.headerText}</Text>
                </View>
                <View style={styles.loginButtonStyle}>
                    {this.renderLoginButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backButtonStyle: {
        flex:1,
        alignItems: 'flex-start',
        marginLeft: 5
    },
    loginButtonStyle: {
        flex:1,
        alignItems: 'flex-end',
        marginRight: 5
    },
    headerTitleStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerStyle: {
        backgroundColor: '#069',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        height:60,
        elevation: 1,
        position: 'relative'
    },
    headerTitleTextStyle: {
        fontSize: 20,
        color: '#fff'
    },
    textStyle: {
        fontSize: 16,
        color: '#fff'
    }
})


const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, { logoutUser })(Header);
