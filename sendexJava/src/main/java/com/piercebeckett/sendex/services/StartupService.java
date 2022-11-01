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

    private static final String CONFIG_FILE = "./src/main/resources/coordinates.config";

    /**
     * Initialize climbing area data (name and coordinates) based on config file.
     * This data is then used to query weather info from open weather map.
     * @param event     Application Ready Event
     */
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        try (FileReader fileReader = new FileReader(CONFIG_FILE);
             CSVReader csvReader = new CSVReader(fileReader);){

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                Area currentArea = new Area();
                currentArea.setAreaName(nextRecord[0]);
                currentArea.setLatitude(nextRecord[1]);
                currentArea.setLongitude(nextRecord[2]);
                areaRepository.save(currentArea);
                System.out.println(nextRecord[0] + " " + nextRecord[1] + " " + nextRecord[2]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
