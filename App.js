import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { StyleSheet, Text, View } from 'react-native';
import reducers from './src/reducers';
import firebase from 'firebase';

export default class App extends React.Component {
  componentWillMount() {
      const config = {
        apiKey: "AIzaSyCs2pZSZotszrL4Y3_v5FkhSXHcoysEtG4",
        authDomain: "gradccc.firebaseapp.com",
        databaseURL: "https://gradccc.firebaseio.com",
        projectId: "gradccc",
        storageBucket: "",
        messagingSenderId: "86137536639"
      };

      firebase.initializeApp(config);
      firebase.auth().signOut();
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
