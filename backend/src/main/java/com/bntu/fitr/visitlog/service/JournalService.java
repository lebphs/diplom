package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Journal;

import java.util.List;

public interface JournalService {

    List<Journal> findJournalBySubjectId(String subjectId);

    Journal updateJournal(Journal journalDTO);

    Journal createJournal(Journal journalDTO);


}
