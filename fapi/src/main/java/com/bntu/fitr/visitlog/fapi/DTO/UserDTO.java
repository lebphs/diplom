package com.bntu.fitr.visitlog.fapi.DTO;

import com.bntu.fitr.visitlog.fapi.models.Group;
import com.bntu.fitr.visitlog.fapi.models.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class UserDTO {

    private String id;

    private String login;

    private String password;

    private Role role;

    private String firstName;

    private String lastName;

    private String patronymic;

    private Group group;

}
