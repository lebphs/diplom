package com.bntu.fitr.visitlog.fapi.controller;


import com.bntu.fitr.visitlog.fapi.models.Journal;
import com.bntu.fitr.visitlog.fapi.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/journal")
public class JournalController {

    private final JournalService journalService;

    @Autowired
    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @GetMapping
    public List<Journal> getJournalBySubjectId(@RequestParam String subjectId) {
        return journalService.findJournalBySubjectId(subjectId);
    }

    @PostMapping
    public Journal createJournal(@RequestBody Journal journal) {
        return journalService.createJournal(journal);
    }

    @PutMapping
    public Journal updateJournal(@RequestBody Journal journal) {
        return journalService.updateJournal(journal);
    }
}
