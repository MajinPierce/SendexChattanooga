package com.piercebeckett.sendex;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SendexApplication implements CommandLineRunner {

	@Autowired
	public Environment env;

	@Value("${OPEN_WEATHER_API_KEY}")
	private String openWeatherApiKey;

	public SendexApplication(Environment env){this.env = env;}

	@Override
	public void run(String... args) throws Exception{}

	public static void main(String[] args) {
		SpringApplication.run(SendexApplication.class, args);
	}

}
