package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Classes;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepository extends CrudRepository<Classes, Long> {

    Classes getByName(String name);
}
