import {combineReducers} from 'redux';
import loginSet from './loginReducer';
import registerSet from './registerReducer';
import clientSet from './clientReducer';

const rootReducer = combineReducers({
    loginSet,
    registerSet,
    clientSet
});

export default rootReducer;
