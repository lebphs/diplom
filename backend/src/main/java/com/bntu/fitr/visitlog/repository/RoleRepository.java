package com.bntu.fitr.visitlog.repository;

import com.bntu.fitr.visitlog.entity.UserRoles;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<UserRoles, Long> {
}
