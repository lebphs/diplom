package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<Users, Long> {

    Users findByLogin(String login);

    List<Users> findStudentsByGroupId(Long groupId);
}
