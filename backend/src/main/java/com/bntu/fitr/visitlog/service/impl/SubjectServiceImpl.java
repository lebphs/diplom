package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.Classes;
import com.bntu.fitr.visitlog.entity.Subjects;
import com.bntu.fitr.visitlog.entity.Users;
import com.bntu.fitr.visitlog.repository.GroupRepository;
import com.bntu.fitr.visitlog.repository.SubjectRepository;
import com.bntu.fitr.visitlog.repository.UserRepository;
import com.bntu.fitr.visitlog.service.SubjectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.acl.Group;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository,
                              UserRepository userRepository,
                              GroupRepository groupRepository) {
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public List<Subjects> getAllSubjects() {
        return (List<Subjects>) subjectRepository.findAll();
    }

    public List<Subjects> getSubjectByTeacherId(String teacherId) {
        return subjectRepository.findByTeacherId(new Long(teacherId));
    }

    @Override
    public List<Subjects> getSubjectByStudentId(String studentId) {
        return subjectRepository.findByStudentId(new Long(studentId));
    }

    @Override
    public Subjects createSubject(Subjects subject) {
        if (subject.getTeacher() != null && subject.getTeacher().getId() != null) {
            Optional<Users> user = userRepository.findById(subject.getTeacher().getId());
            user.ifPresent(subject::setTeacher);
        }
        if(subject.getGroup() != null){
            Optional<Classes> group = groupRepository.findById(subject.getGroup().getId());
            group.ifPresent(subject::setGroup);
        }
        return subjectRepository.save(subject);
    }

    @Override
    public Subjects updateSubject(Subjects subject) {
        Optional<Subjects> subjects = subjectRepository.findById(subject.getId());
        if(subjects.isPresent()){
            subjects.get().getDiscipline().setName(subject.getDiscipline().getName());
            return subjectRepository.save(subjects.get());
        }
        return subject;
    }



    @Override
    public void deleteSubject(String subjectId) {
        subjectRepository.deleteById(new Long(subjectId));
    }
}
