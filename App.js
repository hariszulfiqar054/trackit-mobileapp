import React from 'react';
import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import {STORE, PERSISTOR} from './src/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
