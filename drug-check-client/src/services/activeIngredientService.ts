import * as Constants from '../common/constants';
import axios from 'axios';
import { ActiveIngredientModel } from '../models/activeIngredientModel';

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

    getActiveIngredientsWithInteractions() {
        return this.axiosInstance({
            url: `activeIngredients/allWithInteraction`,
            method: "get"
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    updateActiveIngredients(activeI: ActiveIngredientModel) {
        return this.axiosInstance({
            url: `activeIngredients/update`,
            method: "put",
            data: JSON.stringify(activeI)
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    addActiveIngredients(activeI: ActiveIngredientModel) {
        return this.axiosInstance({
            url: `activeIngredients/create`,
            method: "post",
            data: JSON.stringify(activeI)
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    deleteActiveIngredients(activeIngredientsId: number) {
        return this.axiosInstance({
            url: `activeIngredients/delete/${activeIngredientsId}`,
            method: "delete"
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }
}

export default ActiveIngredientService;