package com.bntu.fitr.visitlog.fapi.converter;

import com.bntu.fitr.visitlog.fapi.DTO.*;
import com.bntu.fitr.visitlog.fapi.models.Journal;
import com.bntu.fitr.visitlog.fapi.models.Subject;
import com.bntu.fitr.visitlog.fapi.models.User;
import org.springframework.stereotype.Component;

@Component
public class DefaultConverter {

    public User toUser(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setLogin(userDTO.getLogin());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setRole(userDTO.getRole()!= null ? userDTO.getRole().getName(): null);
        user.setGroup(userDTO.getGroup() != null ? userDTO.getGroup().getName() : null);

        return user;
    }

    public Subject toSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();
        subject.setId(subjectDTO.getId());
        subject.setDiscipline(subjectDTO.getDiscipline() != null ? subjectDTO.getDiscipline().getName() : null);
        subject.setDisciplineId(subjectDTO.getDiscipline() != null ? subjectDTO.getDiscipline().getId() : null);

        subject.setGroup(subjectDTO.getGroup() != null ? subjectDTO.getGroup().getName() : null);
        subject.setGroupId(subjectDTO.getGroup() != null ? subjectDTO.getGroup().getId() : null);

        subject.setTeacher(subjectDTO.getTeacher() != null ? subjectDTO.getTeacher().getLastName(): null);
        subject.setTeacherId(subjectDTO.getTeacher() != null ? subjectDTO.getTeacher().getId(): null);
        return subject;
    }

    public Journal toJournal(JournalDTO journalDTO){
        if(journalDTO != null) {
            Journal journal = new Journal();
            journal.setId(journalDTO.getId());
            journal.setSubjectId(journalDTO.getSubject().getId());

            if(journalDTO.getStudent() != null) {
                journal.setStudentId(journalDTO.getStudent().getId());
                journal.setFirstName(journalDTO.getStudent().getFirstName());
                journal.setLastName(journalDTO.getStudent().getLastName());
                journal.setGroupId(journalDTO.getStudent().getGroup().getId());
                journal.setGroupName(journalDTO.getStudent().getGroup().getName());
            }

            journal.setMark(journalDTO.getMark());
            journal.setTruancy(journalDTO.getTruancy());
            journal.setComment(journalDTO.getComment());
            journal.setClassDate(journalDTO.getClassDate());
            return journal;
        }
        return null;
    }

    public JournalDTO toJournalDTO(Journal journal){
        JournalDTO journalDTO = new JournalDTO();

        journalDTO.setId(journal.getId());
        journalDTO.setClassDate(journal.getClassDate());
        journalDTO.setMark(journal.getMark());
        journalDTO.setTruancy(journal.getTruancy());
        journalDTO.setComment(journal.getComment());

        if(journal.getSubjectId() != null) {
            SubjectDTO subject = new SubjectDTO();
            subject.setId(journal.getSubjectId());
            journalDTO.setSubject(subject);
        }

        if(journal.getStudentId() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(journal.getStudentId());
            journalDTO.setStudent(userDTO);
        }
        return journalDTO;
    }

    public SubjectDTO toSubjectDTO(Subject subject){
        SubjectDTO subjectDTO = new SubjectDTO();

        subjectDTO.setId(subject.getId());
        if(subject.getDiscipline() != null) {
            DisciplineDTO disciplineDTO = new DisciplineDTO();
            disciplineDTO.setName(subject.getDiscipline());
            subjectDTO.setDiscipline(disciplineDTO);
        }

        if(subject.getGroupId() != null) {
            GroupDTO groupDTO = new GroupDTO();
            groupDTO.setId(subject.getGroupId());
            groupDTO.setName(subject.getGroup());
            subjectDTO.setGroup(groupDTO);
        }

        if(subject.getTeacherId() != null){
            UserDTO userDTO = new UserDTO();
            userDTO.setId(subject.getTeacherId());
            subjectDTO.setTeacher(userDTO);
        }
        return subjectDTO;
    }
}
