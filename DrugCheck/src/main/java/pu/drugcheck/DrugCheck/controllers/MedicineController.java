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
	
	@CrossOrigin
	@GetMapping("/medicine/search/{medicineName}")
	@ResponseBody
	public List<MedicineModel> getSearchMedicines(@PathVariable("medicineName") String medicineName){
		List<MedicineModel> medicines = this.medicineService.searchMedicines(medicineName);
		return medicines;
	}
	
	@CrossOrigin
	@GetMapping("/medicine/search")
	@ResponseBody
	public List<MedicineModel> getMedicinesWithoutParam(){
		List<MedicineModel> medicines = this.medicineService.getAllMedicines();
		return medicines;
	}
	
	@CrossOrigin
	@GetMapping("/medicine/check/{firstId}/{secondId}")
	@ResponseBody
	public boolean checkMedicinesInteraction(@PathVariable("firstId") int firstId, @PathVariable("secondId") int secondId){
		boolean interaction = this.medicineService.checkInteraction(firstId, secondId);
		return interaction;
	}
	
	@CrossOrigin
	@PostMapping("/medicine/create")
    public boolean createMedicine(@RequestBody MedicineModel medicine) {
        this.medicineService.createMedicine(medicine);
        return true;
    }
	
	@CrossOrigin
	@PutMapping("/medicine/update")
    public boolean updateMedicine(@RequestBody MedicineModel medicine) {
        this.medicineService.editMedicine(medicine);
        return true;
    }
	
	@CrossOrigin
	@DeleteMapping("/medicine/delete/{medicineId}")
    public boolean deleteMedicine(@PathVariable("medicineId") int medicineId) {
        this.medicineService.deleteMedicine(medicineId);
        return true;
    }
}