import axios from 'axios';
import * as constSystm from '../components/const/systemConst';

class loginApi{
    async Login(sEmail,sPassword){
        return await axios.post(
            constSystm.SYSTEM_API_LOGIN_URL,
            {
                email: sEmail,
                password: sPassword
            }
        ).then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default loginApi;
