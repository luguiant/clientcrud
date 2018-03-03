import * as types from '../const/constClient';
import initialState from './initialState';

export default function clientSet(state = initialState.clients, action) {
      
        switch (action.type) {
            case types.LOAD_CLIENT_SUCCESS:
                   return action.client;
            
            default:
                return state;
        }
}

