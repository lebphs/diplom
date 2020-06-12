package com.bntu.fitr.visitlog.controller;

import com.bntu.fitr.visitlog.entity.Subjects;
import com.bntu.fitr.visitlog.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subjects> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("teacher/{teacherId}")
    public List<Subjects> getSubjectByTeacherId(@PathVariable String teacherId) {
        return subjectService.getSubjectByTeacherId(teacherId);
    }

    @GetMapping(value = "/student/{studentId}")
    public List<Subjects> getSubjectByStudentId(@PathVariable String studentId) {
        return subjectService.getSubjectByStudentId(studentId);
    }


    @PostMapping
    public Subjects createSubject(@RequestBody Subjects subject){
        return subjectService.createSubject(subject);
    }

    @PutMapping
    public Subjects updateSubject(@RequestBody Subjects subject){
        return subjectService.updateSubject(subject);
    }

    @DeleteMapping(value = "/{subjectId}")
    public void deleteSubject(@PathVariable String  subjectId){
        subjectService.deleteSubject(subjectId);
    }
}
