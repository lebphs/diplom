package com.bntu.fitr.visitlog.fapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class Subject {
    private String id;
    private String discipline;
    private String disciplineId;

    private String group;
    private String groupId;

    private String teacher;
    private String teacherId;
}
