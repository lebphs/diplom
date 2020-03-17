package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Disciplines;

import java.util.List;

public interface DisciplineService {

    List<Disciplines> getAll();

    Disciplines create(Disciplines discipline);
}
