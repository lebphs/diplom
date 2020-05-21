package com.bntu.fitr.visitlog.service;

import com.bntu.fitr.visitlog.entity.Users;

import java.util.List;

public interface UserService {

    Users getUserByLogin(String name);

    List<Users> getAll();

    Users create(Users user);

    Users update(Users user);

    List<Users> getStudentsByGroupId(String groupId);
}
