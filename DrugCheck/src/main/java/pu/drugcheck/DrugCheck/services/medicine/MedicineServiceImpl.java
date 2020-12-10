package pu.drugcheck.DrugCheck.services.medicine;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pu.drugcheck.DrugCheck.beans.MedicineBean;
import pu.drugcheck.DrugCheck.models.MedicineModel;
import pu.drugcheck.DrugCheck.repos.MedicineRepo;

import java.util.ArrayList;
import java.util.List;


@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MedicineRepo medicineRepository;

    @Override
    public List<MedicineModel> getAllMedicines() {

        List<MedicineModel> medicineModels = new ArrayList<>();

        List<MedicineBean> medicines = this.medicineRepository.findAll();
        for (MedicineBean medicine : medicines) {
        	medicineModels.add(this.modelMapper.map(medicine, MedicineModel.class));
        }

        return medicineModels;
    }

}