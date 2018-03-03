import * as types from '../const/constRegister';
import initialState from './initialState';

export default function registerSet(state = initialState.regist, action) {
        console.log('register',action);
        switch (action.type) {
            case types.LOAD_REGIST_SUCCESS:
                   return action.regist;
            
            default:
                return state;
        }
}