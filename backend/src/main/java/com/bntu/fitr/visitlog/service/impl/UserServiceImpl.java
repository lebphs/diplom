package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.Classes;
import com.bntu.fitr.visitlog.entity.Users;
import com.bntu.fitr.visitlog.repository.GroupRepository;
import com.bntu.fitr.visitlog.repository.UserRepository;
import com.bntu.fitr.visitlog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private GroupRepository groupRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public Users getUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public List<Users> getAll(){
        return (List<Users>) userRepository.findAll();
    }

    @Override
    public Users create(Users user){
        return (Users) userRepository.save(user);
    }
}
