import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Footer = (props) => {
       
      
    const { footerStyle, textStyle } = styles;
   
    return(
        <View style={footerStyle}>
          <TouchableOpacity onPress={ ()=>{
              const {navigation} = props;
             const {navigate} =navigation;
              navigate('Feedback');
              }} >
              <Text style ={textStyle}> Nos dê o seu Feedback </Text>
          </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    footerStyle: {
        backgroundColor: '#069',
        alignItems: 'center',
        flexDirection:'column',
        height: 46,
        elevation: 1,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#fff',
        marginTop: 7,
        borderRadius: 4, borderWidth: 2, borderColor: '#DDDDDD'
    }
})

export default Footer;