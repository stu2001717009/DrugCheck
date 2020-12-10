package pu.drugcheck.DrugCheck.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pu.drugcheck.DrugCheck.models.ActiveIngredientModel;
import pu.drugcheck.DrugCheck.services.activeIngredient.ActiveIngredientService;

@RestController
public class ActiveIngredientController {

    @Autowired
    private ActiveIngredientService activeIService;

	@CrossOrigin
	@GetMapping(value = "/activeIngredients/all", produces = "application/json")
	@ResponseBody
	public List<ActiveIngredientModel> getAllMedicines(){
		List<ActiveIngredientModel> medicines = this.activeIService.getAllActiveIngredients();
		return medicines;
	}
}