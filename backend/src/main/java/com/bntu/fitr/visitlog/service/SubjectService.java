package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Subjects;

import java.util.List;

public interface SubjectService {

    List<Subjects> getAllSubjects();

    List<Subjects> getSubjectByTeacherId(String teacherId);

    List<Subjects> getSubjectByStudentId( String studentId);

    Subjects createSubject(Subjects subject);

    Subjects updateSubject(Subjects subject);

    void deleteSubject(String subjectId);

}
