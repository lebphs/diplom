package com.bntu.fitr.visitlog.controller;

import com.bntu.fitr.visitlog.entity.Users;
import com.bntu.fitr.visitlog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping(value = "/login")
    public Users getUserByLogin(@RequestParam String login){
        return userService.getUserByLogin(login);
    }

    @PostMapping
    public Users create(@RequestBody Users user){
        return userService.create(user);
    }

    @PutMapping
    public Users update(@RequestBody Users user){
        return userService.update(user);
    }

    @GetMapping(value = "/students")
    public List<Users> getStudentsByGroupId(@RequestParam String groupId){
        return userService.getStudentsByGroupId(groupId);
    }
}
