  
package pu.drugcheck.DrugCheck.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ActiveIngredient")
public class ActiveIngredientBean {

	@Id
	@Column(name="Id")
	@GeneratedValue
	private int id;

	@Column(name = "Name",  nullable = false)
	private String name;

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
}