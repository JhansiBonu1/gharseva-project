package com.example.proj1.util;

import org.springframework.stereotype.Component;

@Component
public class OTPUtil {

    public String generateOTP() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}

