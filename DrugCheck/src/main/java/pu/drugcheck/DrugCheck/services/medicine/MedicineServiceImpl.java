package pu.drugcheck.DrugCheck.services.medicine;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pu.drugcheck.DrugCheck.beans.ActiveIngredientBean;
import pu.drugcheck.DrugCheck.beans.MedicineBean;
import pu.drugcheck.DrugCheck.models.MedicineModel;
import pu.drugcheck.DrugCheck.repos.ActiveIngredientInteractionRepo;
import pu.drugcheck.DrugCheck.repos.MedicineRepo;

import java.util.ArrayList;
import java.util.List;


@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MedicineRepo medicineRepository;
    
    @Autowired
    private ActiveIngredientInteractionRepo activeIngredientInteractionRepository;

    public List<MedicineModel> getAllMedicines() {

        List<MedicineModel> medicineModels = new ArrayList<>();

        List<MedicineBean> medicines = this.medicineRepository.findAll();
        for (MedicineBean medicine : medicines) {
        	medicineModels.add(this.modelMapper.map(medicine, MedicineModel.class));
        }

        return medicineModels;
    }
    
    public List<MedicineModel> searchMedicines(String medicineName){
    	List<MedicineModel> medicineModels = new ArrayList<>();

    	 List<MedicineBean> medicines = this.medicineRepository.findByNameIgnoreCaseContaining(medicineName);
         for (MedicineBean medicine : medicines) {
         	medicineModels.add(this.modelMapper.map(medicine, MedicineModel.class));
         }
    	return medicineModels;
    }
    
    public boolean checkInteraction(int firstId, int secondId) {
    	MedicineBean firstMed = this.medicineRepository.findOneById(firstId);
    	MedicineBean secondMed = this.medicineRepository.findOneById(secondId);
    	if(firstMed.getActiveIngredient().getId() == secondMed.getActiveIngredient().getId())
    		return false;
    		
    	Integer interactionId = this.activeIngredientInteractionRepository.checkInteraction(firstMed.getActiveIngredient().getId(), secondMed.getActiveIngredient().getId());
    	return interactionId != null && interactionId > 0 ? true : false;
    }

    public void createMedicine(MedicineModel med) {
    	MedicineBean medicine = this.modelMapper.map(med, MedicineBean.class);
    	this.medicineRepository.save(medicine);
    }
    
    public void editMedicine(MedicineModel med) {
    	MedicineBean medicine = this.medicineRepository.findOneById(med.getId());
    	medicine.setName(med.getName());
    	medicine.setTabletsPackage(med.getTabletsPackage());
    	medicine.setActiveIngredient(this.modelMapper.map(med.getActiveIngredient(), ActiveIngredientBean.class));
    	this.medicineRepository.saveAndFlush(medicine);
    }
    
    public void deleteMedicine(int medicineId) {
    	MedicineBean medicine =this.medicineRepository.findOneById(medicineId);
    	this.medicineRepository.deleteById(medicine.getId());
    }
}