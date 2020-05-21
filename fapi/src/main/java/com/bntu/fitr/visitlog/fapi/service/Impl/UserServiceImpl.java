package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.DTO.UserDTO;
import com.bntu.fitr.visitlog.fapi.converter.DefaultConverter;
import com.bntu.fitr.visitlog.fapi.models.User;
import com.bntu.fitr.visitlog.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    private final DefaultConverter converter;


    private final String userURL = "/api/v1/users";

    @Autowired
    public UserServiceImpl(DefaultConverter converter) {
        this.converter = converter;
    }

    @Override
    public List<User> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        UserDTO[] users = restTemplate.getForObject(backendServerUrl + userURL, UserDTO[].class);
        List<UserDTO> listUsers =  users == null ? Collections.emptyList() : Arrays.asList(users);
        return listUsers.stream().map(converter::toUser).collect(Collectors.toList());
    }

    @Override
    public UserDTO findByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + userURL + "/login?login=" + login, UserDTO.class);
    }

    @Override
    public UserDTO create(UserDTO user) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(backendServerUrl + userURL, HttpMethod.POST, new HttpEntity<>(user), UserDTO.class).getBody();
    }

    @Override
    public UserDTO update(UserDTO user) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(backendServerUrl + userURL, HttpMethod.PUT, new HttpEntity<>(user), UserDTO.class).getBody();
    }

    @Override
    public List<User> findStudentsByGroupId(String groupId){
        RestTemplate restTemplate = new RestTemplate();
        UserDTO[] students = restTemplate.getForObject(backendServerUrl + userURL + "/students?groupId=" + groupId, UserDTO[].class);
        List<UserDTO> studentList =  students == null ? Collections.emptyList() : Arrays.asList(students);
        return studentList.stream().map(converter::toUser).collect(Collectors.toList());
    }
}
