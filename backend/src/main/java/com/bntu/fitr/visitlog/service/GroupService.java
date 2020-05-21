package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Classes;

import java.util.List;

public interface GroupService {

    Classes getByName(String name);

    Classes createGroup(Classes classes);

    List<Classes> getAll();
}
