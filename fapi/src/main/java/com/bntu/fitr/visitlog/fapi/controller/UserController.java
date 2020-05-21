package com.bntu.fitr.visitlog.fapi.controller;

import com.bntu.fitr.visitlog.fapi.DTO.UserDTO;
import com.bntu.fitr.visitlog.fapi.models.User;
import com.bntu.fitr.visitlog.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public List<User> getAllUsers() {

        return userService.findAll();
    }

    @GetMapping(value = "/login")
    public UserDTO getUserByLogin(@RequestParam String login) {
        return userService.findByLogin(login);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO user){
        return userService.create(user);
    }

    @PutMapping
    public UserDTO updateUser(@RequestBody UserDTO user){
        return userService.update(user);
    }

    @GetMapping(value = "/students")
    public List<User> getStudentsByGroupId(@RequestParam String groupId) {
        return userService.findStudentsByGroupId(groupId);
    }
}
