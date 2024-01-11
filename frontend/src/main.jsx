import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';
import App from './App';
import ThemeProvider from './utils/ThemeContext';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* Added this to be able to pass the state */}
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Auth0Provider
              domain="dev-s1dabck5lxg8hs05.us.auth0.com"
              clientId="RSKYsKoSGu1Rv8vvnBbb4IRgyI2mL4G0"
              authorizationParams={{
                redirect_uri: window.location.origin,
              }}
            >
              <App />
            </Auth0Provider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
);
