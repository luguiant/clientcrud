import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import configStore from './components/store/configStore';
import registerServiceWorker from './registerServiceWorker';

const store = configStore();


ReactDOM.render(
    <Provider store={store}><App /></Provider> ,
     document.getElementById('root'));
registerServiceWorker();
