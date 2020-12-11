package pu.drugcheck.DrugCheck.models;
import java.util.List;

public class ActiveIngredientModel {
    private int id;
    private String name;
    private List<Integer> interactions;
    
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
	
	public List<Integer> getInteractions() {
		return interactions;
	}
	
	public void setInteractions(List<Integer> interactions) {
		this.interactions = interactions;
	}
}