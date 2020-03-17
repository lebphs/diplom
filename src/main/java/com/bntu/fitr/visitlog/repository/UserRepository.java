package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Users;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, Long> {

    Users findByLogin(String login);
}
