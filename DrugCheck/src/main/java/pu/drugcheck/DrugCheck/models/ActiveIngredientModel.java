package pu.drugcheck.DrugCheck.models;

public class ActiveIngredientModel {
    private int Id;
    private String Name;
    
    public int getId() {
		return Id;
	}

	public void setId(int id) {
		this.Id = id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		this.Name = name;
	}
}