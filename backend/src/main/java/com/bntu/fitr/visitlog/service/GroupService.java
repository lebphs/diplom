package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Classes;

public interface GroupService {

    Classes getByName(String name);

    Classes createGroup(Classes classes);
}
