package com.bntu.fitr.visitlog.entity;

import lombok.*;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
@Entity
public class Journal extends BaseEntity {

    private Integer subjectId;

    private Integer mark;

    private Integer truancy;

    private String comment;

    private Integer userId;
}
