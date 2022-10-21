package com.piercebeckett.sendex.services;

import com.piercebeckett.sendex.SendexApplication;
import com.piercebeckett.sendex.controller.AreaController;
import com.piercebeckett.sendex.repositories.AreaRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private AreaRepository areaRepository;

    @Value("${OPEN_WEATHER_API_KEY}")
    private String openWeatherApiKey;

    private String openWeatherOneCallUrlFull = "https://api.openweathermap.org/data/3.0/onecall?lat=35.23649&lon=-85.22971&exclude=minutely&units=imperial&appid=";

    public String getClimbingConditions(String climbingArea){
        try{
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest  request = HttpRequest.newBuilder(
                    URI.create(openWeatherOneCallUrlFull + openWeatherApiKey))
                    .header("Content-Type", "application/json").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("OWM Response Code: " + response.statusCode());
            return response.body();
        } catch(Exception e){
            return e.toString();
        }
    }

    private String parseJsonResponse(){
        return null;
    }
}
