import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'row',
        height: 100
    },
    tile: {
      flex: 0.5,
      backgroundColor: '#069'
    }
});
class VisualizaGradeNovaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  goToGradeNova() {
    const { nav, dispatch } = this.props;
    const navigateAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'GradeNova' }),
      ],
    });
    dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tile}>
          <Text>Grade Nova</Text>
        </View>
        <View style={styles.tile}>
          Devem ir as cadeiras selecionadas
        </View>
      </View>
    );
  }
}
export default connect()(VisualizaGradeNovaScreen);