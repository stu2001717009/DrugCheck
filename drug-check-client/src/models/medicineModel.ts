import { ActiveIngredientModel } from './activeIngredientModel';

export class MedicineModel {
    public id: number;
    public name: string;
    public shortDescription: string;
    public activeIngredient: ActiveIngredientModel;
}