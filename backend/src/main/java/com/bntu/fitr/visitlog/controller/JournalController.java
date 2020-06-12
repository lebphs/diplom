package com.bntu.fitr.visitlog.controller;

import com.bntu.fitr.visitlog.entity.Journal;
import com.bntu.fitr.visitlog.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/journal")
public class JournalController {

    private final JournalService journalService;

    @Autowired
    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @GetMapping
    public List<Journal> getJournalBySubjectId(@RequestParam String subjectId){
        return journalService.findJournalBySubjectId(subjectId);
    }

    @PostMapping
    public Journal createJournal(@RequestBody Journal journal){
        return journalService.createJournal(journal);
    }

    @PutMapping
    public Journal updateJournal(@RequestBody Journal journal){
        return journalService.updateJournal(journal);
    }

    @DeleteMapping("subject/{subjectId}/date/{date}")
    public void deleteJournal(@PathVariable String subjectId, @PathVariable String date){
        journalService.deleteJournal(subjectId, date);
    }
}
