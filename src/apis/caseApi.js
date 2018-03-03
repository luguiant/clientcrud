import axios from 'axios';
import * as CONST from '../components/const/systemConst';

class CaseApi {
  newCaseApi(sDescripcion,iNumero_caso,iCliente_id,iAsesor_id) {
    return axios.post(
      CONST.SYSTEM_API_CASE_URL,
           {
                descripcion: sDescripcion,
                numero_caso: iNumero_caso,
                cliente_id: iCliente_id,
                asesor_id:iAsesor_id
            }
      
    );
  }
}

export default CaseApi;


