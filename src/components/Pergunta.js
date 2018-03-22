import React, { Component } from 'react';
import CardSection from './CardSection.js';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native'; 
import { selecionaPergunta } from '../actions';
import { connect } from 'react-redux';

class Pergunta extends Component{

    componentWillUpdate(){
        LayoutAnimation.spring();
    }

    renderResposta(){
        const {pergunta, expanded} = this.props;
        if(expanded){
            return (
                <CardSection> 
                    <Text style={{ flex: 1 }}>
                        {pergunta.resposta}
                    </Text>
                </CardSection>
            );
        }
    }
    render (){
        const {titleStyle} = styles;
        const { id, questao } = this.props.pergunta;
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selecionaPergunta(id)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}> {questao} </Text>
                    </CardSection>
                    {this.renderResposta()}
                </View>
            </TouchableWithoutFeedback>
            );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = ownProps.pergunta.id === state.selecionado
    return { expanded }
}

export default connect(mapStateToProps, {selecionaPergunta})(Pergunta);