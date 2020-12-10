package pu.drugcheck.DrugCheck.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pu.drugcheck.DrugCheck.models.MedicineModel;
import pu.drugcheck.DrugCheck.services.medicine.MedicineService;

@RestController
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

	@CrossOrigin
	@GetMapping(value = "/medicine/all", produces = "application/json")
	@ResponseBody
	public List<MedicineModel> getAllMedicines(){
		List<MedicineModel> medicines = this.medicineService.getAllMedicines();
		return medicines;
	}
}