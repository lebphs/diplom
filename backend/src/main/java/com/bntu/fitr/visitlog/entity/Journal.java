package com.bntu.fitr.visitlog.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
@Entity
public class Journal extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    private Subjects subject;

    private Integer mark;

    private String  truancy;

    private String comment;

    private Date classDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private Users student;

}
