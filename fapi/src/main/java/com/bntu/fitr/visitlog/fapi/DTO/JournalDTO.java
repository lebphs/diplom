package com.bntu.fitr.visitlog.fapi.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class JournalDTO {

    private String id;

    private SubjectDTO subject;

    private Integer mark;

    private String truancy;

    private String comment;

    private Date classDate;

    private UserDTO student;
}
