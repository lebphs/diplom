package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.models.Group;
import com.bntu.fitr.visitlog.fapi.models.Role;
import com.bntu.fitr.visitlog.fapi.service.GroupService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    private final String userURL = "/api/v1/groups";


    @Override
    public List<Group> getAll() {
        RestTemplate restTemplate = new RestTemplate();
        Group[] groups = restTemplate.getForObject(backendServerUrl + userURL, Group[].class);
        return groups == null ? Collections.emptyList() : Arrays.asList(groups);
    }
}
