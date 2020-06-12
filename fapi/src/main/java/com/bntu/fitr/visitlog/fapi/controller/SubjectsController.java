package com.bntu.fitr.visitlog.fapi.controller;

import com.bntu.fitr.visitlog.fapi.models.Subject;
import com.bntu.fitr.visitlog.fapi.models.User;
import com.bntu.fitr.visitlog.fapi.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/subjects")
public class SubjectsController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectsController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getSubjectAll() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("teacher/{teacherId}")
    public List<Subject> getSubjectsByTeacherId(@PathVariable String teacherId) {
        return subjectService.findByTeacherId(teacherId);
    }

    @GetMapping(value = "/student/{studentId}")
    public List<Subject> getSubjectByStudentId(@PathVariable String studentId) {
        return subjectService.findByStudentId(studentId);
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject){
        return subjectService.createSubject(subject);
    }

    @PutMapping
    public Subject updateSubject(@RequestBody Subject subject){
        return subjectService.updateSubject(subject);
    }

    @DeleteMapping(value = "/{subjectId}")
    public void deleteSubject(@PathVariable String  subjectId){
        subjectService.deleteSubject(subjectId);
    }
}
