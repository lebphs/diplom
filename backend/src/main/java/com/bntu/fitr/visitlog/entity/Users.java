package com.bntu.fitr.visitlog.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
public class Users extends BaseEntity {

    private String login;

    private String password;

    @ManyToOne
    private UserRoles role;

    private String firstName;

    private String lastName;

    private String patronymic;

    @ManyToOne(cascade = CascadeType.ALL)
    private Classes group;
}
