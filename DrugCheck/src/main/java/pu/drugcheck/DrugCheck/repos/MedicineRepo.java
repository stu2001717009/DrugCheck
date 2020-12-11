
package pu.drugcheck.DrugCheck.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.stereotype.Repository;

import pu.drugcheck.DrugCheck.beans.MedicineBean;

@Repository
public interface MedicineRepo extends JpaRepository<MedicineBean, Integer>{
	List<MedicineBean> findAll();
	MedicineBean findOneById(int id);
	@Query(value="select * from medicine m where m.name like %:medicineName%", nativeQuery=true)
	List<MedicineBean> getByName(@Param("medicineName") String medicineName);
	
	List<MedicineBean> findByNameIgnoreCaseContaining(String name);
}