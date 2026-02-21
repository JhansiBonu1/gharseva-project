package com.example.proj1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication

@EnableScheduling
public class Proj1Application {

	public static void main(String[] args) {
		SpringApplication.run(Proj1Application.class, args);
	}

}



