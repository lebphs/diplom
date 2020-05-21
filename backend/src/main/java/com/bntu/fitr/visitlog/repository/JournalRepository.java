package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Journal;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface JournalRepository extends CrudRepository<Journal, Long> {

    List<Journal> findJournalBySubjectId(Long subject);
}
