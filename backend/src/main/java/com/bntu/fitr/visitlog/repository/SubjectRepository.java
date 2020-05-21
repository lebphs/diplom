package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Subjects;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubjectRepository extends CrudRepository<Subjects, Long> {

    List<Subjects> findByTeacherId(Long teacherId);

    @Query(value = "select s.* from university.subjects as s join university.users as u on s.group_id=u.group_id and u.id=?1", nativeQuery = true)
    List<Subjects> findByStudentId(Long studentId);
}
