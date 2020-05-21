package com.bntu.fitr.visitlog.fapi.service;

import com.bntu.fitr.visitlog.fapi.DTO.UserDTO;
import com.bntu.fitr.visitlog.fapi.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> findAll();

    UserDTO findByLogin(String login);

    UserDTO create(UserDTO user);

    UserDTO update(UserDTO user);

    List<User> findStudentsByGroupId(String groupId);
}
