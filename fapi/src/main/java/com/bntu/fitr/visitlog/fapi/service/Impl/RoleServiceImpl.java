package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.models.Role;
import com.bntu.fitr.visitlog.fapi.service.RoleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    private final String userURL = "/api/v1/roles";


    @Override
    public List<Role> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Role[] users = restTemplate.getForObject(backendServerUrl + userURL, Role[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }
}
