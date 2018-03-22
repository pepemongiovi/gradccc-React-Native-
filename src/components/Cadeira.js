import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container:{
        padding: 13,
        margin: 8,
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'transparent',
        borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da',
    },
    containerSelecionado: {
        padding: 13,
        margin: 8,
        flexDirection: 'row',
        height: 80,
        borderRadius: 4, borderWidth: 2, borderColor: '#fff',
        backgroundColor: '#069'
    },
    texto: {
        fontSize: 17
    },
    textoSelecionado: {
        fontSize: 17,
        color: '#fff'
    }
});

class Cadeira extends Component{

    componentWillMount() {
        this.setState({
            selecionado: false
        });
    };

    componentWillReceiveProps(nextProps) {
        const { selecionado } = this.state;
        this.setState({selecionado: nextProps.selecionar});
    }

    selecionou() {
        const { periodo, cadeira } = this.props;
        this.props.selecionar(periodo, cadeira['id_disc']);
    }

    render() {
        return (
        <TouchableOpacity onPress={this.selecionou.bind(this)}>
            <View style={(this.props.cadeira.selecionada) ? styles.containerSelecionado : styles.container}>
                <Text style={(this.props.cadeira.selecionada) ? styles.textoSelecionado : styles.texto}>{this.props.cadeira.nome}</Text>
            </View>
        </TouchableOpacity>);
    };
}

export default Cadeira;