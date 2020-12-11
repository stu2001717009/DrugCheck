
package pu.drugcheck.DrugCheck.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.stereotype.Repository;

import pu.drugcheck.DrugCheck.beans.ActiveIngredientInteractionBean;

@Repository
public interface ActiveIngredientInteractionRepo extends JpaRepository<ActiveIngredientInteractionBean, Integer>{
	List<ActiveIngredientInteractionBean> findAll();
	
	@Query(value="select first_active_ingredient_id from active_ingredient_interaction i where i.second_active_ingredient_id =:activeIngredientId", nativeQuery=true)
	List<Integer> getFirstIngredients(@Param("activeIngredientId") int activeIngredientId);
	
	@Query(value="select second_active_ingredient_id from active_ingredient_interaction i where i.first_active_ingredient_id =:activeIngredientId", nativeQuery=true)
	List<Integer> getSecondIngredients(@Param("activeIngredientId") int activeIngredientId);
	
	@Query(value="select id from active_ingredient_interaction i where i.first_active_ingredient_id =:activeIngredientId or i.second_active_ingredient_id =:activeIngredientId", nativeQuery=true)
	List<Integer> getIdByInteractions(@Param("activeIngredientId") int activeIngredientId);
	
	@Query(value="select id from active_ingredient_interaction i where "
			+ "(i.first_active_ingredient_id =:firstId AND i.second_active_ingredient_id = :secondId) or"
			+ " (i.first_active_ingredient_id =:secondId AND i.second_active_ingredient_id = :firstId)", nativeQuery=true)
	Integer checkInteraction(@Param("firstId") int firstId, @Param("secondId") int secondId);
}