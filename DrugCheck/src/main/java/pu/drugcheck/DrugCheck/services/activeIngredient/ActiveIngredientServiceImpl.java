package pu.drugcheck.DrugCheck.services.activeIngredient;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pu.drugcheck.DrugCheck.beans.ActiveIngredientBean;
import pu.drugcheck.DrugCheck.beans.ActiveIngredientInteractionBean;
import pu.drugcheck.DrugCheck.models.ActiveIngredientModel;
import pu.drugcheck.DrugCheck.repos.ActiveIngredientInteractionRepo;
import pu.drugcheck.DrugCheck.repos.ActiveIngredientRepo;

import java.util.ArrayList;
import java.util.List;


@Service
public class ActiveIngredientServiceImpl implements ActiveIngredientService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ActiveIngredientRepo activeIngredientRepository;
    
    @Autowired
    private ActiveIngredientInteractionRepo activeIngredientInteractionRepository;


    @Override
    public List<ActiveIngredientModel> getAllActiveIngredients() {

        List<ActiveIngredientModel> aIngredientsModels = new ArrayList<>();

        List<ActiveIngredientBean> aIngredients = this.activeIngredientRepository.findAll();
        for (ActiveIngredientBean aIngredient : aIngredients) {
        	aIngredientsModels.add(this.modelMapper.map(aIngredient, ActiveIngredientModel.class));
        }

        return aIngredientsModels;
    }
    
    @Override
    public List<ActiveIngredientModel> getAllActiveIngredientsWithInteraction() {

        List<ActiveIngredientModel> aIngredientsModels = new ArrayList<>();

        List<ActiveIngredientBean> aIngredients = this.activeIngredientRepository.findAll();
        for (ActiveIngredientBean aIngredient : aIngredients) {
        	aIngredientsModels.add(this.modelMapper.map(aIngredient, ActiveIngredientModel.class));
        }
        
        for(ActiveIngredientModel aIngredient : aIngredientsModels) {
        	List<Integer> interactions = new ArrayList<>();
        	List<Integer> firstI = this.activeIngredientInteractionRepository.getFirstIngredients(aIngredient.getId());
        	List<Integer> secondI = this.activeIngredientInteractionRepository.getSecondIngredients(aIngredient.getId());
        	interactions.addAll(firstI);
        	interactions.addAll(secondI);
        	aIngredient.setInteractions(interactions);
        }
        
        return aIngredientsModels;
    }

    @Override
    public void createActiveIngredient(ActiveIngredientModel aIngredient) {
    	ActiveIngredientBean activeIngredient = new ActiveIngredientBean();
    	activeIngredient.setName(aIngredient.getName());
    	this.activeIngredientRepository.save(activeIngredient);
    	this.createInteractions(aIngredient, activeIngredient);	
    }
    
    public void deleteActiveIngredient(int activeIngredientId) {
    	this.deleteInteractions(activeIngredientId);    	
    	this.activeIngredientRepository.deleteById(activeIngredientId);
    }
    
    public  void editActiveIngredients(ActiveIngredientModel aIngredient) {
    	this.deleteInteractions(aIngredient.getId());
    	ActiveIngredientBean activeIngredient = this.activeIngredientRepository.findOneById(aIngredient.getId());
    	activeIngredient.setName(aIngredient.getName());
    	this.createInteractions(aIngredient, activeIngredient);
    }
    
    private void createInteractions(ActiveIngredientModel aIngredientModel, ActiveIngredientBean aIngredientBean) {
    	List<Integer> interactionIds = aIngredientModel.getInteractions();
    	for(Integer interactionId : interactionIds) {
    		ActiveIngredientBean interaction = this.activeIngredientRepository.findOneById(interactionId);
    		ActiveIngredientInteractionBean intBean = new ActiveIngredientInteractionBean();
    		intBean.setFirstActiveIngredient(aIngredientBean);
    		intBean.setSecondActiveIngredient(interaction);
    		this.activeIngredientInteractionRepository.save(intBean);
    	}
    }
    
    private void deleteInteractions(int activeIngredientId) {
    	List<Integer> interactionIds = this.activeIngredientInteractionRepository.getIdByInteractions(activeIngredientId);
    	for(Integer interactionId : interactionIds) {
    		this.activeIngredientInteractionRepository.deleteById(interactionId);
    	}
    }
}