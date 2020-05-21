package com.bntu.fitr.visitlog.fapi.controller;

import com.bntu.fitr.visitlog.fapi.models.Group;
import com.bntu.fitr.visitlog.fapi.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/groups")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAll();
    }
}
