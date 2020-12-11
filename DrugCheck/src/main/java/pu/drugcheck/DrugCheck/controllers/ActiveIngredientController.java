package pu.drugcheck.DrugCheck.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<ActiveIngredientModel> getAllActiveIngredients(){
		List<ActiveIngredientModel> aIngredients = this.activeIService.getAllActiveIngredients();
		return aIngredients;
	}
	
	@CrossOrigin
	@GetMapping(value = "/activeIngredients/allWithInteraction", produces = "application/json")
	@ResponseBody
	public List<ActiveIngredientModel> getAllActiveIngredientsWithInteraction(){
		List<ActiveIngredientModel> aIngredients = this.activeIService.getAllActiveIngredientsWithInteraction();
		return aIngredients;
	}
	
	@CrossOrigin
	@PostMapping("/activeIngredients/create")
    public boolean createActiveIngredient(@RequestBody ActiveIngredientModel aIngredient) {
        this.activeIService.createActiveIngredient(aIngredient);
        return true;
    }
	
	@CrossOrigin
	@PutMapping("/activeIngredients/update")
    public boolean updateActiveIngredients(@RequestBody ActiveIngredientModel aIngredient) {
        this.activeIService.editActiveIngredients(aIngredient);
        return true;
    }
	
	@CrossOrigin
	@DeleteMapping("/activeIngredients/delete/{activeIngredientId}")
    public boolean deleteActiveIngredient(@PathVariable("activeIngredientId") int activeIngredientId) {
        this.activeIService.deleteActiveIngredient(activeIngredientId);
        return true;
    }
}