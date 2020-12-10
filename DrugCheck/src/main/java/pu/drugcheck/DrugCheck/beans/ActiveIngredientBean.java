  
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
	private int Id;

	@Column(name = "Name",  nullable = false)
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