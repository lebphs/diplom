package com.bntu.fitr.visitlog.controller;

import com.bntu.fitr.visitlog.entity.UserRoles;
import com.bntu.fitr.visitlog.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<UserRoles> getAllRoles() {
        return roleService.getAll();
    }
}
