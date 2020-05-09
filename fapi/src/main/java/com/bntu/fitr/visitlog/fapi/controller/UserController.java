package com.bntu.fitr.visitlog.fapi.controller;

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
    public User getUserByLogin(@RequestParam String login) {
        return userService.findByLogin(login);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.create(user);
    }

}
