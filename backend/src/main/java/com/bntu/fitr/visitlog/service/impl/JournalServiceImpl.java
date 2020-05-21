package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.Journal;
import com.bntu.fitr.visitlog.entity.Subjects;
import com.bntu.fitr.visitlog.entity.Users;
import com.bntu.fitr.visitlog.repository.JournalRepository;
import com.bntu.fitr.visitlog.repository.SubjectRepository;
import com.bntu.fitr.visitlog.repository.UserRepository;
import com.bntu.fitr.visitlog.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JournalServiceImpl implements JournalService {

    JournalRepository journalRepository;
    UserRepository userRepository;
    SubjectRepository subjectRepository;

    @Autowired
    public JournalServiceImpl(SubjectRepository subjectRepository,
                              UserRepository userRepository,
                              JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Journal> findJournalBySubjectId(String subjectId) {
        return journalRepository.findJournalBySubjectId(new Long(subjectId));
    }

    @Override
    public Journal createJournal(Journal journal){
        if(journal != null){
            if(journal.getSubject() != null && journal.getSubject().getId() != null) {
                Optional<Subjects> subjects = subjectRepository.findById(journal.getSubject().getId());
                subjects.ifPresent(journal::setSubject);
            }

            if(journal.getStudent() != null && journal.getStudent().getId() != null) {
                Optional<Users> users = userRepository.findById(journal.getStudent().getId());
                users.ifPresent(journal::setStudent);
            }
        }
        return journalRepository.save(journal);
    }

    @Override
    public Journal updateJournal(Journal journal){
        if(journal != null){
            Optional<Subjects> subjects = subjectRepository.findById(journal.getSubject().getId());
            subjects.ifPresent(journal::setSubject);

            Optional<Users> users =  userRepository.findById(journal.getStudent().getId());
            users.ifPresent(journal::setStudent);
        }
        return journalRepository.save(journal);
    }
}
