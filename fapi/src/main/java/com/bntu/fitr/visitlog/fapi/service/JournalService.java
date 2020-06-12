package com.bntu.fitr.visitlog.fapi.service;

import com.bntu.fitr.visitlog.fapi.DTO.JournalDTO;
import com.bntu.fitr.visitlog.fapi.models.Journal;

import java.util.List;

public interface JournalService {
    List<Journal> findJournalBySubjectId(String subjectId);

    Journal updateJournal(Journal journalDTO);

    Journal createJournal(Journal journalDTO);

    void deleteJournal(String subjectId, String date);
}
