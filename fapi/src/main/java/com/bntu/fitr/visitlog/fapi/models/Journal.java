package com.bntu.fitr.visitlog.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class Journal {

    private String id;

    private String subjectId;

    private Integer mark;

    private String  truancy;

    private String comment;

    private Date classDate;

    private String studentId;
    private String firstName;
    private String lastName;
    private String groupId;
    private String groupName;
}
