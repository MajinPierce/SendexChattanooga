package com.piercebeckett.sendex.services;

import com.piercebeckett.sendex.domain.Area;
import com.piercebeckett.sendex.repositories.AreaRepository;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;


@Service
public class AreaService {

    @Autowired
    private Environment env;

    @Autowired
    private AreaRepository areaRepository;

    @Value("${OPEN_WEATHER_API_KEY}")
    private String openWeatherApiKey;

    private static final String OPEN_WEATHER_DOMAIN = "https://api.openweathermap.org/data/3.0/onecall?";

    /**
     * Returns area data including coordinates and current, hourly, 5-day weather info.
     * If weather data is null or stale (older than x seconds), sends API call to open weather map,
     * updates the cached area weather data, and returns with the new information.
     *
     * @param areaName      The name of the area provided in the API call from the front end
     * @return              JSON response body of queried weather data
     */
    public Area getClimbingConditions(String areaName){
        //stored weather data for queried area
        Area area = areaRepository.findByAreaName(areaName);
        //new api call if data empty or stale
        //time in seconds
        if(area.getUpdatedAt() == null || Instant.now().getEpochSecond() - area.getUpdatedAt().getEpochSecond() > 600){
            try {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder(
                                URI.create(buildApiUrl(area)))
                        .header("Content-Type", "application/json").build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println(request);
                System.out.println("OWM Response Code: " + response.statusCode());
                area.setWeather(response.body());
                return areaRepository.save(area);
            } catch (Exception e) {
                System.out.println(e.toString());
                return null;
            }
        } else{
            //return stored data if < x seconds old
            //undo escape characters and quotes added when saved to db
            area.setWeather(
                    StringEscapeUtils.unescapeJava(area.getWeather())
                    .replaceAll("^\"|\"$", "")
            );
            return area;
        }
    }

    /**
     * Returns the full api call string to open weather map.
     * Built from the constant data, the api call from the front end, and the env var containing
     * the Api key.
     * Just separated this for readability.
     *
     * @param areaName      The name of the area provided in the API call from the front end
     * @return              Full api call string to open weather map
     */
    private String buildApiUrl(Area currentArea){
        System.out.println(currentArea.getAreaName());
        //openWeatherApiKey set in env vars
        return String.format("%slat=%s&lon=%s&exclude=minutely&units=imperial&appid=%s",
                OPEN_WEATHER_DOMAIN , currentArea.getLatitude(), currentArea.getLongitude(), openWeatherApiKey);
    }
}
