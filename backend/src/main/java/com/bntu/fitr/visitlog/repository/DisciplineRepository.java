package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Disciplines;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineRepository extends CrudRepository<Disciplines, Long> {
}
