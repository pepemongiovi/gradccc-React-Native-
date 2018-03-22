import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native'; 
import Pergunta from './Pergunta';

class ListaDePerguntas extends Component {
    constructor (props) {
      super(props)

      const ds = new ListView.DataSource({
          rowHasChanged: (arg1, arg2) => arg1 !== arg2
      });

      this.state = {
        dataSource: ds.cloneWithRows(this.props.perguntas)
      }
    }

    renderRow (pergunta) {
        return <Pergunta pergunta={pergunta}/>;
    }
    
    render () {
        return (
          <ListView dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this.props)} />
        );
    }
}

const mapStateToProps = state => ({
  perguntas: state.faq,
  selected: state.selecionado
})

export default connect(mapStateToProps)(ListaDePerguntas);