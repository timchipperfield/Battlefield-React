import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';
// import Game from './game.jsx';

const store = configureStore();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();




ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        )
        registerServiceWorker();
