package com.bntu.fitr.visitlog.service.impl;

import com.bntu.fitr.visitlog.entity.UserRoles;
import com.bntu.fitr.visitlog.repository.RoleRepository;
import com.bntu.fitr.visitlog.repository.UserRepository;
import com.bntu.fitr.visitlog.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<UserRoles> getAll() {
        return (List<UserRoles>) roleRepository.findAll();
    }
}
