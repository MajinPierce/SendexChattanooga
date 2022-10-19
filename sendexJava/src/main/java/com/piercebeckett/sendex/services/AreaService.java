package com.piercebeckett.sendex.services;

import com.piercebeckett.sendex.SendexApplication;
import com.piercebeckett.sendex.controller.AreaController;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AreaService {

    @Autowired
    private Environment env;

    @Autowired
    private AreaController areaController;

    private String openWeatherApiKey = env.getProperty("api.key");
    private final String openWeatherOneCallUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=35.23649&lon=-85.22971&exclude=minutely&units=imperial&appid=";

    public String getClimbingConditions(String climbingArea){

        try{
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest  request = HttpRequest.newBuilder(
                    URI.create(openWeatherOneCallUrl + openWeatherApiKey))
                    .header("Content-Type", "application/json").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch(Exception e){
            return null;
        }

    }

}
