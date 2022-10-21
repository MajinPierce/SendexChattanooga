package com.piercebeckett.sendex.services;

import com.piercebeckett.sendex.domain.Area;
import com.piercebeckett.sendex.repositories.AreaRepository;
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

    private static final String OPEN_WEATHER_DOMAIN = "https://api.openweathermap.org/data/3.0/onecall?";

    public String getClimbingConditions(String areaName){
        try{
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest  request = HttpRequest.newBuilder(
                    URI.create(buildApiUrl(areaName)))
                    .header("Content-Type", "application/json").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(request);
            System.out.println("OWM Response Code: " + response.statusCode());
            return response.body();
        } catch(Exception e){
            return e.toString();
        }
    }

    private String parseJsonResponse(){
        return null;
    }

    private String buildApiUrl(String areaName){
        Area currentArea = areaRepository.findByAreaName(areaName);
        System.out.println(areaName);
        return String.format("%slat=%s&lon=%s&exclude=minutely&units=imperial&appid=%s",
                OPEN_WEATHER_DOMAIN , currentArea.getLatitude(), currentArea.getLongitude(), openWeatherApiKey);
    }
}
