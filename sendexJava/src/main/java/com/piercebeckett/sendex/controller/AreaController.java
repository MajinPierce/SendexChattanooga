package com.piercebeckett.sendex.controller;

import com.piercebeckett.sendex.domain.Area;
import com.piercebeckett.sendex.services.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AreaController {

    @Autowired
    private AreaService areaService;

    /**
     * Returns a json response of weather data of a specific climbing area. Which area
     * depends on the path variable in the front end api call.
     * The called areaService checks for cached weather data, and if null or stale data,
     * retrieves new data from open weather maps.
     *
     * @param areaName  The name of the area provided in the API call from the front end
     * @return          Json response entity of climbing area weather data
     */
    @GetMapping("/{areaName}")
    public ResponseEntity<Area> getAreaData(@PathVariable String areaName){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        headers.add("Allow", "GET");
        return new ResponseEntity<>(areaService.getClimbingConditions(areaName), headers, HttpStatus.OK);
    }
}
