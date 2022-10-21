package com.piercebeckett.sendex.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Area {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String areaName;
    private String latitude;
    private String longitude;
    @JsonFormat(pattern="yyyy-mm-dd")
    private Date updatedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
