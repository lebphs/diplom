package com.bntu.fitr.visitlog.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
public class Subjects extends BaseEntity{

    private Integer disciplinesId;

    private Integer groupId;

    private Integer teacherId;
}
