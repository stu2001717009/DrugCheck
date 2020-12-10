  
package pu.drugcheck.DrugCheck.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ActiveIngredientInteraction")
public class ActiveIngredientInteractionBean {

	@Id
	@Column(name="Id")
	@GeneratedValue
	private int Id;
	
	@OneToOne
	private ActiveIngredientBean FirstActiveIngredient;
	
	@OneToOne
	private ActiveIngredientBean SecondActiveIngredient;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		this.Id = id;
	}

	public ActiveIngredientBean getFirstActiveIngredient() {
		return FirstActiveIngredient;
	}

	public void setFirstActiveIngredient(ActiveIngredientBean ingredient) {
		this.FirstActiveIngredient = ingredient;
	}
	
	public ActiveIngredientBean getSecondActiveIngredient() {
		return SecondActiveIngredient;
	}

	public void setSecondActiveIngredient(ActiveIngredientBean ingredient) {
		this.SecondActiveIngredient = ingredient;
	}
}