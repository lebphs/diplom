package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Journal;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JournalRepository extends CrudRepository<Journal, Long> {

    List<Journal> findJournalBySubjectId(Long subject);

    @Transactional
    @Modifying
    @Query(value = "delete from journal where convert(class_date, DATE) = :classDate and subject_id = :subjectId", nativeQuery = true)
   void deleteAllByClassDateAndSubjectId(@Param("subjectId") String subjectId, @Param("classDate") String classDate);
}
