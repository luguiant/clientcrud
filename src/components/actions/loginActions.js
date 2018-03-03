import * as types from '../const/constLogin';
import loginApi from '../../apis/apiLogin';
import openNotificationWithIcon from '../alertsandnotifications/notifications';

export function loadLoginSuccess(login){
    return {type: types.LOAD_LOGIN_SUCCESS,login}
}

export function defaultAction(login){
    return {type: types.LOAD_RESET_LOGIN,login}
}

export function LoginAuth(sEmail,sPassword){
    return function (dispatch) {
        var oLoginApi = new loginApi();
        var mLogin = oLoginApi.Login(sEmail,sPassword);

        return mLogin.then(response => {
             console.log('response',response);   
              if(response.data){
                  if(response.data.status === 'true'){
                      dispatch(loadLoginSuccess(response));
                      localStorage.setItem('token',response.data.token);
                      openNotificationWithIcon('success','Exito','Login con extio!!');
                      
                  }else{
                      openNotificationWithIcon('error','Error','Error al loguear');
                  }
              }   
              
        }).catch(error => {
            throw(error);
        });
    };
}

export function signOutAction(){
    localStorage.clear();
}

export function storeToken(sEmail,sPassword,sSecret,iClient){
    return function (dispatch){
        var oLoginApi = new loginApi();
        var mLogin = oLoginApi.getToken(sEmail,sPassword,sSecret,iClient);
        return mLogin.then(response => {
           if(response.data){
               if(response.data.access_token){
                   localStorage.setItem('token',response.data.access_token);
                   if(localStorage.getItem("token")){
                       openNotificationWithIcon('success','Login con exito','Felicidades te has logueado storeToken');
                   }
               }
           }
        }).catch(error => {
            throw(error);
        });
    }
}

