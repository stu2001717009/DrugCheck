import * as Constants from '../common/constants';
import axios from 'axios';
import { MedicineModel } from '../models/medicineModel';

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

    getMedicinesByName(name: string) {
        return this.axiosInstance({
            url: `medicine/search/${name}`,
            method: "get",
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    updateMedicine(med: MedicineModel) {
        return this.axiosInstance({
            url: `medicine/update`,
            method: "put",
            data: JSON.stringify(med)
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    addMedicine(med: MedicineModel) {
        return this.axiosInstance({
            url: `medicine/create`,
            method: "post",
            data: JSON.stringify(med)
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    deleteMedicine(medicineId: number) {
        return this.axiosInstance({
            url: `medicine/delete/${medicineId}`,
            method: "delete"
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }

    checkInteractions(firstId: number, secondId: number) {
        return this.axiosInstance({
            url: `medicine/check/${firstId}/${secondId}`,
            method: "get",
        })
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    }
}

export default MedicineService;