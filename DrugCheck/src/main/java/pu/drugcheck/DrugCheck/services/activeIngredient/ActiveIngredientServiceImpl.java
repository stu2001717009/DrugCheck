package pu.drugcheck.DrugCheck.services.activeIngredient;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pu.drugcheck.DrugCheck.beans.ActiveIngredientBean;
import pu.drugcheck.DrugCheck.models.ActiveIngredientModel;
import pu.drugcheck.DrugCheck.repos.ActiveIngredientRepo;

import java.util.ArrayList;
import java.util.List;


@Service
public class ActiveIngredientServiceImpl implements ActiveIngredientService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ActiveIngredientRepo activeIngredientRepository;

    @Override
    public List<ActiveIngredientModel> getAllActiveIngredients() {

        List<ActiveIngredientModel> aIngredientsModels = new ArrayList<>();

        List<ActiveIngredientBean> aIngredients = this.activeIngredientRepository.findAll();
        for (ActiveIngredientBean aIngredient : aIngredients) {
        	aIngredientsModels.add(this.modelMapper.map(aIngredient, ActiveIngredientModel.class));
        }

        return aIngredientsModels;
    }

}