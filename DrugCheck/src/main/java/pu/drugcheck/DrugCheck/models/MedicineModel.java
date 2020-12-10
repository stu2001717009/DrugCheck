package pu.drugcheck.DrugCheck.models;

public class MedicineModel {
    private int id;
    private String name;
    private String shortDescription;
    private ActiveIngredientModel activeIngredient;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String description) {
		this.shortDescription = description;
	}
	
	public ActiveIngredientModel getActiveIngredient() {
		return activeIngredient;
	}

	public void setActiveIngredient(ActiveIngredientModel ingredient) {
		this.activeIngredient = ingredient;
	}
}