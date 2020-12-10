
package pu.drugcheck.DrugCheck.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.stereotype.Repository;

import pu.drugcheck.DrugCheck.beans.MedicineBean;

@Repository
public interface MedicineRepo extends JpaRepository<MedicineBean, Integer>{
	List<MedicineBean> findAll();
}