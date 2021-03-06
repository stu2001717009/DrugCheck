package pu.drugcheck.DrugCheck.services.activeIngredient;

import java.util.List;

import pu.drugcheck.DrugCheck.models.ActiveIngredientModel;

public interface ActiveIngredientService {

   List<ActiveIngredientModel> getAllActiveIngredients();
   List<ActiveIngredientModel> getAllActiveIngredientsWithInteraction();
   void createActiveIngredient(ActiveIngredientModel aIngredient);
   void deleteActiveIngredient(int activeIngredientId);
   void editActiveIngredients(ActiveIngredientModel aIngredient);
}