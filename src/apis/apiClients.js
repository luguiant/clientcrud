import axios from 'axios';
import * as constSystm from '../components/const/systemConst';

class ClientsApi{
    async newcCLient(sName,iPhone,iDni,sAddress,sToken){
        return await axios.post(
            constSystm.SYSTEM_API_CLIENT_URL,
            {
                name: sName,
                phone: iPhone,
                dni:iDni,
                address:sAddress,
                token:sToken
            }
        ).then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default ClientsApi;

