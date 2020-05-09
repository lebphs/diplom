package com.bntu.fitr.visitlog.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
@Entity
public class Journal extends BaseEntity {

    @OneToOne(cascade = CascadeType.ALL)
    private Subjects subject;

    private Integer mark;

    private Integer truancy;

    private String comment;

}
