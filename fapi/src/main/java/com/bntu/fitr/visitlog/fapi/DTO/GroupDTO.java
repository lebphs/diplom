package com.bntu.fitr.visitlog.fapi.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class GroupDTO {
    private String id;

    private String name;}
