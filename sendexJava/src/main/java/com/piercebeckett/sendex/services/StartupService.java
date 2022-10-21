package com.piercebeckett.sendex.services;

import com.opencsv.CSVReader;
import com.piercebeckett.sendex.domain.Area;
import com.piercebeckett.sendex.repositories.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.FileReader;

@Component
public class StartupService implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private AreaRepository areaRepository;

    private String file = "./src/main/resources/coordinates.config";

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        try {
            FileReader filereader = new FileReader(file);
            CSVReader csvReader = new CSVReader(filereader);
            String[] nextRecord;

            while ((nextRecord = csvReader.readNext()) != null) {
                Area currentArea = new Area();
                currentArea.setAreaName(nextRecord[0]);
                currentArea.setLatitude(nextRecord[1]);
                currentArea.setLongitude(nextRecord[2]);
                areaRepository.save(currentArea);
                System.out.println(nextRecord[0] + " " + nextRecord[1] + " " + nextRecord[2]);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
