package com.bntu.fitr.visitlog.controller;


import com.bntu.fitr.visitlog.entity.Disciplines;
import com.bntu.fitr.visitlog.entity.Users;
import com.bntu.fitr.visitlog.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/disciplines")
public class DisciplineController {

    DisciplineService disciplineService;

    @Autowired
    public DisciplineController(DisciplineService disciplineService) {
        this.disciplineService = disciplineService;
    }

    @GetMapping
    public List<Disciplines> getAllUsers() {
        return disciplineService.getAll();
    }

    @PostMapping
    public Disciplines create(@RequestBody Disciplines discipline){
        return disciplineService.create(discipline);
    }
}
