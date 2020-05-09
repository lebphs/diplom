package com.bntu.fitr.visitlog.fapi.service;

import com.bntu.fitr.visitlog.fapi.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findByLogin(String login);

    User create(User user);
}
