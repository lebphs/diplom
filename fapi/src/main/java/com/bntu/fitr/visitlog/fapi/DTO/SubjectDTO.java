package com.bntu.fitr.visitlog.fapi.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class SubjectDTO {
    private String id;
    private DisciplineDTO discipline;
    private GroupDTO group;
    private UserDTO teacher;
}
