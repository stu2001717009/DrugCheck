  
package pu.drugcheck.DrugCheck.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Medicine")
public class MedicineBean {

	@Id
	@Column(name="Id")
	@GeneratedValue
	private int id;

	@Column(name = "Name",  nullable = false)
	private String name;
	
	@Column(name = "ShortDescription", nullable = true)
	private String shortDescription;
	
	@OneToOne
	private ActiveIngredientBean activeIngredient;

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
	
	public ActiveIngredientBean getActiveIngredient() {
		return activeIngredient;
	}

	public void setActiveIngredient(ActiveIngredientBean ingredient) {
		this.activeIngredient = ingredient;
	}
}