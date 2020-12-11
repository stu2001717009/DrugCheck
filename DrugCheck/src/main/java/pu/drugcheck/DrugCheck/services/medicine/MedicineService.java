package pu.drugcheck.DrugCheck.services.medicine;

import java.util.List;

import pu.drugcheck.DrugCheck.models.MedicineModel;

public interface MedicineService {

   List<MedicineModel> getAllMedicines();
   List<MedicineModel> searchMedicines(String name);
   void createMedicine(MedicineModel med);
   void editMedicine(MedicineModel med);
   void deleteMedicine(int medicineId);
   boolean checkInteraction(int firstId, int secondId);
}