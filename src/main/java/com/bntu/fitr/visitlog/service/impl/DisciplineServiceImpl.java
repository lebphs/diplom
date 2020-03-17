package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.Disciplines;
import com.bntu.fitr.visitlog.repository.DisciplineRepository;
import com.bntu.fitr.visitlog.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DisciplineServiceImpl implements DisciplineService {

    private DisciplineRepository disciplineRepository;

    @Autowired
    public DisciplineServiceImpl(DisciplineRepository disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }

    @Override
    public List<Disciplines> getAll() {
        return (List<Disciplines>) disciplineRepository.findAll();
    }

    @Override
    public Disciplines create(Disciplines discipline){
        return (Disciplines) disciplineRepository.save(discipline);
    }
}
