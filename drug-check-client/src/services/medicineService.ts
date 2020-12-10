import * as Constants from '../common/constants';
import axios from 'axios';

class MedicineService {
    axiosInstance = axios.create({
        baseURL: `${Constants.apiUrl}/`,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Pragma: 'no-cache'
        }
    });

    getMedicines() {
        return this.axiosInstance({
            url: `medicine/all`,
            method: "get"
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }
}

export default MedicineService;