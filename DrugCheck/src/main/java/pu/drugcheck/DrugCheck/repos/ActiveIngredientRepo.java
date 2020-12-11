
package pu.drugcheck.DrugCheck.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

import pu.drugcheck.DrugCheck.beans.ActiveIngredientBean;

@Repository
public interface ActiveIngredientRepo extends JpaRepository<ActiveIngredientBean, Integer>{
	List<ActiveIngredientBean> findAll();
	ActiveIngredientBean findOneById(int id);
}