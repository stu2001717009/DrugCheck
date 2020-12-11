import { ActiveIngredientModel } from './activeIngredientModel';

export class MedicineModel {
    public id: number;
    public name: string;
    public tabletsPackage: string;
    public activeIngredient: ActiveIngredientModel;
}