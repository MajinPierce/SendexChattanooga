package com.piercebeckett.sendex.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Area {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String areaName;
    private String latitude;
    private String longitude;
    @JsonFormat(pattern="yyyy-mm-dd")
    private Date updatedAt;

    public Area(){}

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
