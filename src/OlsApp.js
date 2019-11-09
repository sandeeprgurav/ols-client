import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import App from './App';

const OlsApp = () =>
  <Provider store={store}>
    <App history={history}/>
  </Provider>;

export default OlsApp;
