package com.bntu.fitr.visitlog.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
public class Subjects extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    private Disciplines discipline;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH, CascadeType.PERSIST, CascadeType.MERGE})
    private Classes group;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH, CascadeType.PERSIST, CascadeType.MERGE})
    private Users teacher;
}
