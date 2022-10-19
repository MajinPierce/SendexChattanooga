package com.piercebeckett.sendex.controller;

import com.piercebeckett.sendex.services.AreaService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping("/{climbing_area}")
    public ResponseEntity<?> getAreaData(@PathVariable String climbing_area){
        return new ResponseEntity<>(areaService.getClimbingConditions(climbing_area), HttpStatus.OK);
    }
}
