package com.piercebeckett.sendex.controller;

import com.piercebeckett.sendex.services.SendexServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SendexController {

    @Autowired
    private SendexServices sendexServices;

    @GetMapping("/{climbingArea}")
    public ResponseEntity<?> getClimbingAreaData(@PathVariable String areaName){
        return null;
    }


}
