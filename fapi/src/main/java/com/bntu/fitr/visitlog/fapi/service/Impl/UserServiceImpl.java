package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.models.User;
import com.bntu.fitr.visitlog.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Value("${backend.server.url}")
    private String backendServerUrl;


    private final String userURL = "/api/v1/users";

    @Override
    public List<User> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.getForObject(backendServerUrl + userURL, User[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }

    @Override
    public User findByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + userURL + "/login?login=" + login, User.class);
    }

    @Override
    public User create(User user) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(backendServerUrl + userURL, HttpMethod.POST, new HttpEntity<>(user), User.class).getBody();
    }
}
