import * as types from '../const/constRegister';
import registerApi from '../../apis/apiRegister';
import openNotificationWithIcon from '../alertsandnotifications/notifications';


export function loadRegistSuccess(regist){
    console.log('action',regist);
    return {type: types.LOAD_REGIST_SUCCESS,regist}
}


export function newRegist(email,password,name,dni,address,phone){
    return function (dispatch) {
        var oRegisterApi = new registerApi();
        var mRegister = oRegisterApi.getPostRegister(
            email,
            password,
            name,
            dni,
            address,
            phone);

        return mRegister.then(response => {
            console.log('registerr',response);
            if(response.status){
                
                if(response.status === 'error'){
                    console.log('entro');
                    response.msnarray.map(error => 
                        openNotificationWithIcon('error','Error al registrar',error)  
                    ); 
                      
                }else if(response.status === 'success'){
                    dispatch(loadRegistSuccess(response));
                }
            }
        }).catch(error => {
            throw(error);
        });
    };
}
