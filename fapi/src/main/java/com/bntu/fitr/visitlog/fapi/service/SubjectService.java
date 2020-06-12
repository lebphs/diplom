package com.bntu.fitr.visitlog.fapi.service;

import com.bntu.fitr.visitlog.fapi.models.Subject;
import org.springframework.stereotype.Component;

import java.util.List;

public interface SubjectService {

    List<Subject> getAllSubjects();

    List<Subject> findByTeacherId(String teacherId);

    List<Subject> findByStudentId(String studentId);

    Subject createSubject(Subject subject);

    Subject updateSubject(Subject subject);

    void deleteSubject(String subjectId);

}
