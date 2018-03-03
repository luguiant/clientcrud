import * as types from '../const/constClient';
import ClientsApi from '../../apis/apiClients';
import openNotificationWithIcon from '../alertsandnotifications/notifications';

export function loadClientSuccess(client){
    return {type: types.LOAD_CLIENT_SUCCESS,client}
}

export function newClient(sName,iPhone,iDni,sAddress,sToken){
    return function (dispatch) {
        var oClientApi = new ClientsApi();
        var mLogin = oClientApi.newcCLient(sName,iPhone,iDni,sAddress,sToken);

        return mLogin.then(response => {
             console.log('response',response);   
              if(response.data){
                  if(response.data.status === 'success'){
                      dispatch(loadClientSuccess(response));
                      console.log('success',response.data);
                      openNotificationWithIcon('success','Exito','Cliente registrado con exito!!');
                      
                  }else if(response.data.status === 'error'){
                     if(response.data.msnarray){
                         console.log('error data',response.data.msnarray);
                          response.data.msnarray.map(error => 
                            openNotificationWithIcon('error','Error al registrar',error)  
                          );
                     }
                      
                    /*  response.data.msnarray.map(error => 
                        openNotificationWithIcon('error','Error al registrar',error)  
                      ); */
                
                  }
              }   
              
        }).catch(error => {
            throw(error);
        });
    };
}

