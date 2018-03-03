import axios from 'axios';
import * as CONST from '../components/const/constRegister';

class apiRegister{
    async getPostRegister(email,password,name,dni,address,phone){
        return await axios.post(
            CONST.LOAD_REGIST_URL,
            {
                email:email,
                password:password,
                name:name,
                dni:dni,
                address:address,
                phone:phone
            }
        ).then(function(response) {
            return response.data;
        }).catch(function(error) {
           console.log(error);
        });
}
    
    
}

export default apiRegister;