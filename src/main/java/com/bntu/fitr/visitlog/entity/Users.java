package com.bntu.fitr.visitlog.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
public class Users extends BaseEntity{

    private String login;

    private String password;

    private Integer roleId;

    private String firstName;

    private String lastName;

    private String patronymic;

    private Integer groupId;

}
