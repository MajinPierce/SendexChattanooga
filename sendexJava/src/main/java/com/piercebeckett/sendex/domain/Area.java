package com.piercebeckett.sendex.domain;

import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

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
    private Instant updatedAt;
    @Column(columnDefinition = "json")
    @JsonRawValue
    private String weather;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
