import * as Constants from '../common/constants';
import axios from 'axios';

class ActiveIngredientService {
    axiosInstance = axios.create({
        baseURL: `${Constants.apiUrl}/`,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Pragma: 'no-cache'
        }
    });

    getActiveIngredients() {
        return this.axiosInstance({
            url: `activeIngredients/all`,
            method: "get"
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }
}

export default ActiveIngredientService;