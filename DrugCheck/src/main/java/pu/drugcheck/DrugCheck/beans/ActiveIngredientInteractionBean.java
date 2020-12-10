  
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
	private int id;
	
	@OneToOne
	private ActiveIngredientBean firstActiveIngredient;
	
	@OneToOne
	private ActiveIngredientBean secondActiveIngredient;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ActiveIngredientBean getFirstActiveIngredient() {
		return firstActiveIngredient;
	}

	public void setFirstActiveIngredient(ActiveIngredientBean ingredient) {
		this.firstActiveIngredient = ingredient;
	}
	
	public ActiveIngredientBean getSecondActiveIngredient() {
		return secondActiveIngredient;
	}

	public void setSecondActiveIngredient(ActiveIngredientBean ingredient) {
		this.secondActiveIngredient = ingredient;
	}
}