package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.Classes;
import com.bntu.fitr.visitlog.repository.GroupRepository;
import com.bntu.fitr.visitlog.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {

    private GroupRepository repository;

    @Autowired
    public GroupServiceImpl(GroupRepository repository) {
        this.repository = repository;
    }

    public Classes getByName(String name){
        return repository.getByName(name);
    }

    public Classes createGroup(Classes classes){
        return repository.save(classes);
    }

    public List<Classes> getAll(){
        return (List<Classes>) repository.findAll();
    }
}
