package com.bntu.fitr.visitlog.controller;

import com.bntu.fitr.visitlog.entity.Classes;
import com.bntu.fitr.visitlog.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/groups")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public List<Classes> getAllGroups() {
        return groupService.getAll();
    }
}
