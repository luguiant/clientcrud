import * as types from '../const/constLogin';
import initialState from './initialState';

export default function loginSet(state = initialState.login, action) {
    switch (action.type) {
        case types.LOAD_LOGIN_SUCCESS:
            return action.login;

        case types.LOAD_RESET_LOGIN:
            return action.login;

        default:
            return state;
    }
}

